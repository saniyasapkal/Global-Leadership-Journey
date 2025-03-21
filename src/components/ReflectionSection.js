"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ============================
   Data Definitions
   ============================ */

// Dummy data for key takeaways
const keyTakeaways = [
  {
    id: 1,
    title: "Adaptability",
    summary: "I learned to adjust leadership styles based on cultural contexts.",
    details:
      "Through my journey, I discovered that embracing change and adapting to diverse environments allowed me to lead more effectively and inspire innovation within my teams.",
  },
  {
    id: 2,
    title: "Cultural Intelligence",
    summary: "Building trust and communication in diverse teams.",
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

// GDMI Scores (scores on a 1–5 scale)
const gdmiMetrics = [
  {
    id: "psych-self",
    category: "Psychological Capital",
    label: "Self Assurance",
    before: 3.4,
    after: 3.4,
  },
  {
    id: "psych-quest",
    category: "Psychological Capital",
    label: "Quest for Adventure",
    before: 3.2,
    after: 4.8,
  },
  {
    id: "psych-passion",
    category: "Psychological Capital",
    label: "Passion for Diversity",
    before: 2.63,
    after: 5.0,
  },
  {
    id: "intel-cognitive",
    category: "Intellectual Capital",
    label: "Cognitive Complexity",
    before: 3.0,
    after: 3.6,
  },
  {
    id: "intel-cosmopolitan",
    category: "Intellectual Capital",
    label: "Cosmopolitan Outlook",
    before: 1.14,
    after: 2.8,
  },
  {
    id: "intel-business",
    category: "Intellectual Capital",
    label: "Global Business Savvy",
    before: 1.0,
    after: 1.4,
  },
  {
    id: "social-diplomacy",
    category: "Social Capital",
    label: "Diplomacy",
    before: 2.6,
    after: 2.8,
  },
  {
    id: "social-empathy",
    category: "Social Capital",
    label: "Intercultural Empathy",
    before: 1.67,
    after: 4.0,
  },
  {
    id: "social-interpersonal",
    category: "Social Capital",
    label: "Interpersonal Impact",
    before: 1.33,
    after: 1.7,
  },
];

// Dummy toggle insights text for overall leadership insights
const toggleInsightsText = {
  before:
    "Before: Leadership was predominantly viewed as a top-down approach where authority was paramount.",
  after:
    "After: Leadership evolved into a collaborative, inclusive process that empowers team members and drives innovation.",
};

// Dummy data for flip cards (quick comparison)
const flipCardsData = [
  {
    id: 1,
    title: "Leadership Perspective",
    beforeText: "Before: Authority and control defined leadership.",
    afterText: "After: Influence, empathy, and collaboration drive leadership.",
  },
  {
    id: 2,
    title: "Decision Making",
    beforeText: "Before: Rigid, top-down decision-making.",
    afterText: "After: Agile, inclusive, data-driven decisions.",
  },
  {
    id: 3,
    title: "Team Collaboration",
    beforeText: "Before: Teams were siloed and hierarchical.",
    afterText: "After: Teams are cross-functional, innovative, and empowered.",
  },
];

/* ============================
   Subcomponents
   ============================ */

/* InlineExpandingTakeawayCard:
   Renders a key takeaway card that expands inline to show details when clicked.
*/
const InlineExpandingTakeawayCard = ({ takeaway, expanded, onToggle }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(takeaway.id);
      }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <h3 className="text-xl font-semibold">{takeaway.title}</h3>
      <p className="text-gray-600">{takeaway.summary}</p>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="mt-4 text-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {takeaway.details}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InlineExpandingTakeaways = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Collapse expanded card on ESC key
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setExpandedId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Key Takeaways</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {keyTakeaways.map((takeaway) => (
          <InlineExpandingTakeawayCard
            key={takeaway.id}
            takeaway={takeaway}
            expanded={expandedId === takeaway.id}
            onToggle={toggleCard}
          />
        ))}
      </div>
    </div>
  );
};

