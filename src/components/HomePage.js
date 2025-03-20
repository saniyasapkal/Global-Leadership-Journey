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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Subtle zoom effect for the background video
  const videoVariant = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.03,
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    },
  };

  // Hover effect for the CTA button (scale + glow)
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4" // Replace with your own video path or map animation
        autoPlay
        loop
        muted
        variants={videoVariant}
        initial="hidden"
        animate="visible"
      />

      {/* Overlay to darken the video for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Animated Tagline */}
        <motion.h1
          className="text-white text-3xl md:text-5xl font-extrabold mb-4"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          From Code to Cultures: My Evolution as a Global Leader.
        </motion.h1>

        {/*
          // Alternative tagline:
          // "Bridging Leadership & Innovation Across Borders."
        */}

        {/* Short Intro Paragraph */}
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

        {/* CTA Button */}
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

        {/* Optional: Animated compass/globe icon to reinforce the global theme */}
        <motion.div
          className="mt-8"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3a3 3 0 000-6z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 2a10 10 0 100 20 10 10 0 000-20z" 
            />
          </svg>
        </motion.div>
      </div>

      {/* The Interactive Journey Section (scroll target) */}
      <div ref={journeyRef} id="journey" className="min-h-screen bg-white">
        {/* Replace with your actual Interactive Leadership Journey content */}
      </div>
    </div>
  );
}
