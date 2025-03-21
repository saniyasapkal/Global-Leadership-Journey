"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Timeline data: list of cities and their descriptions
const timelineData = [
  {
    city: "Prague",
    description:
      "Strategic thinking, cultural intelligence, and structured collaboration.",
  },
  {
    city: "Innsbruck",
    description: "Balancing nature, precision, and structured living.",
  },
  {
    city: "Glasgow",
    description: "Bold, direct, and community-driven.",
  },
  {
    city: "Nice",
    description: "Luxury, sustainability, and global perspectives.",
  },
];

export default function TimelineSection() {
  // Track which city section is active (based on scroll)
  const [activeIndex, setActiveIndex] = useState(0);

  // Create an array of refs for each city section using React.createRef()
  const sectionRefs = useRef(timelineData.map(() => React.createRef()));

  // Setup IntersectionObservers for each section to update the active index
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Fade out timeline when the last section is reached
  const timelineOpacity = activeIndex === timelineData.length - 1 ? 0 : 1;

  return (
    <div>
      {/* Fixed Horizontal Timeline */}
      <motion.div
        className="fixed top-0 left-0 right-0 flex justify-around items-center p-4 bg-white shadow z-50"
        animate={{ opacity: timelineOpacity }}
        transition={{ duration: 0.5 }}
      >
        {timelineData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-6 h-6 rounded-full border-2 ${
                index === activeIndex
                  ? "bg-blue-600 border-blue-600"
                  : "bg-gray-300 border-gray-300"
              }`}
              animate={{ scale: index === activeIndex ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="mt-1 text-sm">{item.city}</span>
          </div>
        ))}
      </motion.div>

      {/* Spacing at the top so content doesn't hide behind the fixed timeline */}
      <div className="pt-20">
        {/* City Sections */}
        {timelineData.map((item, index) => (
          <section
            key={index}
            ref={sectionRefs.current[index]}
            className="min-h-screen flex items-center justify-center border-b"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl text-center px-4"
            >
              <h2 className="text-3xl font-bold mb-2">{item.city}</h2>
              <p className="text-lg text-gray-700">{item.description}</p>
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}
