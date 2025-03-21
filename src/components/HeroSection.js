"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onBeginJourney }) {
  // Framer Motion variants for container, text, and button
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/dynamic-bg.mp4" 
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

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white text-3xl md:text-5xl font-bold mb-4"
          variants={textVariants}
        >
          From Code to Cultures: My Evolution as a Global Leader
        </motion.h1>
        <motion.p
          className="text-white text-lg md:text-xl max-w-2xl mb-8"
          variants={textVariants}
          transition={{ delay: 0.5 }}
        >
          How global experiences shaped my leadership, adaptability, and vision.
        </motion.p>
        <motion.button
          className="bg-blue-600 text-white py-3 px-6 rounded-full font-semibold focus:outline-none"
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
