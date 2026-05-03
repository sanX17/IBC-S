"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Marquee } from "./marquee";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function EventPartners() {
  const partners = [
    {
      name: "Nature Design India",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/nature_design_india",
    },
    {
      name: "Dhara Nature Aquarium",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/dhara_nature_aquarium",
    },
    {
      name: "The Aquatic Farm",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/the_aquatic_farm",
    },
    {
      name: "Levin Aqua",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/levin_aqua",
    },
    {
      name: "Aquatic Venturez",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/aquaticventurez",
    },
    {
      name: "Amar Salvi",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/theweekendaquarist",
    },
    {
      name: "Coral9",
      image: "/placeholder.svg?height=48&width=48",
      link: "https://www.instagram.com/ccoral9",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headerVariants}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-flexing text-primary">
              <span className="text-foreground">Event</span> Partners
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              We are grateful for the support of our partners in making this
              championship possible.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            className="relative flex w-full flex-col items-center justify-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
          >
            <Marquee pauseOnHover className="[--duration:30s]">
              {partners.map((partner, index) => (
                <PartnerCard key={index} partner={partner} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s]">
              {partners.map((partner, index) => (
                <PartnerCard key={index} partner={partner} />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type Partner = {
  name: string;
  image: string;
  link: string;
};

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Card className="w-80 p-6 mx-3 bg-card border border-border text-center">
      <Link
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center space-y-3"
      >
        <div className="relative h-12 w-12">
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h3 className="font-semibold text-primary text-center">
          {partner.name}
        </h3>
      </Link>
    </Card>
  );
}
