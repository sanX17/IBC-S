"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function RulesGuidelines() {
  const rules = [
    {
      title: "Biotope Theme Rules",
      content:
        "Aquascapes must strictly recreate authentic Indian freshwater or brackish water ecosystems, such as: Rivers, Streams, Ponds, Wetlands. Paludariums are allowed if they represent authentic Indian habitats. Only native Indian fish species are permitted. No foreign flora or fauna are allowed. Non-Indian biotope themes are strictly prohibited.",
    },
    {
      title: "Open Participation & Age Requirement",
      content:
        "The contest is open only to residents of India, including NRIs currently residing in India. Participants living abroad are not eligible. Minimum age requirement: 18 years old at the time of submission, or must have parental consent if under 18.",
    },
    {
      title: "Entry Limits",
      content:
        "Each participant can submit only one picture and one video. The entry must include a front-view photo of the entire aquarium. All entries must be created in the year 2026.",
    },
    {
      title: "Photo Requirements",
      content:
        "Lighting: Photos should be taken in good lighting conditions to accurately represent the aquascape. Description: Participants must provide a brief description (up to 150 words) of their aquascape, explaining the name of the ecosystem being recreated, the inspiration behind the design, the native fishes and plants used, and any other details that show the theme or story of the tank.",
    },
    {
      title: "Video Submission Rules",
      content:
        "File Format: Videos must be in MP4 format. Length: Videos should be between 30 seconds and 1 minute. Content: The video must show a walk toward the aquarium, starting from a distance, and focus solely on the front view of the setup. Accuracy: The video should accurately display the entire aquarium and aquascape layout. Editing: Videos must not be edited, filtered, or altered. They should represent the aquascape as seen, without modifications. Must include verbal declaration in the same video (Today is [date]. This tank is created for IBC).",
    },
    {
      title: "File Specifications",
      content:
        "Image File Format: JPEG format. RAW data is not accepted. Editing: Images must not be edited or filtered. They should represent the aquascape as captured, without alterations such as trimming, reversal, or retouching.",
    },
    {
      title: "Point Deduction",
      content:
        "Points may be deducted for the following reasons: Incorrect or incomplete documentation of the Biotope. Incomplete or incorrect entry forms. Incorrect photography or video submissions that do not clearly show the entire aquarium from the front side. Layouts created before 2026. Altered images or videos that do not comply with the rules. Failure to meet specified file format or size limits. Use of artificial materials or decorative elements.",
    },
    {
      title: "Disqualification",
      content:
        "Entries may be disqualified if: They do not include the mandatory verbal declaration in the video. They violate the Guidelines and Rules or do not meet application requirements. The contest steering committee deems them inappropriate. They do not meet the submission guidelines or are found to be plagiarized. They include inappropriate or misleading content. Participants attempt to manipulate votes or engage in unethical practices.",
    },
    {
      title: "Changes and Updates",
      content:
        "The organizers reserve the right to amend the contest rules or submission guidelines as necessary.",
    },
  ];

  return (
    <section id="rules" className="py-24 relative bg-primary/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-flexing mb-4"
          >
            Rules and <span className="text-primary">Guidelines</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Please read the following rules and guidelines carefully before
            submitting your entry.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl px-6 md:px-10"
        >
          <Accordion className="w-full bg-card">
            {rules.map((rule, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base lg:text-lg px-6 hover:text-primary transition-colors duration-300">
                  {rule.title}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 leading-relaxed">
                  {rule.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
