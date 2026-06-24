"use client";

import { motion } from "motion/react";
import { whatIsCards } from "@/lib/data";
import SectionHeading from "../SectionHeading";
import TiltCard from "../TiltCard";
import Icon from "../Icon";

export default function WhatIs() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="ลีลาศคืออะไร"
          title="ศิลปะที่ซ่อนอยู่ในทุกย่างก้าว"
          subtitle="ลีลาศไม่ใช่เพียงการเคลื่อนไหว แต่คือการผสานจังหวะ บุคลิกภาพ และความสัมพันธ์เข้าด้วยกันอย่างงดงาม"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatIsCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            >
              <TiltCard className="h-full">
                <div className="refract group relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-3xl glass p-8">
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ff8a3d]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-white shadow-lg"
                  >
                    <Icon name={card.icon} className="h-6 w-6" />
                  </div>

                  <div style={{ transform: "translateZ(25px)" }} className="relative mt-6">
                    <h3 className="font-display text-2xl font-semibold text-[#111]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
