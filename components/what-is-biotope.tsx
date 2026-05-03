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
    float time = uTime * 0.42;

    float waveX = sin(uv.y * 9.0 + time) * 0.0026;
    float waveY = cos(uv.x * 7.0 - time * 0.75) * 0.0019;
    float detailX = sin(uv.y * 18.0 - time * 1.1) * 0.0008;
    float detailY = cos(uv.x * 14.0 + time * 0.95) * 0.0006;

    vec2 sampleUv = clamp(uv + vec2(waveX + detailX, waveY + detailY), 0.001, 0.999);
    vec4 color = texture2D(uTexture, sampleUv);

    gl_FragColor = color;
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
