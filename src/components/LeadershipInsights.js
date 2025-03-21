"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

// --------------------
// DATA & CONFIGURATION
// --------------------

// Country insights data
const countryInsights = [
  {
    id: "us",
    name: "United States",
    overview: "Individualist & Achievement-Based",
    position: "Bottom Corner – High Individualism, Low Hierarchy",
    leadershipStyle:
      "Competitive, fast-paced, and results-driven. U.S. leaders encourage individual initiative and autonomy while rewarding performance.",
    decisionMaking:
      "Fast, decisive, and leader-driven; prioritizes efficiency over consensus.",
    communication:
      "Low-context, highly direct, and goal-focused. Employees are expected to speak up and challenge leadership.",
    risk: "Very high; promotes innovation, experimentation, and learning from failure.",
    takeaway: "Speed, adaptability, and confidence drive U.S. leadership.",
    coordinates: [40, -100],
  },
  {
    id: "de",
    name: "Germany",
    overview: "Egalitarian & Task-Oriented",
    position: "Midway between Hierarchy and Consensus",
    leadershipStyle:
      "Structured, methodical, and logic-driven. German leaders value precision, expertise, and direct communication.",
    decisionMaking:
      "Well-researched and analytical, but encourages constructive debate.",
    communication:
      "Very direct and to the point. Feedback is given honestly and without sugarcoating.",
    risk: "Moderate; focuses on long-term strategic planning over short-term gains.",
    takeaway: "Precision and expertise define leadership in Germany.",
    coordinates: [51, 10],
  },
  {
    id: "uk",
    name: "United Kingdom",
    overview: "Balanced Between Hierarchical & Individualist",
    position: "Between Hierarchy & Individualism",
    leadershipStyle:
      "Mix of formal structure and entrepreneurial flexibility. Leaders expect initiative but also value tradition.",
    decisionMaking:
      "Pragmatic—leaders weigh risks but still value efficiency.",
    communication:
      "Moderate directness. British leaders use diplomacy and humor to soften feedback.",
    risk: "Moderate; leaders encourage innovation but avoid reckless risks.",
    takeaway:
      "Strategic adaptability makes UK leadership effective in global business.",
    coordinates: [55, -3],
  },
  {
    id: "fr",
    name: "France",
    overview: "Hierarchical but Intellectual",
    position: "Leans toward Hierarchy, but values intellectual debate",
    leadershipStyle:
      "Strong central authority, but leaders encourage discussion. Hierarchical, yet driven by analytical thinking and debate.",
    decisionMaking:
      "Top-down but discussion-heavy. French leadership embraces complexity and strategic thinking.",
    communication:
      "Persuasive and articulate. Leaders engage in intellectual debate before making decisions.",
    risk: "Moderate; risk is calculated but not avoided if innovation is the goal.",
    takeaway:
      "Analytical, persuasive, and centralized decision-making.",
    coordinates: [46, 2],
  },
  {
    id: "cn",
    name: "China",
    overview: "Hierarchical & Relationship-Oriented",
    position: "Strongly Hierarchical & Relationship-Driven",
    leadershipStyle:
      "Top-down authority with a strong emphasis on relationships (Guanxi).",
    decisionMaking:
      "Slow and deliberate; based on long-term strategy rather than short-term results.",
    communication:
      "High-context and indirect. Avoids direct confrontation and uses subtle cues.",
    risk: "Low; prefers stability and long-term gains over short-term disruption.",
    takeaway:
      "Patience, hierarchy, and strategic vision define Chinese leadership.",
    coordinates: [35, 105],
  },
  {
    id: "in",
    name: "India",
    overview: "Hierarchical but Flexible",
    position: "Hierarchical but adaptable",
    leadershipStyle:
      "Respect for seniority is critical, but leadership is flexible and relationship-based.",
    decisionMaking:
      "Senior leaders have the final say, but discussions are common.",
    communication:
      "High-context, indirect, and relationship-focused. Nonverbal cues are important.",
    risk: "Moderate to high; leaders are entrepreneurial but rely on networks and relationships.",
    takeaway:
      "Relationships and flexibility drive leadership success in India.",
    coordinates: [21, 78],
  },
  {
    id: "jp",
    name: "Japan",
    overview: "Consensus & Harmony-Oriented",
    position: "Consensus-Oriented & Hierarchical",
    leadershipStyle:
      "Leaders act as facilitators; group harmony is prioritized over individual command.",
    decisionMaking:
      "Consensus-driven (using systems like the Ringi system); decisions take time but are well-executed.",
    communication:
      "High-context, indirect, and implicit; subtle cues are key.",
    risk: "Low; stability and careful planning are emphasized.",
    takeaway:
      "Patience, harmony, and structured consensus define Japanese leadership.",
    coordinates: [36, 138],
  },
  {
    id: "br",
    name: "Brazil",
    overview: "Relationship & Adaptability-Focused",
    position: "Balanced between Hierarchical & Flexible Leadership",
    leadershipStyle:
      "Charismatic and personal. Leadership is people-driven, focusing on relationships and flexibility.",
    decisionMaking:
      "Flexible and relational; trust matters more than process.",
    communication:
      "Expressive and indirect. Nonverbal communication is key.",
    risk: "High; Brazil embraces creative problem-solving and adaptability.",
    takeaway:
      "Relationships and personal trust drive leadership success.",
    coordinates: [-10, -55],
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    overview: "Visionary & Hierarchical",
    position: "Highly Hierarchical & Visionary",
    leadershipStyle:
      "Strong authority with a focus on rapid execution and innovation.",
    decisionMaking:
      "Top-down, but highly strategic. Visionary leaders take decisive action.",
    communication:
      "High-context and formal. Diplomacy is essential.",
    risk: "High in business, low in traditional sectors. UAE leaders embrace innovation but respect tradition.",
    takeaway:
      "Strong leadership, rapid innovation, and structured hierarchy.",
    coordinates: [24, 54],
  },
];

