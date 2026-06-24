"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Background from "@/components/Background";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIs from "@/components/sections/WhatIs";
import History from "@/components/sections/History";
import Styles from "@/components/sections/Styles";
import Positions from "@/components/sections/Positions";
import Etiquette from "@/components/sections/Etiquette";
import Benefits from "@/components/sections/Benefits";
import Summary from "@/components/sections/Summary";
import Learned from "@/components/sections/Learned";
import Footer from "@/components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />

      <SmoothScroll>
        <Background />
        <Nav />

        <main className={introDone ? "" : "pointer-events-none"}>
          <Hero />
          <WhatIs />
          <History />
          <Styles />
          <Positions />
          <Etiquette />
          <Benefits />
          <Summary />
          <Learned />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
