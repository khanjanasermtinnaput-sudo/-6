"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const line1 = "ลีลาศไม่ใช่เพียงการเต้น";
const line2 = "แต่คือศิลปะของการสื่อสารผ่านการเคลื่อนไหว";

function Words({ text, start }: { text: string; start: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0.12 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-30% 0px" }}
          transition={{ duration: 0.5, delay: start + i * 0.08 }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </>
  );
}

export default function Summary() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-32"
    >
      {/* dark dramatic backdrop */}
      <motion.div
        style={{ x: bgX, scale }}
        className="absolute inset-0 -z-0"
      >
        <div className="absolute inset-0 bg-[#0c0a09]" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 40%, rgba(255,138,61,0.28), transparent 60%), radial-gradient(50% 50% at 75% 70%, rgba(166,106,63,0.3), transparent 60%)",
          }}
        />
      </motion.div>

      {/* floating light particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-[#ffb07a]"
          style={{
            left: `${(i * 41) % 100}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            opacity: 0.5,
            animation: `rise ${12 + (i % 6) * 2}s linear ${i * 0.7}s infinite`,
            ["--p-op" as string]: "0.6",
          }}
        />
      ))}

      <blockquote className="container-x relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-display block text-7xl text-[#ff8a3d]/40"
        >
          &ldquo;
        </motion.span>
        <p className="font-display mx-auto max-w-4xl text-balance text-3xl font-light leading-snug text-white sm:text-5xl md:text-6xl">
          <Words text={line1} start={0} />
          <br />
          <span className="text-gradient font-medium">
            <Words text={line2} start={0.6} />
          </span>
        </p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto mt-10 h-px bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent"
        />
      </blockquote>
    </section>
  );
}
