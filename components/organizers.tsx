"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.2,
    },
  },
};

export default function Organizers() {
  const organizers = [
    {
      orgName: "Mangalore Aquatics",
      name: "Dhiraj",
      role: "Event Coordinator",
      image: "/placeholder.svg?height=72&width=72",
    },
  ];

  return (
    <section className="relative w-full lg:h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden isolate">
      {/* Background image layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/image5.jpg"
          alt="Aquascaping background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Dark overlay → makes text/cards readable without affecting their own opacity */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/60" />
        {/* Optional: stronger center overlay if cards still hard to read */}
        {/* <div className="absolute inset-0 bg-black/45" /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headerVariants}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Organizers
            </h2>
            <p className="text-gray-200/90 text-lg max-w-2xl mx-auto">
              Proudly organized by leading organizations in the aquascaping
              community.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-3xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {organizers.map((org) => (
              <motion.div key={org.name} variants={cardVariants}>
                <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 mb-4">
                      {" "}
                      {/* slightly larger for better look */}
                      <Image
                        src={org.image}
                        alt={`${org.name} - ${org.orgName}`}
                        fill
                        className="object-cover rounded-full border-2 border-primary/30"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {org.orgName}
                    </h3>
                    <p className="text-base font-medium text-foreground mt-1">
                      {org.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {org.role}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
