"use client";

import { motion } from "motion/react";
import { learned } from "@/lib/data";
import SectionHeading from "../SectionHeading";

export default function Learned() {
  return (
    <section className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="บทสรุป"
          title="สิ่งที่ได้เรียนรู้"
          subtitle="องค์ความรู้ทั้งหมดเชื่อมโยงกันเป็นภาพเดียว — การเดินทางของผู้เริ่มต้นสู่โลกของลีลาศ"
        />

        <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3">
          {learned.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="refract group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-[1.75rem] glass p-5 text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff8a3d]/0 to-[#ff8a3d]/0 transition-all duration-500 group-hover:from-[#ff8a3d]/10 group-hover:to-[#a66a3f]/10" />
              <span className="font-display grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-white shadow-lg">
                {i + 1}
              </span>
              <p className="font-display mt-4 text-lg font-medium leading-tight text-[#111]">
                {item}
              </p>
              <span className="absolute bottom-3 h-1 w-8 rounded-full bg-[#ff8a3d]/30 transition-all duration-500 group-hover:w-12 group-hover:bg-[#ff8a3d]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
