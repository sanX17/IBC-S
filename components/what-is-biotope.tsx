"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function WaterImage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fishRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [startAnim, setStartAnim] = useState(false);

  // 🎯 Scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
          const tl = gsap.timeline();

          tl.fromTo(
            fishRef.current,
            { x: "-120vw", scale: 0.9 },
            { x: "0vw", scale: 1.2, duration: 1, ease: "power3.out" }
          )
            .to(
              panelRef.current,
              { y: "0%", duration: 0.9, ease: "power2.out" },
              "+=0.2"
            )
            .fromTo(
              contentRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8 },
              "+=0.2"
            );
        } else {
          setStartAnim(true);
        }

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🌊 Three.js background
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current!.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load("/orgimg.jpg");

    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
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

        float random(vec2 st){
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st){
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

        void main(){
          vec2 uv = vUv;
          float n1 = noise(uv * 2.5 + uTime * 0.25);
          float n2 = noise(uv * 4.0 - uTime * 0.2);
          float wave = (n1 + n2) * 0.03;
          uv += wave;
          gl_FragColor = texture2D(uTexture, uv);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.uTime.value += 0.02;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* 🌊 Background */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* ⚪ Panel */}
      <div
        ref={panelRef}
        className={`white-panel ${startAnim ? "active" : ""}`}
      >
        <div
          ref={contentRef}
          className={`content ${startAnim ? "show" : ""}`}
        >
          <h2 className="heading">What is a Biotope?</h2>

          <p>
            A biotope aquarium is a living replica of a natural aquatic habitat.
            It goes beyond just keeping fish in a tank—it recreates the look,
            feel, and balance of a real ecosystem found in the wild.
          </p>

          <p>
            Everything in the setup—fish, plants, rocks, driftwood, substrate,
            and even water conditions—is carefully chosen to reflect one
            particular location in nature. The aim is not only aesthetic beauty
            but also education and conservation awareness.
          </p>
        </div>
      </div>

      {/* 🐟 Fish */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          ref={fishRef}
          src="/fishimg1.png"
          className={`fish ${startAnim ? "active" : ""}`}
        />
      </div>

      <style jsx>{`
        .fish {
          width: clamp(240px, 38vw, 700px);
          transform: translateX(-120vw) scale(0.85);
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fish.active {
          transform: translateX(clamp(15%, 20vw, 30%)) scale(1.35);
        }

        .white-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: white;

          transform: translateX(-100%);
          transition: transform 1s ease-out;
          transition-delay: 1.2s;

          z-index: 10;
          display: flex;
          align-items: center;
        }

        .white-panel.active {
          transform: translateX(0);
        }

        .content {
          opacity: 0;
          padding: clamp(24px, 4vw, 80px);
          max-width: min(42vw, 560px);
          width: 100%;
          transition: all 0.8s ease;
          transition-delay: 2.2s;
        }

        .content.show {
          opacity: 1;
          transform: translateY(0);
        }

        .heading {
          font-weight: 700;
          font-size: clamp(24px, 3vw, 38px);
          margin-bottom: 16px;
        }

        p {
          font-size: clamp(14px, 1.2vw, 18px);
          line-height: 1.7;
          margin-bottom: 14px;
          color: #333;
          max-width: 60ch;
        }

        /* 📱 MOBILE FIX */
        @media (max-width: 768px) {
          .white-panel {
            width: 100%;
            height: 50%; /* 🔥 FIXED */
            bottom: 0;
            top: auto;
            transform: translateY(100%);
            transition: none;
            z-index: 30;
            align-items: flex-start;
          }

          .content {
            max-width: 100%;
            padding: clamp(16px, 4vw, 28px);
          }

          .heading {
            font-size: clamp(20px, 5vw, 26px);
          }

          p {
            font-size: clamp(13px, 3.5vw, 15px);
            line-height: 1.55;
          }
            /* 🐟 Fish */
          .fish {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}