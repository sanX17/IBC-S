"use client";

import { motion } from "framer-motion";

export default function MasonryGallery() {
  const galleryImages = [
    // Row 1 & 2 Area
    {
      id: 1,
      src: "https://picsum.photos/800/800?random=1",
      alt: "Aerial Coast",
      span: "col-span-2 row-span-2",
    },
    {
      id: 2,
      src: "https://picsum.photos/400/800?random=2",
      alt: "Canyon",
      span: "col-span-1 row-span-2",
    },
    {
      id: 3,
      src: "https://picsum.photos/400/300?random=3",
      alt: "Boats",
      span: "col-span-1 row-span-1",
    },
    {
      id: 4,
      src: "https://picsum.photos/400/300?random=4",
      alt: "Sunset Trees",
      span: "col-span-1 row-span-1",
    },

    // Row 3 Area (The small squares)
    {
      id: 5,
      src: "https://picsum.photos/400/300?random=5",
      alt: "Lake Pier",
      span: "col-span-1 row-span-1",
    },
    {
      id: 6,
      src: "https://picsum.photos/400/300?random=6",
      alt: "Rocky Shore",
      span: "col-span-1 row-span-1",
    },
    {
      id: 7,
      src: "https://picsum.photos/400/300?random=7",
      alt: "Beach Sunset",
      span: "col-span-1 row-span-1",
    },
    {
      id: 8,
      src: "https://picsum.photos/400/300?random=8",
      alt: "Cliff Beach",
      span: "col-span-1 row-span-2",
    },

    // Bottom Section
    {
      id: 9,
      src: "https://picsum.photos/400/300?random=9",
      alt: "Forest Aerial",
      span: "col-span-1 row-span-1",
    },
    {
      id: 10,
      src: "https://picsum.photos/800/400?random=10",
      alt: "Mountains",
      span: "col-span-2 row-span-1",
    },
    {
      id: 11,
      src: "https://picsum.photos/400/300?random=11",
      alt: "Dark Rocks",
      span: "col-span-1 row-span-1",
    },
    {
      id: 12,
      src: "https://picsum.photos/800/400?random=12",
      alt: "Milky Way",
      span: "col-span-2 row-span-1",
    },
    {
      id: 13,
      src: "https://picsum.photos/400/300?random=11",
      alt: "Dark Rocks",
      span: "col-span-1 row-span-1",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-2 sm:px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-flexing text-primary">
            <span className="text-foreground">Trip</span> Gallery
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Explore moments from our exciting biotope journeys and event
            experiences
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-1 sm:gap-2 auto-rows-[100px] sm:auto-rows-[150px] md:auto-rows-[200px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className={`${image.span} relative overflow-hidden rounded-xs sm:rounded-sm bg-gray-100`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: image.id * 0.05, // stagger effect
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
