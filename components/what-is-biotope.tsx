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

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uTime;

  varying vec2 vUv;

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

  float noise(vec2 p) {
    return sin(p.x) * sin(p.y);
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageResolution);

   float time = uTime * 1.2;

// finer waves (higher frequency)
float waveX = sin(uv.y * 20.0 + time * 1.2) * 0.008;
float waveY = cos(uv.x * 22.0 + time * 1.5) * 0.006;

// finer noise (smaller ripple details)
float ripple = noise(uv * 25.0 + time * 1.5) * 0.004;

uv.x += waveX + ripple;
uv.y += waveY + ripple * 0.5;

    // ✅ prevent edge stretching / white gaps
    uv = clamp(uv, 0.001, 0.999);

    vec4 color = texture2D(uTexture, uv);

    gl_FragColor = color;
  }
`;

export default function WhatIsBiotope() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const texture = new THREE.TextureLoader().load("/img2.jpg");

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(2048, 1024) },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // ✅ slight overscale to hide edges completely
    mesh.scale.set(1.05, 1.05, 1);

    scene.add(mesh);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    let frameId: number;

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.0025;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    texture.onUpdate = () => {
      const image = texture.image as { width?: number; height?: number };
      if (image?.width && image?.height) {
        uniforms.uImageResolution.value.set(image.width, image.height);
      }
    };

    resize();
    frameId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
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