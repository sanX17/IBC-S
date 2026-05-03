"use client";

import { Separator } from "@/components/ui/separator";
import BBCWatermark from "bbc-watermark";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Variants
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Navigation",
      links: [
        { name: "About IBC", href: "#about-ibc" },
        { name: "Judges", href: "#judges" },
        { name: "Prizes", href: "#prizes" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "What is Biotope", href: "#what-is-biotope" },
        { name: "Rules", href: "#rules" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Instagram", href: "https://www.instagram.com/ibcclub.in" },
      ],
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-black/80 isolate">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/image6.jpg"
          alt="Aquascape underwater background"
          fill
          className="object-cover contrast-[1.15]"
          priority={false}
          quality={80}
        />
      </div>

      {/* Overlay for readability – subtle gradient + blur */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-black/60 to-black/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          {/* Brand / Logo Block */}
          <motion.div className="space-y-6" variants={blockVariants}>
            <div className="flex items-center gap-4">
              <Link href="/" className="relative w-14 h-14 shrink-0">
                <Image
                  src="/logo.png"
                  alt="IBC Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </Link>
              <span className="font-flexing text-5xl sm:text-6xl text-white tracking-tight drop-shadow-md">
                IBC
              </span>
            </div>
            <p className="text-base text-gray-300/90 leading-relaxed max-w-xs">
              Indian Biotope Championship — Celebrating nature-inspired
              aquascaping, artistry, and aquatic ecosystems.
            </p>
          </motion.div>

          {/* Link Columns */}
          {sections.map((section) => (
            <motion.div
              key={section.title}
              variants={blockVariants}
              className="space-y-5"
            >
              <h4 className="text-lg font-semibold text-white tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.name} variants={linkVariants}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm inline-block"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="bg-white/10 my-8" />

        {/* Bottom bar – modern & centered on mobile */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-400"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-center sm:text-left">
            © {currentYear} Indian Biotope Championship. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <BBCWatermark />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
