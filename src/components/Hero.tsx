"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToId } from "./SmoothScroll";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* glass disc behind title */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full glass"
      />

      <motion.div
        style={{ y: yTitle, opacity }}
        className="container-x relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[#a66a3f]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff8a3d]" />
          โครงงานการศึกษา · พลศึกษา
        </motion.span>

        <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-[#111] sm:text-[10vw] md:text-[8.5rem]">
          <motion.span
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            การเต้น
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient"
          >
            ลีลาศเบื้องต้น
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-8 max-w-xl text-balance text-lg text-[#6b6b6b] sm:text-xl"
        >
          ศิลปะแห่งจังหวะ บุคลิกภาพ และมิตรภาพ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-12"
        >
          <Magnetic strength={0.5}>
            <button
              onClick={() => scrollToId("about")}
              className="refract group relative overflow-hidden rounded-full bg-[#111] px-10 py-4 text-base font-medium text-white shadow-[0_20px_50px_-15px_rgba(255,138,61,0.6)] transition-transform"
            >
              <span className="relative z-10">เริ่มสำรวจ</span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#ff8a3d] to-[#a66a3f] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        onClick={() => scrollToId("about")}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#a66a3f]"
        aria-label="เลื่อนลง"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">เลื่อนลง</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-[#a66a3f]/40 pt-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#ff8a3d]"
            style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }}
          />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
