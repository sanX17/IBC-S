"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaterImage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const fishRef = useRef<HTMLImageElement>(null);
  const fish2Ref = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const exitTriggeredRef = useRef(false);
  const exitAnimationCompleteRef = useRef(false);
  const releaseInProgressRef = useRef(false);
  const layoutReadyRef = useRef(false);
  const sectionActiveRef = useRef(false);
  const desktopReadyTimeoutRef = useRef<number | null>(null);

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
              { y: "0%", duration: 0.6, ease: "power2.out" }, // Panel slides up
              "+=0.05" // Small delay after fish
            )
            .call(() => {
              layoutReadyRef.current = true;
            });
        } else {
          setStartAnim(true);
          desktopReadyTimeoutRef.current = window.setTimeout(() => {
            layoutReadyRef.current = true;
          }, 3100);
        }

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (desktopReadyTimeoutRef.current !== null) {
        window.clearTimeout(desktopReadyTimeoutRef.current);
      }
    };
  }, []);

  // 🌊 Three.js background
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const mount = mountRef.current;

    mount!.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/orgimg.jpg");
    const texture2 = textureLoader.load("/img2.jpg");

    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTexture2: { value: texture2 },
        uTime: { value: 0 },
        uMix: { value: 0 },
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
        uniform sampler2D uTexture2;
        uniform float uTime;
        uniform float uMix;

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
          vec4 color1 = texture2D(uTexture, uv);
          vec4 color2 = texture2D(uTexture2, uv);
          float mixAmount = smoothstep(0.0, 1.0, uMix);
          gl_FragColor = mix(color1, color2, mixAmount);
        }
      `,
    });
    materialRef.current = material;

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
      mount?.removeChild(renderer.domElement);
      materialRef.current = null;
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const fish = fishRef.current;
    const fish2 = fish2Ref.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const material = materialRef.current;

    if (!section || !fish || !fish2 || !panel || !content || !material) return;

    let touchStartY = 0;
    let trigger: ScrollTrigger | null = null;

    const preventScroll = (event: Event) => event.preventDefault();
    const preventKeys = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
    };

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeys, { passive: false });
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };

    const startExitAnimation = () => {
      if (
        exitTriggeredRef.current ||
        !layoutReadyRef.current ||
        !sectionActiveRef.current
      ) {
        return;
      }

      exitTriggeredRef.current = true;
      exitAnimationCompleteRef.current = false;
      lockScroll();
      // Disable the CSS entrance transitions before GSAP takes over exit motion.
      fish.style.transition = "none";
      fish2.style.transition = "none";
      panel.style.transition = "none";
      content.style.transition = "none";
      gsap.killTweensOf([fish, fish2, panel, content, material.uniforms.uMix]);
      gsap.set(panel, {
        x: 0,
        xPercent: 0,
        clipPath: "inset(0 0% 0 0)",
      });
      gsap.set(content, {
        x: 0,
        opacity: 1,
      });
      gsap.set(fish2, {
        x: -window.innerWidth * 1.2,
        opacity: 0,
      });

      gsap.timeline({
        onComplete: () => {
          exitAnimationCompleteRef.current = true;
          unlockScroll();
        },
      })
        .to(
          content,
          {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          },
          0
        )
        .to(
          fish,
          {
            x: window.innerWidth * 1.15,
            duration: 0.9,
            ease: "power2.inOut",
            overwrite: true,
          },
          0
        )
        .to(
          material.uniforms.uMix,
          {
            value: 1,
            duration: 1.05,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          panel,
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
          },
          0.08
        )
        .to(
          fish2,
          {
            x: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power2.out",
            overwrite: true,
          },
          1.35
        )
        .to(
          panel,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
          },
          2.35
        )
        .to(
          content,
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          },
          2.75
        );
    };

    const releaseSection = (scrollDelta = 0) => {
      if (
        !exitAnimationCompleteRef.current ||
        !trigger ||
        releaseInProgressRef.current
      ) {
        return;
      }

      releaseInProgressRef.current = true;

      requestAnimationFrame(() => {
        sectionActiveRef.current = false;
        trigger?.kill();
        ScrollTrigger.refresh();

        const nextStep = Math.max(24, Math.min(Math.abs(scrollDelta) || 48, 120));
        window.scrollBy({ top: nextStep, behavior: "auto" });
        releaseInProgressRef.current = false;
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (exitAnimationCompleteRef.current && event.deltaY > 0) {
        event.preventDefault();
        releaseSection(event.deltaY);
        return;
      }

      if (event.deltaY > 0) {
        startExitAnimation();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        exitAnimationCompleteRef.current &&
        ["ArrowDown", "PageDown", " ", "End"].includes(event.key)
      ) {
        event.preventDefault();
        releaseSection(72);
        return;
      }

      if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
        startExitAnimation();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;

      if (touchStartY - touchEndY > 12) {
        if (exitAnimationCompleteRef.current) {
          releaseSection(72);
          return;
        }

        startExitAnimation();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=99999",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      once: true,
      onEnter: () => {
        sectionActiveRef.current = true;
      },
      onEnterBack: () => {
        sectionActiveRef.current = true;
      },
      onLeave: () => {
        sectionActiveRef.current = false;
      },
      onLeaveBack: () => {
        sectionActiveRef.current = false;
      },
      onKill: () => {
        sectionActiveRef.current = false;
      },
    });

    return () => {
      unlockScroll();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      trigger?.kill();
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
      <div className="absolute inset-0 z-20 pointer-events-none">
        <img
          ref={fishRef}
          src="/fishimg1.png"
          alt=""
          className={`fish ${startAnim ? "active" : ""}`}
        />
        <img
          ref={fish2Ref}
          src="/imgfish2.webp"
          alt=""
          className={`fish fish-secondary ${startAnim ? "active" : ""}`}
          style={{ opacity: 0 }}
        />
      </div>

      <style jsx>{`
        .fish {
          position: absolute;
          top: 46%;
          left: 54%;
          width: clamp(240px, 38vw, 700px);
          height: auto;
          object-fit: contain;
          transform: translate(-50%, -50%) translateX(-120vw) scale(0.85);
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fish.active {
          transform: translate(-50%, -50%) translateX(clamp(12%, 16vw, 22%))
            scale(1.18);
        }

        .fish-secondary.active {
          transform: translate(-50%, -50%) translateX(0) scale(1.18);
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
          padding-right: clamp(120px, 12vw, 260px);
          max-width: min(calc(50vw - clamp(140px, 14vw, 300px)), 560px);
          width: 100%;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          will-change: opacity;
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
            height: 50%;
            bottom: 0;
            top: auto;
            transform: translateY(100%);
            transition: none;
            z-index: 5;
            align-items: flex-start;
            overflow: hidden; /* Prevent content from showing outside panel */
          }

          .content {
            max-width: 100%;
            padding: clamp(16px, 4vw, 28px);
            padding-top: clamp(80px, 12vh, 140px); /* Reduced top padding - text starts higher */
            padding-right: clamp(16px, 4vw, 28px);
            opacity: 1;
            transform: none;
            transition: none;
          }

          .heading {
            font-size: clamp(20px, 5vw, 26px);
          }

          p {
            font-size: clamp(13px, 3.5vw, 15px);
            line-height: 1.55;
          }

          .fish {
            transition: none;
            z-index: 10;
          }
        }
      `}</style>
    </div>
  );
}
