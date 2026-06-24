"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { Check } from "lucide-react";
import { etiquette } from "@/lib/data";
import SectionHeading from "../SectionHeading";
import Icon from "../Icon";

export default function Etiquette() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [done, setDone] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDone(Math.min(etiquette.length, Math.ceil(v * etiquette.length)));
  });

  return (
    <section id="etiquette" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="มารยาทในการลีลาศ"
          title="ความงามที่มาพร้อมความเคารพ"
          subtitle="หัวใจของลีลาศคือมารยาทและการให้เกียรติ — สิ่งที่ทำให้ฟลอร์เต้นรำงดงามไปกว่าท่วงท่า"
        />

        <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
          {/* progress rail */}
          <div className="hidden lg:flex lg:flex-col lg:items-center">
            <div className="relative h-full w-1 overflow-hidden rounded-full bg-[#a66a3f]/15">
              <motion.div
                style={{ scaleY: fill }}
                className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#ff8a3d] to-[#a66a3f]"
              />
            </div>
            <span className="mt-4 whitespace-nowrap text-xs font-medium tracking-widest text-[#a66a3f]">
              {done}/{etiquette.length}
            </span>
          </div>

          <div ref={ref} className="flex flex-col gap-5">
            {etiquette.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="refract group relative flex items-start gap-5 overflow-hidden rounded-3xl glass p-6 sm:p-7"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#ff8a3d]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-white shadow-lg">
                  <Icon name={rule.icon} className="h-6 w-6" />
                </div>

                <div className="relative flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-[#111]">
                      {rule.title}
                    </h3>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff8a3d]/15 text-[#ff8a3d]">
                      <Check className="h-3 w-3" />
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-[#6b6b6b]">{rule.desc}</p>
                </div>

                <span className="font-display absolute right-6 top-5 text-5xl font-bold text-[#a66a3f]/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
