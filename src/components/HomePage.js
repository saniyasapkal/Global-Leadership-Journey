// pages/index.js
"use client";

import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import PragueSection from "@/components/PragueSection";
import AustriaSection from "@/components/AustriaSection";

export default function HomePage() {
  // State to control when each section is shown.
  const [showPrague, setShowPrague] = useState(false);
  const [showAustria, setShowAustria] = useState(false);

  // Refs for smooth scrolling.
  const pragueRef = useRef(null);
  const austriaRef = useRef(null);

  // Trigger when user clicks “Begin My Journey” in HeroSection.
  const handleBeginJourney = () => {
    setShowPrague(true);
    setTimeout(() => {
      pragueRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Trigger when user clicks the "scroll down" button in PragueSection.
  const handleNextSection = () => {
    setShowAustria(true);
    setTimeout(() => {
      austriaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection onBeginJourney={handleBeginJourney} />

      {/* Render the Prague section only after the hero button is clicked */}
      {showPrague && (
        <div ref={pragueRef}>
          <PragueSection onNextSection={handleNextSection} />
        </div>
      )}

      {/* Render the Austria section only after the scroll indicator is clicked in Prague */}
      {showAustria && (
        <div ref={austriaRef}>
          <AustriaSection />
        </div>
      )}
    </div>
  );
}
