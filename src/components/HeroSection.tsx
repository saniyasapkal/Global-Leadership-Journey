// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onBeginJourney }: { onBeginJourney: () => void }) {
  // stagger container
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  };

  // headline + copy
  const textVariants = {
    hidden:   { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // button pop
  const buttonVariants = {
    hidden:   { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* full-bleed, softly-pulsing video */}
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/dynamic-bg.mp4"
        autoPlay
        muted
        loop
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* dark tint for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* animated copy + CTA */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white text-3xl md:text-5xl font-bold mb-4"
          variants={textVariants}
        >
          My Evolution as a Global Leader
        </motion.h1>

        <motion.p
          className="text-white text-lg md:text-xl max-w-2xl mb-8"
          variants={textVariants}
          transition={{ delay: 0.5 }}
        >
          How global experiences shaped my leadership, adaptability, and vision.
        </motion.p>

        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full focus:outline-none shadow-lg"
          variants={buttonVariants}
          whileHover={{ scale: 1.05 }}
          onClick={onBeginJourney}
        >
          Begin My Journey
        </motion.button>
      </motion.div>
    </section>
  );
}
