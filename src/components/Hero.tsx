"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // mouse depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const d1x = useTransform(smx, [-1, 1], [-30, 30]);
  const d1y = useTransform(smy, [-1, 1], [-20, 20]);
  const d2x = useTransform(smx, [-1, 1], [25, -25]);
  const d2y = useTransform(smy, [-1, 1], [18, -18]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* silhouette dancers */}
      <motion.div
        style={{ x: d1x, y: d1y, scale }}
        className="pointer-events-none absolute bottom-0 left-[6%] hidden h-[70vh] w-auto opacity-[0.10] md:block"
      >
        <Dancer flip />
      </motion.div>
      <motion.div
        style={{ x: d2x, y: d2y, scale }}
        className="pointer-events-none absolute bottom-0 right-[6%] hidden h-[78vh] w-auto opacity-[0.10] md:block"
      >
        <Dancer />
      </motion.div>

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

function Dancer({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 320"
      className="h-full w-auto"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="url(#dancerGrad)"
    >
      <defs>
        <linearGradient id="dancerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#a66a3f" />
        </linearGradient>
      </defs>
      {/* stylised dancer silhouette */}
      <circle cx="60" cy="28" r="16" />
      <path d="M60 44 C50 60 48 90 52 120 L40 200 L30 290 L46 290 L60 210 L74 290 L90 290 L80 200 L68 120 C72 90 70 60 60 44 Z" />
      <path d="M52 70 L14 110 L20 122 L60 90 Z" />
      <path d="M68 70 L112 96 L106 110 L60 92 Z" />
    </svg>
  );
}