/* SplitStackedBarChart:
   Renders a split stacked bar chart for GDMI scores.
   Each metric is displayed as a single bar with a fixed "Before" section (light blue)
   and an extending "After" section (green) based on scores from a 1–5 scale.
*/
const SplitStackedBarChart = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        GDMI Leadership Metrics
      </h2>
      <div className="space-y-6">
        {gdmiMetrics.map((metric) => {
          const beforePercent = (metric.before / 5) * 100;
          const afterExtensionPercent =
            ((metric.after - metric.before) / 5) * 100;
          const improvement = Math.round(
            ((metric.after - metric.before) / metric.before) * 100
          );
          return (
            <div key={metric.id} className="flex flex-col">
              <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                <span>
                  {metric.category}: {metric.label}
                </span>
                <span>
                  Before: {metric.before.toFixed(2)} | After:{" "}
                  {metric.after.toFixed(2)}
                </span>
              </div>
              <div className="relative h-6 w-full bg-gray-200 rounded">
                {/* Before Section */}
                <div
                  className="absolute h-6 bg-blue-300 rounded-l flex items-center justify-center text-xs text-blue-800"
                  style={{ width: `${beforePercent}%` }}
                >
                  {metric.before.toFixed(2)}
                </div>
                {/* After Extension (animated) */}
                <motion.div
                  className="absolute h-6 bg-green-400 rounded-r flex items-center justify-center text-xs text-green-800"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${afterExtensionPercent}%` }}
                  transition={{ duration: 1.2 }}
                  style={{ left: `${beforePercent}%` }}
                >
                  {metric.after.toFixed(2)}
                </motion.div>
              </div>
              <AnimatePresence>
                <motion.div
                  className="mt-1 text-xs text-green-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  +{improvement}% improvement.
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ToggleInsights:
   Renders a toggle button to switch between Before and After overall leadership insights.
*/
const ToggleInsights = () => {
  const [showAfter, setShowAfter] = useState(false);
  const handleToggle = () => setShowAfter(!showAfter);
  return (
    <div className="max-w-4xl mx-auto px-4 mb-16 text-center">
      <button
        onClick={handleToggle}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition mb-4"
      >
        {showAfter ? "Show Before Insights" : "Show After Insights"}
      </button>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={showAfter ? "after" : "before"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-gray-800"
        >
          {showAfter ? toggleInsightsText.after : toggleInsightsText.before}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* FlipCard:
   Renders a flip card for quick Before vs. After comparison.
*/
const FlipCard = ({ id, title, beforeText, afterText, isFlipped, onToggle }) => {
  return (
    <motion.div
      className="relative w-full h-64 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      whileHover={{ scale: 1.03 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-lg shadow-lg"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side (Before) */}
        <div
          className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 text-center">{beforeText}</p>
        </div>
        {/* Back Side (After) */}
        <div
          className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 text-center">{afterText}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FlipCardsComparison = () => {
  const [flippedCards, setFlippedCards] = useState([]);

  const toggleCard = (id) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Quick Comparison: Before vs. After
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flipCardsData.map((card) => (
          <FlipCard
            key={card.id}
            id={card.id}
            title={card.title}
            beforeText={card.beforeText}
            afterText={card.afterText}
            isFlipped={flippedCards.includes(card.id)}
            onToggle={toggleCard}
          />
        ))}
      </div>
    </div>
  );
};

/* ============================
   Main ReflectionSection Component
   ============================ */

export default function ReflectionSection() {
  return (
    <section className="py-16 bg-gray-100">
      {/* Section Header & Introduction */}
      <motion.div
        className="max-w-4xl mx-auto text-center px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Reflections on Global Leadership: Lessons, Growth, and Future Impact
        </h2>
        <p className="text-lg text-gray-700">
          My cultural immersion experiences reshaped my leadership mindset—shifting
          from a focus on authority to one on influence, adaptability, and deep human connection.
        </p>
      </motion.div>

      {/* 1️⃣ Key Takeaways with Inline Expansion */}
      {/* <InlineExpandingTakeaways /> */}

      {/* 2️⃣ GDMI Split Stacked Bar Chart for Leadership Growth Metrics */}
      <SplitStackedBarChart />

      {/* 3️⃣ Toggle-Based Before vs. After Leadership Insights */}
      {/* <ToggleInsights /> */}

      {/* 4️⃣ Quick Comparison: Flip Cards */}
      {/* <FlipCardsComparison /> */}
    </section>
  );
}