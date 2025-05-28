// components/GDMISection.js
"use client";

import React from "react";
import { motion } from "framer-motion";

const gdmiMetrics = [
  { id: "psych-self",        category: "Psychological Capital", label: "Self Assurance",       before: 3.4, after: 3.4 },
  { id: "psych-quest",       category: "Psychological Capital", label: "Quest for Adventure",   before: 3.2, after: 4.8 },
  { id: "psych-passion",     category: "Psychological Capital", label: "Passion for Diversity", before: 2.63, after: 5.0 },
  { id: "intel-cognitive",   category: "Intellectual Capital",   label: "Cognitive Complexity",  before: 3.0, after: 3.6 },
  { id: "intel-cosmopolitan",category: "Intellectual Capital",   label: "Cosmopolitan Outlook",  before: 1.14, after: 2.8 },
  { id: "intel-business",    category: "Intellectual Capital",   label: "Global Business Savvy", before: 1.0, after: 1.4 },
  { id: "social-diplomacy",  category: "Social Capital",          label: "Diplomacy",             before: 2.6, after: 2.8 },
  { id: "social-empathy",    category: "Social Capital",          label: "Intercultural Empathy", before: 1.67, after: 4.0 },
  { id: "social-impact",     category: "Social Capital",          label: "Interpersonal Impact",  before: 1.33, after: 1.7 },
];

export default function GDMISection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-screen-lg mx-auto bg-gray-100 rounded-2xl shadow-lg p-12">
        {/* Heading with accent underline */}
        <h2 className="relative inline-block text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-gray-900 mb-8">
          GDMI Leadership Metrics
          <span className="absolute -bottom-1 left-0 h-1 w-16 bg-blue-500 rounded-full" />
        </h2>

        {/* 2-column grid on md+, single-column on mobile */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          {gdmiMetrics.map(({ id, category, label, before, after }) => {
            const beforePct = (before / 5) * 100;
            const delta = after - before;
            const deltaPct = (delta / 5) * 100;
            const improvement = Math.round((delta / before) * 100);

            return (
              <div key={id} className="space-y-4">
                {/* label and before→after */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                  <div>{category}: {label}</div>
                  <div>{before.toFixed(2)} → {after.toFixed(2)}</div>
                </div>

                {/* bar */}
                <div className="relative h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-400 flex items-center justify-center text-xs text-white"
                    style={{ width: `${beforePct}%` }}
                  >
                    {before.toFixed(2)}
                  </div>
                  <motion.div
                    className="absolute h-full bg-green-400 flex items-center justify-center text-xs text-white"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${deltaPct}%` }}
                    transition={{ duration: 1 }}
                    style={{ left: `${beforePct}%` }}
                  >
                    {after.toFixed(2)}
                  </motion.div>
                </div>

                {/* improvement */}
                <div className="text-sm text-green-600">
                  +{improvement}% improvement
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
