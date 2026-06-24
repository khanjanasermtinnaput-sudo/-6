"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { positions } from "@/lib/data";
import SectionHeading from "../SectionHeading";

// Two-figure configurations per position id
const figures: Record<
  string,
  { a: number; b: number; connect: "frame" | "single" | "double" }
> = {
  closed: { a: 86, b: 134, connect: "frame" },
  open: { a: 64, b: 156, connect: "single" },
  frame: { a: 88, b: 132, connect: "frame" },
  hold: { a: 80, b: 140, connect: "double" },
};

function Figure({ x, flip, color }: { x: number; flip?: boolean; color: string }) {
  return (
    <motion.g
      animate={{ x }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{ transform: flip ? "scaleX(-1)" : undefined, transformOrigin: "center" }}
    >
      <motion.circle cx="0" cy="40" r="13" fill={color} />
      <motion.line x1="0" y1="53" x2="0" y2="120" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* arms */}
      <motion.line x1="0" y1="70" x2="26" y2="58" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <motion.line x1="0" y1="70" x2="-22" y2="86" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* legs */}
      <motion.line x1="0" y1="120" x2="-16" y2="172" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <motion.line x1="0" y1="120" x2="18" y2="172" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </motion.g>
  );
}

export default function Positions() {
  const [active, setActive] = useState(positions[0].id);
  const cfg = figures[active];
  const current = positions.find((p) => p.id === active)!;

  return (
    <section id="positions" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="ท่าพื้นฐาน"
          title="โครงสร้างของการเคลื่อนไหว"
          subtitle="เลือกแต่ละท่าเพื่อดูการจัดวางตำแหน่งของคู่เต้น — ทุกท่ามีหน้าที่และความหมายในตัวเอง"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Stage */}
          <div className="refract relative overflow-hidden rounded-[2rem] glass p-6">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a3d]/15 blur-3xl" />
            <svg viewBox="0 0 220 220" className="mx-auto h-[340px] w-full">
              {/* floor */}
              <ellipse cx="110" cy="200" rx="96" ry="12" fill="#a66a3f" opacity="0.12" />

              {/* connection */}
              <AnimatePresence mode="wait">
                <motion.g
                  key={cfg.connect}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cfg.connect === "frame" && (
                    <>
                      <motion.line
                        x1={cfg.a + 26} y1={60 + 18} x2={cfg.b - 26} y2={60 + 18}
                        stroke="#ff8a3d" strokeWidth="4" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.line
                        x1={cfg.a + 22} y1={60 + 46} x2={cfg.b - 22} y2={60 + 46}
                        stroke="#ff8a3d" strokeWidth="4" strokeLinecap="round" opacity="0.6"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      />
                    </>
                  )}
                  {cfg.connect === "single" && (
                    <motion.line
                      x1={cfg.a + 26} y1={60 + 18} x2={cfg.b - 26} y2={60 + 18}
                      stroke="#ff8a3d" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray="6 8"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  {cfg.connect === "double" && (
                    <>
                      <motion.circle cx={(cfg.a + cfg.b) / 2} cy={60 + 18} r="6" fill="#ff8a3d" />
                      <motion.line
                        x1={cfg.a + 26} y1={60 + 18} x2={cfg.b - 26} y2={60 + 18}
                        stroke="#ff8a3d" strokeWidth="4" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </>
                  )}
                </motion.g>
              </AnimatePresence>

              <g transform="translate(0,20)">
                <Figure x={cfg.a} color="#a66a3f" />
                <Figure x={cfg.b} flip color="#ff8a3d" />
              </g>
            </svg>
          </div>

          {/* Controls + description */}
          <div>
            <div className="flex flex-wrap gap-3">
              {positions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`rounded-full px-5 py-3 text-sm font-medium transition-all ${
                    active === p.id
                      ? "bg-[#111] text-white shadow-[0_10px_30px_-10px_rgba(255,138,61,0.7)]"
                      : "glass text-[#a66a3f] hover:text-[#111]"
                  }`}
                >
                  {p.thai}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-[#ff8a3d]">
                  {current.name}
                </p>
                <h3 className="font-display mt-2 text-4xl font-semibold text-[#111]">
                  {current.thai}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-[#6b6b6b]">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
