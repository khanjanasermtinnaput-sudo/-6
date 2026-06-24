"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/lib/data";
import SectionHeading from "../SectionHeading";

export default function History() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (reduce || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${distance + window.innerHeight * 0.6}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (fillRef.current) {
            fillRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="history" ref={sectionRef} className="relative overflow-hidden">
      <div className="container-x pt-28">
        <SectionHeading
          eyebrow="ประวัติความเป็นมา"
          title="การเดินทางข้ามกาลเวลา"
          subtitle="จากงานรื่นเริงในยุโรปโบราณ สู่ฟลอร์ลีลาศทั่วโลก และผืนแผ่นดินไทย"
          align="left"
        />
      </div>

      {/* progress line */}
      <div className="container-x mb-10">
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#a66a3f]/15">
          <div
            ref={fillRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-[#ff8a3d] to-[#a66a3f]"
          />
        </div>
      </div>

      {/* horizontal track (becomes vertical stack on mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-[4vw] pb-24 md:w-max md:flex-row md:items-stretch md:gap-10 md:pb-32"
      >
        {timeline.map((stage, i) => (
          <div
            key={i}
            className="relative flex w-full shrink-0 flex-col justify-between md:w-[clamp(320px,34vw,460px)]"
          >
            {/* node */}
            <div className="mb-6 flex items-center gap-4">
              <span className="font-display grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-lg font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,138,61,0.7)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-[#ff8a3d]/60 to-transparent md:block" />
            </div>

            <div className="refract relative overflow-hidden rounded-3xl glass p-8">
              <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#ff8a3d]/15 blur-2xl" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#ff8a3d]">
                {stage.year}
              </span>
              <h3 className="font-display mt-3 text-3xl font-semibold text-[#111]">
                {stage.era}
              </h3>
              <p className="mt-1 text-lg font-medium text-[#a66a3f]">
                {stage.title}
              </p>
              <p className="mt-4 leading-relaxed text-[#6b6b6b]">{stage.desc}</p>
            </div>
          </div>
        ))}

        {/* end cap */}
        <div className="hidden w-[30vw] shrink-0 items-center md:flex">
          <p className="font-display text-2xl font-light text-[#a66a3f]/60">
            …และเรื่องราวยังคงดำเนินต่อไป
          </p>
        </div>
      </div>
    </section>
  );
}
