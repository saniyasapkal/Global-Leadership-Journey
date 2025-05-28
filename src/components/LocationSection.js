// src/components/LocationSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const hoverCard = { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" };

export default function LocationSection({
  id,
  heroImage,
  heroTitle,
  heroSubtitle,
  funFacts = [],
  experiences = [],
  insights = [],
}) {
  return (
    <section id={id} className="w-full bg-white">
      {/* — Hero Banner — */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.02 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-white font-bold drop-shadow-2xl"
            style={{ fontSize: "clamp(2.2rem,6vw,3.5rem)" }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            className="mt-3 text-white max-w-xl mx-auto drop-shadow-lg"
            style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)" }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </div>

      {/* — Location Insights — */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <motion.h2
            className="inline-block text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 border-b-4 border-orange-500 pb-2"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            📍 Location Insights
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md min-h-[110px] flex items-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                whileHover={hoverCard}
              >
                <p className="text-gray-800 text-base leading-relaxed">
                  {fact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* — Experiences — */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <motion.h2
            className="inline-block text-2xl sm:text-3xl font-semibold text-gray-900 mb-12 border-b-4 border-orange-500 pb-2"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            📍 My Experiences
          </motion.h2>

          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: idx * 0.18 }}
                whileHover={hoverCard}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-gray-700 text-base">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* — Leadership Insights — */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <motion.h2
            className="inline-block text-2xl sm:text-3xl font-semibold text-gray-900 mb-10 border-b-4 border-orange-500 pb-2"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            💡 Leadership Insights
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((ins, i) => (
              <motion.div
                key={ins.id}
                className="bg-white p-6 rounded-xl shadow-md h-full"
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: i * 0.14 }}
                whileHover={hoverCard}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {ins.title}
                </h4>
                <p className="text-gray-700 text-base">{ins.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
