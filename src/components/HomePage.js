"use client";

import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/timeline";

export default function HomePage() {
  const [showTimeline, setShowTimeline] = useState(false);
  const journeyRef = useRef(null);

  const handleBeginJourney = () => {
    setShowTimeline(true);
    // Wait briefly to ensure the Journey section mounts before scrolling
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection onBeginJourney={handleBeginJourney} />

      {/* Conditionally render the JOURNEY SECTION */}
      {showTimeline && (
        <div ref={journeyRef} id="journey" className="min-h-screen bg-white">
          <TimelineSection />
          <div className="p-8">
            <h2 className="text-3xl font-bold">Interactive Leadership Journey</h2>
            <p className="mt-4">
              This is where your full journey content goes. Explore each experience as you scroll.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
