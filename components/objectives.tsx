"use client";

import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

// Reusable variants
// const sectionVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.25,
//     },
//   },
// };

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
      duration: 0.7,
    },
  },
};

export default function Objectives() {
  const objectives = [
    {
      number: "01",
      title: "Contest Theme",
      description:
        "Recreate the Beauty of India's Aquatic Ecosystems Participants are encouraged to transform their aquariums into stunning representations of India's diverse aquatic habitats, from lush riverbeds to tranquil wetlands. The use of native plants, fish, and materials is essential, highlighting creativity, authenticity, and conservation, and fostering a deeper connection to India's freshwater environments.",
    },
    {
      number: "02",
      title: "Key Dates",
      description:
        "Start Date: November 1, 2026\n Submission Deadline: December 31, 2026\n Judging Period: January 1 to January 30, 2027\n Winners Announced: January 31, 2027",
    },
    {
      number: "03",
      title: "Educational Excellence",
      description:
        "Submission Platform: All entries for IBC must be submitted through the official website: www.ibcclub.in\n Required Submissions: Photo Submission: One high-quality front-view photo of the aquarium setup that captures the design and details of the biotope.\n Video Submission: A short walk-to-the-aquarium video (30 seconds to 1 minute), beginning from a distance and walking toward the aquarium, focusing solely on the front view of the setup. Please adhere to the specified file formats and size limits for smooth processing.",
    },
  ];

  const isMobile = useIsMobile();

  return (
    <section
      id="objectives"
      className="w-full flex flex-col min-h-screen bg-primary/5"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Column: Full-Bleed Image */}
        <motion.div
          className="w-full lg:w-1/2 relative min-h-[30vh] sm:min-h-[50vh] lg:min-h-full"
          initial={{ opacity: 0, x: isMobile ? -10 : -100 }}
          whileInView={{ opacity: 1, x: isMobile ? 10 : 100 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/image4.png"
            alt="Native fish species in natural biotope habitat"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-24"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Header */}
            <motion.div className="space-y-4 mb-10" variants={headerVariants}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-flexing text-primary">
                <span className="text-foreground">Our</span> Objectives
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                The Indian Biotope Championship IBC is a pioneering event in
                India, dedicated to celebrating the recreation of the
                country&apos;s rich and diverse aquatic ecosystems within
                aquariums. This contest invites participants to design biotope
                aquascapes that authentically represent India&apos;s natural
                habitats, including rivers, lakes, streams, and wetlands, using
                native plants, fish, and materials.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mt-20 mb-10 max-w-7xl mx-auto">
        {objectives.map((objective, index) => (
          <motion.div
            key={objective.number}
            variants={cardVariants}
            // Make the 3rd card span full width to accommodate longer text nicely
            className={
              index === 2 ? "md:col-span-2 lg:col-span-1 xl:col-span-2" : ""
            }
          >
            <Card className="p-6 bg-card ring-0 hover:ring-1 hover:ring-primary/50 transition-all duration-300 h-full flex flex-col">
              <div className="space-y-4 flex-1">
                <span className="text-4xl font-bold text-primary/40">
                  {objective.number}
                </span>
                <h3 className="text-xl font-semibold text-primary">
                  {objective.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line text-sm">
                  {objective.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
