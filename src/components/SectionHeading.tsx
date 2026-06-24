"use client";

import { motion } from "motion/react";
import AnimatedText from "./AnimatedText";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-16 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } max-w-3xl`}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#ff8a3d]/30 bg-[#ff8a3d]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#a66a3f]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a3d]" />
        {eyebrow}
      </motion.span>

      <AnimatedText
        as="h2"
        text={title}
        className="font-display mt-6 text-4xl font-semibold leading-[1.08] text-[#111] sm:text-5xl md:text-6xl"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 text-lg leading-relaxed text-[#6b6b6b]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
