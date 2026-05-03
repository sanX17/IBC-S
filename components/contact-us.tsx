"use client";

import { Card } from "@/components/ui/card";
import { Mail, Phone } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
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

export default function ContactUs() {
  const contacts = [
    {
      icon: Mail,
      title: "Email",
      details: "ibcclub.in@gmail.com",
      description: "For general inquiries and support",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 8147005987 / +91 7022675370 / +91 9945176049",
      description: "Call us during business hours",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-5xl mx-auto">
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
              Contact <span className="text-foreground">Us</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Have questions? Get in touch with our team. We&apos;re here to
              help!
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
          >
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card
                    key={index}
                    className="p-6 bg-card border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="p-3 bg-primary/10 rounded-lg w-fit">
                        <HugeiconsIcon
                          icon={Icon}
                          size={24}
                          color="currentColor"
                          className="text-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-primary">
                          {contact.title}
                        </h3>
                        <p className="text-foreground font-medium">
                          {contact.details}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
