"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // nice cascade (~120ms between cards)
      delayChildren: 0.2, // slight delay after header
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function MeetJudges() {
  const judges = [
    {
      name: "Beta Mahatvaraj",
      title: "Wildlife Photographer, Conservationist, Aquarium Enthusiast",
      location: "Chennai",
      bio: "My passion lies in documenting Indian freshwater fishes and their habitats through photography and videography. I regularly contribute content to various publications aimed at both the scientific community and aquarists.",
      instagram: "https://www.instagram.com/meenkaran_ig",
      image: "/beta_updated.webp",
    },
    {
      name: "Goldy Singh",
      title: "Aquascaper and Nature Enthusiast",
      location: "India",
      bio: "With over three years of experience, I've transitioned from keeping goldfish and cichlids to mastering intricate planted tanks. I am honored to judge this aquascaping contest.",
      instagram: "https://www.instagram.com/goldy.singh.aquagold",
      image: "goldy_singh.webp",
    },
    {
      name: "Ronald Kevin Dsouza",
      title: "Fish Hobbyist and Fisheries Scientist",
      location: "Mangalore",
      bio: "An ardent fish hobbyist with over 30 years of experience in breeding and mass-producing ornamental fish. Currently pursuing my PhD in Applied Zoology, focusing on breeding endangered fish species.",
      instagram: "#",
      image: "/ronald.webp",
    },
    {
      name: "Lou Del Bello",
      title: "Science & Climate Journalist | Native Ecosystem Advocate",
      location: "India",
      bio: "Originally from Italy and now based in India for over a decade. With more than 20 years of experience covering environmental and climate issues, she blends journalism with a passion for ethical fishkeeping.",
      instagram: "https://www.instagram.com/loudelbello",
      image: "/placeholder.svg",
    },
    {
      name: "Jaya Shankar",
      title: "Tech Enthusiast and Aquascaper",
      location: "Hyderabad",
      bio: "A tech enthusiast from Hyderabad with a passion for underwater worlds. I specialize in crafting breathtaking Dutch-style aquariums. Committed to promoting the hobby and inspiring others.",
      instagram: "https://www.instagram.com/jaykrishnas_chirunavuthoo_aqua",
      image: "/jaya_shankar.webp",
    },
  ];

  return (
    <section id="judges" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-flexing mb-4"
          >
            Meet the <span className="text-primary">Judges</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            transition={{ delay: 0.15 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            A panel of experienced experts will evaluate entries based on
            general impression, accuracy of plants and animals, hardscape
            design, and overall condition.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }} // trigger slightly earlier
          variants={containerVariants}
        >
          {judges.map((judge) => (
            <motion.div key={judge.name} variants={cardVariants}>
              <Card className="flex flex-col justify-between hover:ring-1 hover:ring-primary/50 transition-colors duration-300 h-90 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden group-hover:border-emerald-500 transition-colors">
                      <img
                        src={judge.image}
                        alt={judge.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-flexing text-primary">
                        {judge.name}
                      </CardTitle>
                      <CardDescription className="text-foreground text-sm">
                        {judge.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-base font-medium mb-1 h-10">
                    {judge.title}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed h-30">
                    {judge.bio}
                  </p>
                  <a
                    href={judge.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-zinc-600 hover:text-primary transition-colors"
                  >
                    <HugeiconsIcon
                      icon={Instagram}
                      size={24}
                      className="w-4 h-4"
                    />
                    Follow on Instagram
                  </a>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
