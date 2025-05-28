// src/app/page.tsx
"use client";

import { useState, useRef } from "react";
import HeroSection    from "@/components/HeroSection";
import PragueSection  from "@/components/PragueSection";
import AustriaSection from "@/components/AustriaSection";
import GlasgowSection from "@/components/GlasgowSection";
import NiceSection    from "@/components/NiceSection";
import LeadershipInsights from "@/components/LeadershipInsights";
import CallToAction   from "@/components/CallToAction";

export default function HomePage() {
  const [showJourney, setShowJourney] = useState(false);
  const journeyRef = useRef<HTMLElement>(null);

  const handleBeginJourney = () => {
    setShowJourney(true);
    setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* full-width video hero */}
      <HeroSection onBeginJourney={handleBeginJourney} />

      {showJourney && (
        <section id="journey" ref={journeyRef} className="bg-gray-50">
          {/* stacked full-bleed + container sections */}
          <PragueSection />
          <AustriaSection />
          <GlasgowSection />
          <NiceSection />

          {/* insights & CTA all live inside a nice container */}
          <div className="max-w-7xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8 py-16">
            <LeadershipInsights />
            <CallToAction />
          </div>
        </section>
      )}
    </main>
  );
}
