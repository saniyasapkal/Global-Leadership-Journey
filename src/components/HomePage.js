"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  // Reference to the Journey section for smooth scrolling
  const journeyRef = useRef(null);

  const scrollToJourney = () => {
    journeyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Variants for text fade-in and slight upward motion
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  // Hover effect for the CTA button (scale + glow)
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 10px rgba(255,255,255,0.6)",
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background Video with controls for debugging */}
        <motion.video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/dynamic-bg.mp4" // Ensure the file exists in public/videos/dynamic-bg.mp4
          controls // Add this temporarily to see if the video player appears
          autoPlay
          loop
          muted
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.h1
            className="text-white text-3xl md:text-5xl font-extrabold mb-4"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            From Code to Cultures: My Evolution as a Global Leader.
          </motion.h1>
          <motion.p
            className="text-white text-base md:text-lg max-w-2xl mb-8"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            This experience has transformed my leadership mindset by emphasizing
            adaptability, cross-cultural collaboration, and personal growth. Join me
            as I share how technology and teamwork converge across borders.
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            whileHover={buttonHover}
            onClick={scrollToJourney}
          >
            Begin My Journey
          </motion.button>
        </div>
      </div>

      {/* JOURNEY SECTION */}
      <div ref={journeyRef} id="journey" className="min-h-screen bg-white">
        <div className="p-8">
          <h2 className="text-3xl font-bold">Interactive Leadership Journey</h2>
          <p className="mt-4">
            This is where your journey content goes. Scroll to explore more details.
          </p>
        </div>
      </div>
    </>
  );
}
