"use client";

import { Award, Gift, Medal, Trophy } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const prizeCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const consolationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.4 },
  },
};

export default function Prizes() {
  const prizes = [
    {
      place: "1st Place",
      title: "Visionary Aquarist Award",
      value: "₹35,000",
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-400",
      border: "border-yellow-400/20",
      items: [
        "Air Tank - Coral9",
        "Hang-on Filter - Aquatic Remedies",
        "Soil Substrate - Aquatic Venturez",
        "Water Conditioner & Fish Health - BORNEO",
        "Intan Gift Hamper - Intan",
        "RJC edition Lights - The Aquatic Farm",
        "Magazine - Weekend Aquarist",
        "Surface Skimmer - Petzlifeworld",
        "T-Shirt - Mangalore Aquatics",
        "Native Fishes - IBC Club",
        "Bioloark SD 200 - Dhara Nature Aquarium",
      ],
    },
    {
      place: "2nd Place",
      title: "Natural Elegance Award",
      value: "₹25,000",
      icon: Medal,
      color: "text-zinc-400",
      bg: "bg-zinc-300",
      border: "border-zinc-300/20",
      items: [
        "Air Tank - Coral9",
        "Hang-on Filter - Aquatic Remedies",
        "Soil Substrate - Aquatic Venturez",
        "Water Conditioner & Fish Health - BORNEO",
        "Intan Gift Hamper - Intan",
        "RJC edition Lights - The Aquatic Farm",
        "Magazine - Weekend Aquarist",
        "Surface Skimmer - Petzlifeworld",
        "T-Shirt - Mangalore Aquatics",
        "Native Fishes - IBC Club",
      ],
    },
    {
      place: "3rd Place",
      title: "Aquascape Harmony Award",
      value: "₹20,000",
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-600",
      border: "border-amber-600/20",
      items: [
        "Air Tank - Coral9",
        "Hang-on Filter - Aquatic Remedies",
        "Soil Substrate - Aquatic Venturez",
        "Water Conditioner & Fish Health - BORNEO",
        "Intan Gift Hamper - Intan",
        "RJC edition Lights - The Aquatic Farm",
        "Magazine - Weekend Aquarist",
        "Surface Skimmer - Petzlifeworld",
        "T-Shirt - Mangalore Aquatics",
        "Native Fishes - IBC Club",
      ],
    },
  ];

  return (
    <section
      id="prizes"
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header with Background Image */}
          <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-primary/60 to-primary/20 p-8 md:p-12">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "url('/image1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <motion.div
              className="relative z-10 text-center space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headerVariants}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-flexing text-primary">
                Prize Distribution
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Compete across multiple categories with exciting prizes worth
                over ₹5 lakhs.
              </p>
            </motion.div>
          </div>

          {/* Prize Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
          >
            {prizes.map((prize) => {
              const Icon = prize.icon;
              return (
                <motion.div
                  key={prize.place}
                  variants={prizeCardVariants}
                  className={`rounded-3xl bg-card border border-primary/20 overflow-hidden flex flex-col`}
                >
                  <div className={`p-8 text-center border-b border-border`}>
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-zinc-950 ${prize.color}`}
                    >
                      <HugeiconsIcon
                        icon={Icon}
                        size={24}
                        className="w-8 h-8"
                      />
                    </div>
                    <div
                      className={`text-sm font-bold uppercase tracking-widest mb-2 ${prize.color}`}
                    >
                      {prize.place}
                    </div>
                    <h3 className="text-3xl font-flexing text-primary mb-2">
                      {prize.title}
                    </h3>
                    <div className="text-zinc-600 text-sm">
                      Kit worth{" "}
                      <span className="font-semibold text-lg">
                        {prize.value}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1">
                    <ul className="space-y-3">
                      {prize.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-zinc-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Consolation box */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={consolationVariants}
            className="w-full rounded-2xl bg-card border border-border text-center lg:text-left p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <HugeiconsIcon
                icon={Gift}
                size={24}
                className="w-8 h-8 text-emerald-400"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                3 Exciting Consolation Prize Combos
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                WRGB Light by Levin Aqua, Hang-on Filter by Petzlifeworld, and
                NDI Complete Planted Tank Care Kit by Nature Design India.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
