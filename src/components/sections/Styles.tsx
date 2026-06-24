"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Sparkles, Flame, Music2 } from "lucide-react";
import { styles, type DanceStyle } from "@/lib/data";
import SectionHeading from "../SectionHeading";
import TiltCard from "../TiltCard";

function Difficulty({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${
            i < level ? "bg-[#ff8a3d]" : "bg-[#a66a3f]/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function Styles() {
  const [active, setActive] = useState<DanceStyle | null>(null);

  return (
    <section id="styles" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="ประเภทของลีลาศ"
          title="แปดจังหวะ แปดบุคลิก"
          subtitle="ลีลาศแบ่งเป็นสองตระกูลใหญ่ — มาตรฐาน (Standard) ที่สง่างาม และละติน (Latin) ที่เร่าร้อน แต่ละจังหวะมีเสน่ห์เฉพาะตัว"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((s, i) => (
            <motion.button
              key={s.id}
              layoutId={`card-${s.id}`}
              onClick={() => setActive(s)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="text-left"
            >
              <TiltCard max={10} className="h-full">
                <div className="refract group relative h-full overflow-hidden rounded-3xl glass p-6">
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${s.accent} opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
                  />
                  <div style={{ transform: "translateZ(30px)" }} className="relative">
                    <span className="inline-block rounded-full border border-[#a66a3f]/20 bg-white/40 px-3 py-1 text-[11px] font-medium tracking-wide text-[#a66a3f]">
                      {s.category}
                    </span>

                    <h3 className="font-display mt-8 text-3xl font-bold text-[#111]">
                      {s.name}
                    </h3>
                    <p className="text-lg text-[#a66a3f]">{s.thai}</p>

                    <p className="mt-5 text-sm text-[#6b6b6b]">{s.mood}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-widest text-[#a66a3f]/70">
                          ความยาก
                        </p>
                        <Difficulty level={s.difficulty} />
                      </div>
                      <span className="text-xs font-medium text-[#ff8a3d] opacity-0 transition group-hover:opacity-100">
                        ดูเพิ่มเติม →
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-[#111]/40 backdrop-blur-md" />
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-10"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${active.accent} opacity-40 blur-3xl`}
              />
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/60 text-[#111] transition hover:bg-white"
                aria-label="ปิด"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative"
              >
                <span className="rounded-full border border-[#a66a3f]/20 bg-white/40 px-3 py-1 text-[11px] font-medium tracking-wide text-[#a66a3f]">
                  {active.category}
                </span>
                <h3 className="font-display mt-5 text-5xl font-bold text-[#111]">
                  {active.name}
                </h3>
                <p className="text-2xl text-[#a66a3f]">{active.thai}</p>

                <p className="mt-6 leading-relaxed text-[#444]">{active.desc}</p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/40 p-4">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#a66a3f]/70">
                      <Music2 className="h-3 w-3" /> จังหวะ
                    </p>
                    <p className="mt-1 font-medium text-[#111]">{active.tempo}</p>
                  </div>
                  <div className="rounded-2xl bg-white/40 p-4">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#a66a3f]/70">
                      <Sparkles className="h-3 w-3" /> อารมณ์
                    </p>
                    <p className="mt-1 font-medium text-[#111]">{active.mood}</p>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-white/40 p-4">
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-[#a66a3f]/70">
                      ระดับความยาก
                    </p>
                    <Difficulty level={active.difficulty} />
                  </div>
                </div>

                <div className="mt-6 flex gap-3 rounded-2xl bg-gradient-to-br from-[#ff8a3d]/10 to-[#a66a3f]/10 p-4">
                  <Flame className="h-5 w-5 shrink-0 text-[#ff8a3d]" />
                  <p className="text-sm text-[#444]">
                    <span className="font-semibold text-[#a66a3f]">รู้หรือไม่ — </span>
                    {active.fact}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
