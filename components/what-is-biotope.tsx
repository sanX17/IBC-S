"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  vec2 coverUv(vec2 uv, vec2 screen, vec2 image) {
    float screenRatio = screen.x / screen.y;
    float imageRatio = image.x / image.y;
    vec2 scaled = uv;

    if (screenRatio > imageRatio) {
      float scale = imageRatio / screenRatio;
      scaled.y = uv.y * scale + (1.0 - scale) * 0.5;
    } else {
      float scale = screenRatio / imageRatio;
      scaled.x = uv.x * scale + (1.0 - scale) * 0.5;
    }

    return scaled;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageResolution);
    float time = uTime * 0.16;
    vec2 centeredUv = uv - 0.5;

    vec2 waveA = vec2(
      fbm(uv * 5.5 + vec2(time * 1.15, -time * 0.75)),
      fbm(uv * 5.0 + vec2(-time * 0.95, time * 1.05))
    );

    vec2 waveB = vec2(
      fbm(uv * 10.5 + vec2(-time * 1.75, time * 1.25)),
      fbm(uv * 9.5 + vec2(time * 1.55, -time * 1.35))
    );

    vec2 distortion = (waveA - 0.5) * 0.055 + (waveB - 0.5) * 0.025;
    vec2 sampleUv = uv + distortion;

    vec4 base = texture2D(uTexture, sampleUv);
    vec4 shiftedR = texture2D(uTexture, sampleUv + distortion * 0.35);
    vec4 shiftedB = texture2D(uTexture, sampleUv - distortion * 0.25);
    vec3 color = vec3(shiftedR.r, base.g, shiftedB.b);

    float causticsLarge = fbm(uv * 14.0 + vec2(time * 1.8, -time * 1.1));
    float causticsMedium = fbm(uv * 26.0 + vec2(-time * 2.5, time * 1.9));
    float causticsFine = fbm(uv * 42.0 + vec2(time * 3.6, time * 2.4));
    float causticsPattern = causticsLarge * 0.55 + causticsMedium * 0.3 + causticsFine * 0.15;
    float causticBands = sin((uv.y + causticsLarge * 0.18 - time * 0.55) * 42.0) * 0.5 + 0.5;
    float shimmer = smoothstep(0.6, 0.94, causticsPattern) * 0.24;
    float causticHighlight = smoothstep(0.72, 0.98, causticBands * 0.65 + causticsPattern * 0.75) * 0.3;
    float surfaceGlow = smoothstep(0.0, 0.34, 1.0 - uv.y) * 0.2;
    float depthFalloff = smoothstep(0.15, 0.95, uv.y);
    float vignette = smoothstep(0.95, 0.18, length(centeredUv * vec2(1.0, 1.25)));
    vec3 waterTint = mix(vec3(0.03, 0.16, 0.2), vec3(0.0, 0.07, 0.11), depthFalloff);

    color = mix(color, color * waterTint * 5.0, 0.12);
    color += vec3(0.2, 0.28, 0.22) * shimmer;
    color += vec3(0.34, 0.4, 0.28) * causticHighlight;
    color += vec3(0.08, 0.16, 0.2) * surfaceGlow;
    color *= mix(vec3(0.98, 1.02, 1.04), vec3(0.82, 0.92, 0.98), depthFalloff);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WhatIsBiotope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLDivElement>(null);
  const [showFish, setShowFish] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [fishWidth, setFishWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const texture = new THREE.TextureLoader().load("/img1.jpg");

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(2048, 1024) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    let frameId = 0;

    scene.add(mesh);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();

      if (!width || !height) {
        return;
      }

      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    texture.onUpdate = () => {
      const image = texture.image as { width?: number; height?: number };

      if (image?.width && image?.height) {
        uniforms.uImageResolution.value.set(image.width, image.height);
      }
    };

    resize();
    frameId = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const fishElement = fishRef.current;

    if (!fishElement) {
      return;
    }

    const updateFishWidth = () => {
      setFishWidth(fishElement.getBoundingClientRect().width);
    };

    updateFishWidth();

    const resizeObserver = new ResizeObserver(updateFishWidth);
    resizeObserver.observe(fishElement);
    window.addEventListener("resize", updateFishWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateFishWidth);
    };
  }, []);

  useEffect(() => {
    if (!showFish || showOverlay) {
      return;
    }

    const overlayTimer = window.setTimeout(() => {
      setShowOverlay(true);
    }, 1100);

    return () => window.clearTimeout(overlayTimer);
  }, [showFish, showOverlay]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || showFish) {
      return;
    }

    let timer: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || timer !== null) {
          return;
        }

        timer = window.setTimeout(() => {
          setShowFish(true);
          observer.disconnect();
        }, 1000);
      },
      { threshold: 0.45 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();

      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [showFish]);

  const textClearance = Math.max(24, Math.round(fishWidth / 2) + 24);

  return (
    <section className="relative w-full overflow-hidden bg-[#08141a]">
      <div
        ref={containerRef}
        className="relative aspect-[16/7] w-full overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-1/2 bg-white transition-transform duration-[900ms] ease-out"
          style={{
            opacity: 1,
            transform: showOverlay ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div
            className="flex h-full flex-col justify-center px-6 py-8 text-[#1b1b1b] sm:px-8 md:px-10 lg:px-12"
            style={{ paddingRight: `${textClearance}px` }}
          >
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-flexing font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                What is a
                <br />
                Biotope?
              </h2>
              <p className="text-sm leading-relaxed sm:text-base md:text-lg">
                A biotope aquarium is a living replica of a natural aquatic
                habitat. It goes beyond just keeping fish in a tank-it
                recreates the look, feel, and balance of a real ecosystem found
                in the wild.
              </p>
              <p className="text-sm leading-relaxed sm:text-base md:text-lg">
                Everything in the setup-fish, plants, rocks, driftwood,
                substrate, and even water conditions-is carefully chosen to
                reflect one particular location in nature. The aim is not only
                aesthetic beauty but also education and conservation awareness.
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <div
            ref={fishRef}
            className="absolute left-1/2 top-1/2 transition-transform duration-[900ms] ease-out"
            style={{
              transform: showFish
                ? "translate(-50%, -50%)"
                : "translate(calc(-100vw - 100%), -50%)",
            }}
          >
            <Image
              src="/fishimg1.png"
              alt="Fish swimming across the image section"
              width={360}
              height={180}
              className="h-auto w-[300px] drop-shadow-[0_16px_30px_rgba(0,0,0,0.35)] sm:w-[340px] md:w-[420px] lg:w-[520px] xl:w-[620px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
