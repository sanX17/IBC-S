"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaterImage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0.1, 10
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current!.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load("/orgimg.jpg"); // 👈 change this

    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },

      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;

        void main() {
          vUv = uv;

          vec3 pos = position;

          // 🌊 vertical floating
          pos.y += sin(pos.x * 3.0 + uTime * 1.5) * 0.03;

          // 🌊 horizontal wave
          pos.x += sin(pos.y * 4.0 + uTime * 1.2) * 0.02;

          gl_Position = vec4(pos, 1.0);
        }
      `,

      fragmentShader: `
        precision highp float;

        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vec2 uv = vUv;

          // 🌊 water distortion
          uv.x += sin(uv.y * 10.0 + uTime * 2.0) * 0.02;
          uv.y += sin(uv.x * 8.0 + uTime * 1.5) * 0.02;

          // 🖱️ mouse ripple
          float dist = distance(uv, uMouse);
          uv += (uv - uMouse) * 0.05 * smoothstep(0.3, 0.0, dist);

          vec4 color = texture2D(uTexture, uv);

          gl_FragColor = color;
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 🖱️ mouse move
    const onMouseMove = (e: MouseEvent) => {
      material.uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      material.uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 🔄 animation loop
    const animate = () => {
      material.uniforms.uTime.value += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
}