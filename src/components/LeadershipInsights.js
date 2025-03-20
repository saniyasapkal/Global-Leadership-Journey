"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Modal from "react-modal";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon paths for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend);

// Set the app element for react-modal (using body for Next.js App Router)
Modal.setAppElement("body");

export default function LeadershipInsights() {
  // State for interactive modals and slider
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);

  // Sample data for interactive map (three countries)
  // Note: Leaflet expects [latitude, longitude]
  const countryInsights = [
    {
      id: "us",
      name: "United States",
      insight: "Fast decision-making, individualistic, risk-taking",
      details:
        "In the U.S., leadership values speed and decisiveness with a strong emphasis on individual initiative and risk-taking.",
      coordinates: [40, -100],
    },
    {
      id: "fr",
      name: "France",
      insight: "Structured hierarchy, authoritative decision-making",
      details:
        "French leadership often follows formal hierarchies and centralized decision-making, emphasizing control and structure.",
      coordinates: [46, 2],
    },
    {
      id: "jp",
      name: "Japan",
      insight: "Consensus-driven, indirect communication",
      details:
        "Japanese leadership is marked by group consensus and subtle, indirect communication with a strong focus on harmony.",
      coordinates: [36, 138],
    },
  ];

  // Data for leadership growth radar chart
  const radarData = {
    labels: [
      "Cultural Intelligence",
      "Decision-Making Adaptability",
      "Communication Skills",
    ],
    datasets: [
      {
        label: "Leadership Growth",
        data: [75, 80, 70],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  // Sample data for Four Frames Leadership Reflection
  const leadershipFrames = [
    {
      id: "structural",
      title: "Structural",
      score: 15,
      insight:
        "Logical problem-solving and systems thinking drive efficient processes.",
      example:
        "I applied structured analysis to optimize cross-cultural team operations.",
    },
    {
      id: "human",
      title: "Human Resources",
      score: 16,
      insight:
        "People-focused leadership that nurtures talent and inspires trust.",
      example:
        "Empathy and active listening transformed team dynamics and outcomes.",
    },
    {
      id: "political",
      title: "Political",
      score: 12,
      insight:
        "Understanding power dynamics and negotiation skills to influence decisions.",
      example:
        "Navigating complex cultural power structures taught me the art of negotiation.",
    },
    {
      id: "symbolic",
      title: "Symbolic",
      score: 17,
      insight:
        "Vision-driven leadership that inspires and communicates a compelling narrative.",
      example:
        "My vision helped unify diverse teams around shared values and goals.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      {/* 1️⃣ Section Header & Introduction */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Global Leadership Insights: Lessons in Adaptability & Influence
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          My experiences across different cultures have reshaped my leadership
          approach, emphasizing adaptability, cross-cultural collaboration, and
          influence over authority. Explore the key insights that have defined my
          journey.
        </p>
      </motion.div>

      {/* 2️⃣ Interactive Leadership Comparison: Cultural Leadership Styles */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Cultural Leadership Styles
        </h3>
        <div className="relative">
          <MapContainer
            center={[20, 0]}
            zoom={1.5}
            style={{ width: "100%", height: "500px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {countryInsights.map((country) => (
              <Marker
                key={country.id}
                position={country.coordinates}
                eventHandlers={{
                  click: () => setSelectedCountry(country),
                }}
              />
            ))}
            {/* Optionally, you can add a Popup here when hovering over a marker */}
          </MapContainer>
        </div>
      </div>

      {/* Map Modal for Country Details */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <h3 className="text-xl font-bold mb-2">
              {selectedCountry.name} Leadership
            </h3>
            <p className="mb-4">{selectedCountry.details}</p>
          </motion.div>
        </div>
      )}

      {/* 3️⃣ Preconceived Notions vs. Reality (Interactive Slider) */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Before vs. After: Leadership Reality
        </h3>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex">
            <div
              style={{ width: `${sliderValue}%` }}
              className="p-6 bg-blue-100"
            >
              <h4 className="font-bold mb-2">Before</h4>
              <p className="text-sm text-gray-700">
                Leadership is about authority.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                I once believed in a top-down approach.
              </p>
            </div>
            <div
              style={{ width: `${100 - sliderValue}%` }}
              className="p-6 bg-pink-100"
            >
              <h4 className="font-bold mb-2">After</h4>
              <p className="text-sm text-gray-700">
                Leadership is about influence and adaptability.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Real-world experiences taught me the value of flexible leadership.
              </p>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full mt-4"
          />
        </motion.div>
      </div>

      {/* 4️⃣ Leadership Growth Visualization (Radar Chart) */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Leadership Growth Metrics
        </h3>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="h-64">
            <Radar
              data={radarData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>
      </div>

      {/* 5️⃣ Four Frames Leadership Reflection (Interactive Dashboard) */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Four Frames Leadership Reflection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {leadershipFrames.map((frame) => (
            <motion.div
              key={frame.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition"
              onClick={() => setSelectedFrame(frame)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-bold mb-2">
                {frame.title} (Score: {frame.score})
              </h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Frame Modal for Leadership Reflection */}
      {selectedFrame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedFrame(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <h3 className="text-xl font-bold mb-2">
              {selectedFrame.title} Reflection
            </h3>
            <p className="mb-2">{selectedFrame.insight}</p>
            <p className="mb-4 text-sm text-gray-700">
              {selectedFrame.example}
            </p>
          </motion.div>
        </div>
      )}

      {/* 6️⃣ Call-to-Action & Engagement */}
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-lg text-gray-700 mb-6">
          Adaptive leadership is key to thriving in our global landscape. Embrace
          change, learn from diverse perspectives, and lead with purpose.
        </p>
        <button
          onClick={() => {
            const timelineSection = document.getElementById("timeline");
            timelineSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Explore My Leadership Journey
        </button>
      </motion.div>
    </section>
  );
}
