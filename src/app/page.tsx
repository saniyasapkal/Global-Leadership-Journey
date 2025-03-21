"use client";

import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import PragueSection from "@/components/PragueSection";
import AustriaSection from "@/components/AustriaSection";
import NiceSection from "@/components/NiceSection";
import GlasgowSection from "@/components/GlasgowSection";
import LeadershipInsights from "@/components/LeadershipInsights";
import ReflectionSection from "@/components/ReflectionSection";

export default function HomePage() {
  const [showJourney, setShowJourney] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  const handleBeginJourney = () => {
    setShowJourney(true);
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to ensure section is mounted
  };

  return (
    <main className="flex flex-col items-center w-full">
      {/* 1️⃣ Hero Landing Section */}
      <HeroSection onBeginJourney={handleBeginJourney} />

      {/* 2️⃣ Global Leadership Journey (Dynamic Sections) */}
      {showJourney && (
        <section
          id="journey"
          ref={journeyRef}
          className="w-full bg-white overflow-hidden"
        >
          <PragueSection />
          <AustriaSection />
          <GlasgowSection />
          <NiceSection />
          {/* Add more city sections here */}
        </section>
      )}

      {/* 3️⃣ Cross-Cultural Leadership Insights */}
      <section id="insights" className="w-full max-w-5xl px-6 my-24">
        <LeadershipInsights />
      </section>

      {/* 4️⃣ Final Personal Reflection */}
      <section id="reflection" className="w-full max-w-5xl px-6 my-24">
        <ReflectionSection />
      </section>
    </main>
  );
}
