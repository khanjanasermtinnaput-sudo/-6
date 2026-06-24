"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { navItems } from "@/lib/data";
import { scrollToId } from "./SmoothScroll";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => obs.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#ff8a3d] via-[#ffb07a] to-[#a66a3f]"
      />

      {/* top brand */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <button
            onClick={() => scrollToId("hero")}
            className={`font-display flex items-center gap-2 text-lg font-semibold tracking-tight transition ${
              scrolled ? "text-[#111]" : "text-[#111]"
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#ff8a3d] to-[#a66a3f] text-white">
              ✦
            </span>
            ลีลาศ
          </button>

          <span
            className={`hidden rounded-full px-4 py-1.5 text-xs tracking-[0.2em] text-[#a66a3f] transition sm:inline-block ${
              scrolled ? "glass" : "border border-[#a66a3f]/20"
            }`}
          >
            BALLROOM · STORYTELLING
          </span>
        </div>
      </motion.header>

      {/* right rail dot nav */}
      <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col items-end gap-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className="group flex items-center gap-2"
                aria-label={item.label}
              >
                <span
                  className={`whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                    active === item.id ? "text-[#ff8a3d]" : "text-[#6b6b6b]"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active === item.id
                      ? "h-2.5 w-2.5 bg-[#ff8a3d]"
                      : "h-2 w-2 bg-[#a66a3f]/30 group-hover:bg-[#a66a3f]/60"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