// Bar chart configuration
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

// Four Frames Leadership Reflection Data
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

// --------------------
// TIMELINE DATA & COMPONENTS
// --------------------

// Timeline milestones data
const timelineData = [
  {
    expectation: "A Leader Must Always Have the Answers.",
    before: "I believed a strong leader had to know everything and always have the right solution.",
    after: "I learned that great leadership is about asking the right questions and leveraging diverse expertise.",
    keyTakeaway:
      "Leadership isn’t about having all the answers—it’s about creating an environment where the best answers emerge through collaboration.",
  },
  {
    expectation: "The Best Leaders Make Decisions Quickly and Assertively.",
    before: "I thought hesitation was a sign of weakness, and decisiveness defined strong leadership.",
    after: "I realized that effective leadership means knowing when to act fast and when to take time for thoughtful deliberation.",
    keyTakeaway:
      "Speed alone doesn’t define leadership—some cultures value consensus over rapid execution, leading to stronger, more sustainable decisions.",
  },
  {
    expectation: "Leadership is About Authority and Directing Others.",
    before: "I saw leadership as taking charge, giving instructions, and ensuring efficiency through control.",
    after: "I discovered that real leadership is about influence, empowerment, and fostering ownership within a team.",
    keyTakeaway:
      "The best leaders don’t just manage—they inspire. True leadership is about enabling others to contribute meaningfully and take initiative.",
  },
  {
    expectation: "Strong Leaders Separate Emotion from Decision-Making.",
    before: "I assumed that emotional detachment made for better leadership, ensuring logical and rational decisions.",
    after: "I realized that emotional intelligence is just as critical as strategic thinking in building trust and engagement.",
    keyTakeaway:
      "Leaders who acknowledge emotions—both their own and others'—make better decisions, strengthen relationships, and create more cohesive teams.",
  },
  {
    expectation: "Good Leadership Looks the Same Everywhere.",
    before: "I believed strong leadership followed universal principles that worked in any environment.",
    after: "I learned that leadership is shaped by culture—what works in one place may not resonate elsewhere.",
    keyTakeaway:
      "Adaptability is key. Great leaders understand cultural nuances and adjust their approach instead of imposing a single model.",
  },
];

