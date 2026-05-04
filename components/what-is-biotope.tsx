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

// noise
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

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
  // ⏱️ create repeating pulse (fast wobble burst)
float pulse = exp(-mod(uTime * 1.2, 2.0) * 3.0);

  // 🌊 smoother layered waves
  float n1 = noise(uv * 2.5 + uTime * 0.25);
  float n2 = noise(uv * 4.0 - uTime * 0.2);

  float wave = (n1 + n2) * 0.03;

  uv.x += wave * 1.2;
uv.y += wave * 0.6;

  // 🔥 micro jitter (alive feeling)
  float jitter = noise(uv * 15.0 + uTime * 0.6) * 0.001;
   
  vec2 dir = normalize(vec2(jitter, jitter * 0.7));
uv += dir * abs(jitter);

  uv = clamp(uv, 0.001, 0.999);

  // 🖱️ interaction
  float dist = distance(uv, uMouse);
  uv += (uv - uMouse) * 0.01 * smoothstep(0.4, 0.0, dist);

  // 💎 REFRACTION (RGB split — this is the magic)
  float offset = wave * 0.02;

  float r = texture2D(uTexture, uv + offset).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - offset).b;

  vec3 color = vec3(r, g, b);

  // 🌊 soft blur / water softness
  vec3 blur = texture2D(uTexture, uv + wave * 0.01).rgb;
  color = mix(color, blur, 0.2);

  // ✨ subtle light shimmer
  float light = smoothstep(0.4, 1.0, wave);
  color += light * 0.05;

  gl_FragColor = vec4(color, 1.0);
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