"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// Reusable variants (you can extract these to a shared file later)
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
    },
  },
};

export default function AboutIBC() {
  const stats = [
    {
      label: "Our Vision",
      value:
        "At IBC, we envision a vibrant community of aquascapers, hobbyists, and nature enthusiasts coming together to share their passion for creating stunning underwater landscapes that reflect the unique ecosystems of India. This championship is not just a competition; it's an opportunity to foster creativity, learn from one another, and promote awareness about the importance of preserving our natural environments.",
    },
    {
      label: "Event Highlights",
      value:
        "Categories: Participants can compete in various categories, showcasing their skills in replicating authentic Indian biotopes. Expert Judging: A panel of experienced judges will evaluate entries based on criteria such as general impression, accuracy of plants and animals, hardscape design, and the overall condition of the aquascape. Prizes: Exciting prizes await the top entries, including aquariums and accessories sponsored by our partners.",
    },
    {
      label: "Participation",
      value:
        "We invite aquascapers of all skill levels to participate in IBC. Whether you are a seasoned expert or a beginner, this championship provides a platform to showcase your creativity and passion for aquascaping. All entries must be submitted through our official website, ensuring a smooth and organized process.",
    },
  ];

  return (
    <section
      id="about-ibc"
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          {/* Left Content – Title + Paragraph */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col w-[80%] space-y-6">
              <motion.div className="space-y-2" variants={headerVariants}>
                <span className="font-semibold uppercase tracking-widest text-sm text-muted-foreground">
                  About IBC
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-flexing text-primary">
                  Indian Biotope{" "}
                  <span className="text-foreground">Championship</span>
                </h2>
              </motion.div>

              <motion.p
                variants={textVariants}
                className="text-foreground/70 leading-relaxed max-w-3xl"
              >
                Welcome to the Indian Biotope Championship IBC - an exciting
                celebration of aquascaping that highlights the rich diversity of
                India&apos;s aquatic ecosystems. Organized by Mangalore
                Aquatics, this event invites aquascapers to showcase the beauty
                and intricacies of Indian biotopes, encouraging them to
                replicate and honor the natural habitats found throughout the
                country.
              </motion.p>
            </div>

            <div className="lg:w-[37%] w-full mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-4/3 rounded-3xl overflow-hidden relative">
                  <img
                    src="/image6.jpg"
                    alt="Beautiful armored catfish from native biotope"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Stats – Cards with stagger */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={cardVariants}>
                <Card className="p-6 bg-primary border border-border flex flex-col gap-3 h-full hover:shadow-xl transition-shadow duration-300">
                  <span className="text-2xl font-semibold text-white font-flexing tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-sm text-gray-200 leading-relaxed">
                    {stat.value}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
