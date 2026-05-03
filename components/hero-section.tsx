"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4 },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  useIsMobile();
  const videoId = "sJUqkuYY9zw";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;

  useEffect(() => {
    const hero = document.getElementById("home");

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(() => {}, { threshold: 0.2 });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={youtubeEmbedUrl}
          title="Indian Biotope Championship hero background video"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col gap-6 px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-flexing leading-tight text-white text-center md:text-start">
                Indian <span>Biotope Championship</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-lg text-center md:text-start">
                Celebrate the natural beauty of aquascaping. Compete in
                nature-inspired biotope aquariums where creativity meets
                ecological authenticity.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Link
                href="https://forms.gle/xjPoYzxRC4suKf7W8"
                className="w-full lg:w-auto"
              >
                <Button size="lg" className="px-8 w-full lg:w-auto">
                  Register Now
                </Button>
              </Link>

              <Link
                href="https://www.instagram.com/ibcclub.in"
                className="w-full lg:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 w-full lg:w-auto bg-white/10 backdrop-blur border-white/30 text-white hover:text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start gap-8 pt-4 text-sm text-white"
              variants={statsVariants}
            >
              <motion.div
                className="flex flex-col gap-1"
                variants={statItemVariants}
              >
                <span className="text-white/70">Participants</span>
                <span className="text-4xl font-flexing">500+</span>
              </motion.div>

              <motion.div
                className="flex flex-col gap-1"
                variants={statItemVariants}
              >
                <span className="text-white/70">Categories</span>
                <span className="text-4xl font-flexing">10</span>
              </motion.div>

              <motion.div
                className="flex flex-col gap-1"
                variants={statItemVariants}
              >
                <span className="text-white/70">Prize Pool</span>
                <span className="text-4xl font-flexing">Rs. 5L+</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
