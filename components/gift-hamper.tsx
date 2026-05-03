"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
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
  hidden: { opacity: 0, y: 40, scale: 0.96 },
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

export default function GiftHampers() {
  const hampers = [
    {
      title: "Borneo Hampers",
      description: "30 exclusive hampers sponsored by Borneo.",
      image: "/placeholder.svg?height=56&width=56",
    },
    {
      title: "Apollo Aquatics Hampers",
      description: "20 exclusive hampers sponsored by Apollo Aquatics.",
      image: "/placeholder.svg?height=56&width=56",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headerVariants}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-flexing text-primary">
              <span className="text-foreground">Exclusive</span> Gift Hampers
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              All participants receive exclusive gift hampers as a token of
              appreciation.
            </p>
          </motion.div>

          {/* Hampers Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
          >
            {hampers.map((hamper, index) => (
              <motion.div
                key={hamper.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  key={index}
                  className="p-6 bg-card border border-border hover:border-primary/20 transition-colors duration-300"
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-14 w-14">
                        <Image
                          src={hamper.image}
                          alt={hamper.title}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary pt-1">
                          {hamper.title}
                        </h3>
                        <span className="text-foreground/70">
                          {hamper.description}
                        </span>
                      </div>
                    </div>
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
