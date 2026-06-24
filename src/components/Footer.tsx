"use client";

import { motion } from "motion/react";
import { scrollToId } from "./SmoothScroll";

export default function Footer() {
  return (
    <footer className="relative px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="refract container-x relative overflow-hidden rounded-[2.5rem] glass p-12 text-center sm:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#ff8a3d]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#a66a3f]/20 blur-3xl" />

        <div className="relative">
          <span className="font-display mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-2xl text-white">
            ✦
          </span>
          <h3 className="font-display mt-6 text-3xl font-semibold text-[#111] sm:text-4xl">
            การเต้น<span className="text-gradient">ลีลาศเบื้องต้น</span>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[#6b6b6b]">
            ศิลปะแห่งจังหวะ บุคลิกภาพ และมิตรภาพ ที่ทุกคนเริ่มต้นเรียนรู้ได้
          </p>

          <button
            onClick={() => scrollToId("hero")}
            className="mt-8 rounded-full border border-[#a66a3f]/30 px-6 py-3 text-sm font-medium text-[#a66a3f] transition hover:border-[#ff8a3d] hover:text-[#ff8a3d]"
          >
            ↑ กลับขึ้นด้านบน
          </button>

          <div className="mt-10 border-t border-[#a66a3f]/10 pt-6 text-sm text-[#6b6b6b]">
            จัดทำเพื่อการศึกษา · {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