// MilestoneItem component
const MilestoneItem = ({ milestone, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="mb-8 relative pl-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Circular indicator & animated arrow */}
      <div className="absolute left-0 top-0 flex items-center">
        <div className="w-4 h-4 bg-white border-2 border-indigo-600 rounded-full animate-pulse" />
        <motion.div
          className="ml-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Simple arrow SVG */}
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>
      {/* Milestone content with gradient transition from Before to After */}
      <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 p-2 hover:scale-105 transition-transform">
            <h4 className="font-bold text-gray-700">Before</h4>
            <p className="text-sm text-gray-600">{milestone.before}</p>
          </div>
          <div className="md:w-1/2 p-2 hover:scale-105 transition-transform">
            <h4 className="font-bold text-blue-700">After</h4>
            <p className="text-sm text-blue-600">{milestone.after}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            Expectation: <span className="font-medium">{milestone.expectation}</span>
          </p>
        </div>
        <div className="mt-2">
          <button
            onClick={onToggle}
            className="text-sm text-indigo-600 hover:underline focus:outline-none"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 overflow-hidden"
              >
                <p className="text-sm text-gray-800">{milestone.keyTakeaway}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// VerticalTimeline component with a progress indicator
const VerticalTimeline = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Vertical progress bar */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gray-200">
        <motion.div
          className="h-full bg-indigo-600"
          style={{ height: progressHeight }}
        />
      </div>
      <div className="ml-8">
        {timelineData.map((milestone, index) => (
          <MilestoneItem
            key={index}
            milestone={milestone}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

// --------------------
// MAIN COMPONENT
// --------------------
export default function LeadershipInsights() {
  // Map location side panel state
  const [selectedCountry, setSelectedCountry] = useState(null);

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
              className="w-full md:w-1/3 bg-white shadow-lg p-4 md:ml-4 mt-4 md:mt-0 relative"
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
              <div className="space-y-2">
                <p>
                  <strong>Overview:</strong> {selectedCountry.overview}
                </p>
                <p>
                  <strong>Position on the Triangle:</strong>{" "}
                  {selectedCountry.position}
                </p>
                <p>
                  <strong>Leadership Style:</strong>{" "}
                  {selectedCountry.leadershipStyle}
                </p>
                <p>
                  <strong>Decision-Making:</strong> {selectedCountry.decisionMaking}
                </p>
                <p>
                  <strong>Communication Style:</strong>{" "}
                  {selectedCountry.communication}
                </p>
                <p>
                  <strong>Risk-Taking:</strong> {selectedCountry.risk}
                </p>
                <p>
                  <strong>Leadership Takeaway:</strong> {selectedCountry.takeaway}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3️⃣ Before vs. After: Leadership Evolution Timeline */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Before vs. After: Leadership Evolution
        </h3>
        <VerticalTimeline />
      </div>

      {/* 4️⃣ Leadership Growth Metrics - Radial Progress Indicators */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          {/* Leadership Growth Metrics */}
        </h3>
        {/* <div className="flex justify-around">
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
            label="Communication Skills" */}
          {/* /> */}
        {/* </div> */}
      </div>

      {/* 5️⃣ Four Frames Leadership Reflection - Accordion */}
      <FourFramesSection frames={leadershipFrames} />

      {/* 6️⃣ Call-to-Action */}
      {/* <motion.div
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
      </motion.div> */}
    </section>
  );
}

// --------------------
// CircularProgressBar Component
// --------------------
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
