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

         pos.y += sin(pos.x * 2.0 + uTime * 0.6) * 0.015;
pos.x += sin(pos.y * 2.0 + uTime * 0.5) * 0.01;

          gl_Position = vec4(pos, 1.0);
        }
      `,

      fragmentShader: `
        precision highp float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;

// 🔥 random noise
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 🔥 smooth noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a)* u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;

  // 🌊 layered noise (this is the magic)
  float n1 = noise(uv * 3.0 + uTime * 0.2);
  float n2 = noise(uv * 6.0 - uTime * 0.15);

  float wave = (n1 + n2) * 0.02;

  // 💧 refraction-like distortion
  uv.x += wave;
  uv.y += wave * 0.6;
  
  // 🔥 ADD THIS HERE
float jitter = noise(uv * 20.0 + uTime * 0.8) * 0.002;
uv.x += jitter;
uv.y += jitter * 0.5;



  // 🖱️ subtle interaction
  float dist = distance(uv, uMouse);
  
  uv += (uv - uMouse) * 0.01 * smoothstep(0.4, 0.0, dist);

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