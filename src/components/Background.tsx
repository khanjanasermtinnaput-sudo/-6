"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
};

/**
 * Lightweight ambient background — two slow gradient orbs and a few
 * drifting particles. Kept minimal & GPU-friendly (no scroll/mouse
 * re-compositing of blurred layers) to avoid scroll jank.
 */
export default function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const count = window.innerWidth < 768 ? 6 : 12;
    const next: Particle[] = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: `${Math.random() * 18}s`,
      duration: `${18 + Math.random() * 16}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
      opacity: 0.2 + Math.random() * 0.35,
    }));
    setParticles(next);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 0%, #fff 45%, #fff6ef 100%)",
      }}
    >
      {/* Gradient orbs — slow CSS float only */}
      <div
        className="orb float-a"
        style={{
          width: 460,
          height: 460,
          top: "-6%",
          left: "8%",
          background:
            "radial-gradient(circle at 30% 30%, #ffb07a, #ff8a3d 60%, transparent 72%)",
        }}
      />
      <div
        className="orb float-b"
        style={{
          width: 400,
          height: 400,
          top: "32%",
          right: "2%",
          background:
            "radial-gradient(circle at 60% 40%, #ffd2a8, #a66a3f 65%, transparent 75%)",
          opacity: 0.35,
        }}
      />

      {/* Static soft light wash (no animation) */}
      <div
        className="absolute left-1/2 top-[-25%] h-[70vh] w-[55vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,138,61,0.08), transparent 70%)",
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
    </div>
  );
}
