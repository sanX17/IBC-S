"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "What is Biotope", href: "#what-is-biotope" },
  { name: "About", href: "#about-ibc" },
  { name: "Objectives", href: "#objectives" },
  { name: "Judges", href: "#judges" },
  { name: "Prizes", href: "#prizes" },
  { name: "Rules", href: "#rules" },
  { name: "Contact", href: "#contact" },
];

// Animation Variants
const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

const mobileMenu = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <motion.div
        initial="hidden"
        animate="show"
        variants={navContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div variants={fadeDown}>
          <div className="flex justify-center items-center gap-3">
            <Link href="/" className="relative w-10 h-10 text-primary">
              <Image
                src="/logo.png"
                alt="IBC Logo"
                fill
                className="object-contain rounded-full"
              />
            </Link>
            <span className="font-flexing text-4xl text-primary mt-2">IBC</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          variants={navContainer}
          initial="hidden"
          animate="show"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={navItem}
              whileHover={{ y: -2 }}
              className="relative text-sm text-foreground/70 hover:text-foreground"
            >
              {link.name}
              <motion.span
                className="absolute left-0 -bottom-1 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* Desktop CTA Button */}
        <motion.div variants={fadeDown}>
          <Link href="https://forms.gle/xjPoYzxRC4suKf7W8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="hidden lg:inline-flex px-4" size="default">
                Register Now
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="lg:hidden p-2 hover:bg-secondary rounded-md"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <HugeiconsIcon icon={X} size={24} />
          ) : (
            <HugeiconsIcon icon={Menu} size={24} />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenu}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <motion.nav
              variants={navContainer}
              initial="hidden"
              animate="show"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  variants={navItem}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm text-foreground/70 hover:text-foreground py-2"
                >
                  {link.name}
                </motion.a>
              ))}

              <Link href="https://forms.gle/xjPoYzxRC4suKf7W8">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button className="w-full mt-2">Register Now</Button>
                </motion.div>
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
