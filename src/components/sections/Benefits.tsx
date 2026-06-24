"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { benefits, type Benefit } from "@/lib/data";
import SectionHeading from "../SectionHeading";
import Counter from "../Counter";
import Icon from "../Icon";

const groups = ["ร่างกาย", "จิตใจ", "สังคม"] as const;
const groupMeta: Record<string, { en: string; desc: string }> = {
  ร่างกาย: { en: "Physical", desc: "แข็งแรง คล่องตัว และสมดุล" },
  จิตใจ: { en: "Mental", desc: "ผ่อนคลาย มั่นใจ และมีสมาธิ" },
  สังคม: { en: "Social", desc: "มิตรภาพ มารยาท และการเข้าสังคม" },
};

function Ring({ b }: { b: Benefit }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const isPercent = b.suffix.includes("%");
  const pct = isPercent ? b.value : Math.min(100, (b.value / 500) * 100);
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-36 w-36">
        <svg ref={ref} viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(166,106,63,0.12)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none"
            stroke="url(#ringGrad)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C - (C * pct) / 100 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8a3d" />
              <stop offset="100%" stopColor="#a66a3f" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-white">
            <Icon name={b.icon} className="h-5 w-5" />
          </div>
        </div>
      </div>
      <p className="font-display mt-4 text-3xl font-bold text-[#111]">
        <Counter value={b.value} suffix={b.suffix} />
      </p>
      <p className="mt-1 text-sm text-[#6b6b6b]">{b.label}</p>
    </div>
  );
}

export default function Benefits() {
  return (
    <section id="benefits" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="ประโยชน์ของการลีลาศ"
          title="เคลื่อนไหวเพียงครั้ง ได้คืนทั้งกายและใจ"
          subtitle="ลีลาศมอบประโยชน์รอบด้าน ทั้งต่อร่างกาย จิตใจ และสังคม ในเวลาเดียวกัน"
        />

        <div className="space-y-10">
          {groups.map((g, gi) => {
            const items = benefits.filter((b) => b.group === g);
            return (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: gi * 0.1 }}
                className="refract relative overflow-hidden rounded-[2rem] glass p-8 sm:p-10"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
                  <div>
                    <span className="text-sm uppercase tracking-[0.3em] text-[#ff8a3d]">
                      {groupMeta[g].en}
                    </span>
                    <h3 className="font-display mt-2 text-4xl font-bold text-[#111]">
                      {g}
                    </h3>
                    <p className="mt-3 text-[#6b6b6b]">{groupMeta[g].desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {items.map((b) => (
                      <Ring key={b.id} b={b} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
