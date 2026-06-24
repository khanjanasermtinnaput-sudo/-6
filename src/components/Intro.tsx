"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const sequence = ["จังหวะ", "ความสง่างาม", "ศิลปะแห่งการเคลื่อนไหว"];

export default function Intro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  // step 0..2 = words, 3 = big reveal, 4 = exit
  useEffect(() => {
    if (!show) return;
    const timings = [1400, 1400, 1600, 2200];
    if (step < 4) {
      const t = setTimeout(() => setStep((s) => s + 1), timings[step]);
      return () => clearTimeout(t);
    } else {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, show]);

  function finish() {
    setShow(false);
    setTimeout(onDone, 900);
  }

  // Lock scroll while intro is visible
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(255,138,61,0.18), transparent 70%)",
            }}
          />

          {/* drifting embers */}
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full bg-[#ff8a3d]"
              style={{
                left: `${(i * 53) % 100}%`,
                width: 3,
                height: 3,
                opacity: 0.5,
                animation: `rise ${10 + (i % 7) * 2}s linear ${i * 0.6}s infinite`,
                ["--p-op" as string]: "0.5",
              }}
            />
          ))}

          <div className="relative flex flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              {step < 3 ? (
                <motion.h2
                  key={step}
                  initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl font-light tracking-[0.3em] text-white/90 sm:text-5xl"
                >
                  {sequence[step]}
                </motion.h2>
              ) : (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-7 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent"
                  />
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-5xl font-semibold leading-tight text-white sm:text-7xl md:text-8xl"
                  >
                    การเต้น
                    <span className="text-gradient">ลีลาศ</span>
                  </motion.h1>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-7 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip */}
          <button
            onClick={finish}
            className="absolute bottom-8 right-8 rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition hover:border-white/50 hover:text-white"
          >
            ข้ามอินโทร →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
