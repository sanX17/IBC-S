"use client";

import { useEffect, useRef } from "react";
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

  // Hash function for noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // 2D noise function
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p * frequency);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  // Cover UV function for aspect ratio
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
    float time = uTime * 0.001;

    // Multiple wave layers for realistic water movement
    vec2 wave1 = vec2(
      fbm(uv * 3.0 + vec2(time * 0.8, time * 0.6)),
      fbm(uv * 2.5 + vec2(-time * 0.7, time * 0.9))
    );

    vec2 wave2 = vec2(
      fbm(uv * 8.0 + vec2(time * 1.5, -time * 1.2)),
      fbm(uv * 7.0 + vec2(-time * 1.3, time * 1.6))
    );

    vec2 wave3 = vec2(
      fbm(uv * 15.0 + vec2(time * 2.2, time * 1.8)),
      fbm(uv * 12.0 + vec2(-time * 2.1, -time * 1.9))
    );

    // Combine waves with different amplitudes
    vec2 distortion = (wave1 - 0.5) * 0.08 + (wave2 - 0.5) * 0.04 + (wave3 - 0.5) * 0.02;

    // Sample the texture with distortion
    vec2 sampleUv = uv + distortion;
    vec4 baseColor = texture2D(uTexture, sampleUv);

    // Chromatic aberration for underwater effect
    vec4 colorR = texture2D(uTexture, sampleUv + distortion * 0.3);
    vec4 colorB = texture2D(uTexture, sampleUv - distortion * 0.2);
    vec3 chromaticColor = vec3(colorR.r, baseColor.g, colorB.b);

    // Caustics effect
    float caustics1 = fbm(uv * 20.0 + vec2(time * 1.8, -time * 1.5));
    float caustics2 = fbm(uv * 35.0 + vec2(-time * 2.5, time * 2.1));
    float caustics3 = fbm(uv * 50.0 + vec2(time * 3.2, time * 2.8));
    float causticsPattern = caustics1 * 0.5 + caustics2 * 0.3 + caustics3 * 0.2;

    // Underwater lighting
    float depth = smoothstep(0.2, 0.8, uv.y);
    vec3 waterTint = mix(vec3(0.1, 0.3, 0.4), vec3(0.0, 0.1, 0.2), depth);

    // Apply effects
    vec3 finalColor = chromaticColor;
    finalColor += waterTint * 0.3; // Underwater tint
    finalColor += vec3(0.4, 0.6, 0.5) * causticsPattern * 0.4; // Caustics
    finalColor *= mix(vec3(1.0), vec3(0.8, 0.9, 1.0), depth); // Depth attenuation

    // Vignette effect
    float vignette = 1.0 - smoothstep(0.7, 1.0, length(uv - 0.5));
    finalColor *= vignette * 0.9 + 0.1;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function WhatIsBiotope() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="relative aspect-[16/7] w-full overflow-hidden"
      />
    </section>
  );
}
