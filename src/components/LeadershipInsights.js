"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Bar } from "react-chartjs-2";
import Modal from "react-modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FourFramesSection from "@/components/FourFramesSection";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Register Chart.js components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

// Set react-modal app element
Modal.setAppElement("body");

// Sample inline data (replace with your actual data or import from JSON)
const countryInsights = [
  {
    id: "us",
    name: "United States",
    insight: "Fast decision-making, individualistic, risk-taking",
    details:
      "In the U.S., leadership values speed and decisiveness with a strong emphasis on individual initiative and risk-taking.",
    // Leaflet uses [lat, lng]
    coordinates: [40, -100],
  },
  {
    id: "fr",
    name: "France",
    insight: "Structured hierarchy, authoritative decision-making",
    details:
      "French leadership follows formal hierarchies and centralized decision-making, emphasizing control and structure.",
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

const barData = {
  labels: [
    "Cultural Intelligence",
    "Decision-Making Adaptability",
    "Communication Skills",
  ],
  datasets: [
    {
      label: "Before",
      data: [50, 55, 60],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
    {
      label: "After",
      data: [85, 90, 80],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Leadership Growth Metrics",
    },
  },
};

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
    insight: "People-focused leadership that nurtures talent and inspires trust.",
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

// Simple MilestoneCard for timeline (if needed)
const MilestoneCard = ({ milestone, onClick }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white">
        {milestone.shortName || milestone.name.charAt(0)}
      </div>
      <motion.div
        className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {milestone.name}: {milestone.insight}
      </motion.div>
    </motion.div>
  );
};

export default function LeadershipInsights() {
  // Map location side panel state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // State for split-screen hover effect
  const [isHoveringSplit, setIsHoveringSplit] = useState(false);
  
  return (
    <section className="py-16 bg-gray-50 relative">
      {/* 1️⃣ Section Header & Introduction */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Global Leadership Insights: Lessons in Adaptability & Influence
        </h2>
        <p className="text-lg text-gray-700">
          My experiences across different cultures have reshaped my leadership
          approach, emphasizing adaptability, collaboration, and influence.
          Explore the key insights that have defined my journey.
        </p>
      </motion.div>

      {/* 2️⃣ Map Section with Sticky Details Panel */}
      <div className="max-w-6xl mx-auto px-4 mb-16 flex flex-col md:flex-row">
        <div className="flex-1">
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
          </MapContainer>
        </div>
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              className="w-full md:w-1/3 bg-white shadow-lg p-4 md:ml-4 mt-4 md:mt-0"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedCountry(null)}
              >
                X
              </button>
              <h3 className="text-xl font-bold mb-2">
                {selectedCountry.name} Leadership
              </h3>
              <p className="mb-4">{selectedCountry.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3️⃣ Before vs. After Split-Screen Effect */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Before vs. After: Leadership Evolution
        </h3>
        <div
          className="relative border rounded overflow-hidden"
          onMouseEnter={() => setIsHoveringSplit(true)}
          onMouseLeave={() => setIsHoveringSplit(false)}
        >
          <div className="flex">
            <motion.div
              className="flex-1"
              animate={{ width: isHoveringSplit ? "30%" : "50%" }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                <h4 className="font-bold mb-2">Before</h4>
                <p className="text-sm text-gray-700">
                  Leadership was about authority and rigid structures.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              animate={{ width: isHoveringSplit ? "70%" : "50%" }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                <h4 className="font-bold mb-2">After</h4>
                <p className="text-sm text-gray-700">
                  Leadership evolved into influence, adaptability, and collaboration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4️⃣ Leadership Growth Metrics - Radial Progress Indicators */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Leadership Growth Metrics
        </h3>
        <div className="flex justify-around">
          <CircularProgressBar
            before={50}
            after={85}
            label="Cultural Intelligence"
          />
          <CircularProgressBar
            before={55}
            after={90}
            label="Decision-Making Adaptability"
          />
          <CircularProgressBar
            before={60}
            after={80}
            label="Communication Skills"
          />
        </div>
      </div>

      {/* 5️⃣ Four Frames Leadership Reflection - Accordion */}
      <FourFramesSection frames={leadershipFrames} />

      {/* 6️⃣ Call-to-Action */}
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-lg text-gray-700 mb-6">
          Adaptive leadership is key to thriving in our global landscape.
          Embrace change, learn from diverse perspectives, and lead with purpose.
        </p>
        <button
          onClick={() => {
            const mapSection = document.getElementById("journey");
            mapSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Jump to Interactive Map
        </button>
      </motion.div>
    </section>
  );
}

// New Component: CircularProgressBar
const CircularProgressBar = ({ before, after, label }) => {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const beforeOffset = circumference - (before / 100) * circumference;
  const afterOffset = circumference - (after / 100) * circumference;
  const improvement = Math.round(((after - before) / before) * 100);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e0e0e0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="#4caf50"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: beforeOffset }}
          animate={{ strokeDashoffset: afterOffset }}
          transition={{ duration: 1.2 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-base font-bold fill-current text-gray-800"
        >
          {after}%
        </text>
      </svg>
      <div className="mt-2 text-center">
        <div className="font-semibold">{label}</div>
        <motion.div
          className="text-sm text-green-600"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          +{improvement}%
        </motion.div>
      </div>
    </motion.div>
  );
};
