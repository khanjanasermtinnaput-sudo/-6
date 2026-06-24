"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
};

/**
 * Fixed ambient background — gradient orbs, light rays, and floating
 * particles that drift upward. Subtly parallaxes on scroll & mouse.
 */
export default function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 18 : 36;
    const next: Particle[] = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 5,
      delay: `${Math.random() * 18}s`,
      duration: `${16 + Math.random() * 18}s`,
      drift: `${(Math.random() - 0.5) * 120}px`,
      opacity: 0.25 + Math.random() * 0.45,
    }));
    setParticles(next);
  }, []);

  // Mouse parallax for orbs
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty("--mx", `${x * 24}px`);
      el.style.setProperty("--my", `${y * 24}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #fff 40%, #fff6ef 100%)" }}
    >
      {/* Gradient orbs */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <div
          className="orb float-a"
          style={{
            width: 520,
            height: 520,
            top: "-8%",
            left: "calc(8% + var(--mx, 0px))",
            background:
              "radial-gradient(circle at 30% 30%, #ffb07a, #ff8a3d 60%, transparent 72%)",
          }}
        />
        <div
          className="orb float-b"
          style={{
            width: 440,
            height: 440,
            top: "30%",
            right: "calc(2% - var(--mx, 0px))",
            background:
              "radial-gradient(circle at 60% 40%, #ffd2a8, #a66a3f 65%, transparent 75%)",
            opacity: 0.4,
          }}
        />
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div
          className="orb float-a"
          style={{
            width: 380,
            height: 380,
            bottom: "6%",
            left: "calc(30% + var(--my, 0px))",
            background:
              "radial-gradient(circle at 50% 50%, #ffb07a, transparent 70%)",
            opacity: 0.35,
            animationDelay: "4s",
          }}
        />
      </motion.div>

      {/* Light rays */}
      <div
        className="absolute left-1/2 top-[-30%] h-[80vh] w-[60vw] -translate-x-1/2"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255,138,61,0.10) 20deg, transparent 40deg, rgba(255,176,122,0.10) 70deg, transparent 95deg)",
          animation: "sweep 14s ease-in-out infinite",
          filter: "blur(6px)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                background:
                  "radial-gradient(circle, rgba(255,138,61,0.9), rgba(255,176,122,0.3))",
                animation: `rise ${p.duration} linear ${p.delay} infinite`,
                "--p-x": p.drift,
                "--p-op": p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Soft grain / vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(166,106,63,0.06) 100%)",
        }}
      />
    </div>
  );
}
