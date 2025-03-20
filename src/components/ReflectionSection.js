"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ReflectionSection() {
  // State for expanded takeaway card
  const [expandedCard, setExpandedCard] = useState(null);

  // State for the before/after slider (0 to 100)
  const [sliderValue, setSliderValue] = useState(50);

  // Dummy data for key takeaways
  const keyTakeaways = [
    {
      id: 1,
      title: "Adaptability",
      summary:
        "How I learned to adjust leadership styles based on cultural contexts.",
      details:
        "Through my journey, I discovered that embracing change and adapting to diverse environments allowed me to lead more effectively and inspire innovation within my teams.",
    },
    {
      id: 2,
      title: "Cultural Intelligence",
      summary:
        "Building trust and communication in diverse teams.",
      details:
        "Understanding cultural nuances and communicating with empathy has been key to building strong, effective teams that thrive on diversity.",
    },
    {
      id: 3,
      title: "Leadership Awareness",
      summary:
        "Leadership isn’t about control—it’s about listening, inspiring, and empowering others.",
      details:
        "Shifting my focus from exerting authority to truly listening and empowering my colleagues transformed my approach and resulted in more collaborative outcomes.",
    },
  ];

  // Dummy radar chart data for Leadership Growth Metrics
  const radarData = {
    labels: ["Cultural Intelligence", "Adaptability", "Communication"],
    datasets: [
      {
        label: "Leadership Growth",
        data: [70, 80, 75], // Sample values; update with your metrics
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-100">
      {/* Section Header & Introduction */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Reflections on Global Leadership: Lessons, Growth, and Future Impact
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          My cultural immersion experiences reshaped my leadership mindset—
          shifting from a focus on authority to one on influence, adaptability,
          and deep human connection.
        </p>
      </motion.div>

      {/* Key Takeaways (Interactive Clickable Cards) */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {keyTakeaways.map((card) => (
            <motion.div
              key={card.id}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => setExpandedCard(card)}
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.summary}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Milestone Modal for Key Takeaways */}
      {expandedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg p-8 max-w-lg w-full relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setExpandedCard(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <h3 className="text-2xl font-bold mb-4">{expandedCard.title}</h3>
            <p className="mb-4 text-gray-700">{expandedCard.details}</p>
            {/* Additional media or data visualization can be added here */}
          </motion.div>
        </div>
      )}

      {/* Interactive Before & After Growth Comparison */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex">
            <div
              className="p-6"
              style={{ width: `${sliderValue}%`, backgroundColor: "#e0f7fa" }}
            >
              <h4 className="font-bold mb-2">Before</h4>
              <p className="text-sm text-gray-700">
                Leadership is about authority.
              </p>
            </div>
            <div
              className="p-6"
              style={{ width: `${100 - sliderValue}%`, backgroundColor: "#fce4ec" }}
            >
              <h4 className="font-bold mb-2">After</h4>
              <p className="text-sm text-gray-700">
                Leadership is about influence and adaptability.
              </p>
            </div>
          </div>
          {/* Slider Control */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="w-full mt-4"
          />
        </motion.div>
      </div>

      {/* Data Visualization: Leadership Growth Metrics */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Leadership Growth Metrics</h3>
          <div className="h-64">
            <Radar
              data={radarData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>
      </div>

      {/* Final Reflection & Call-to-Action */}
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-lg text-gray-700 mb-6">
          These leadership lessons have reshaped my career, instilling a deep sense
          of purpose and the drive to foster inclusive, dynamic teams.
        </p>
        <button
          onClick={() => {
            // Scroll to the interactive timeline or another section (assumes an element with id="timeline")
            const timelineSection = document.getElementById("timeline");
            timelineSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Explore My Full Journey
        </button>
      </motion.div>
    </section>
  );
}
