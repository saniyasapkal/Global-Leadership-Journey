"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const DATA = [
  {
    exp: "A Leader Must Always Have the Answers.",
    before: "...",
    after:  "...",
    takeaway: "...",
  },
  /* ... */
];

function Milestone({ item, isOpen, onToggle }) {
  return (
    <motion.div
      className="mb-8 relative pl-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute left-0 top-0 flex items-center">
        <div className="w-4 h-4 bg-white border-2 border-indigo-600 rounded-full animate-pulse" />
        <motion.div
          className="ml-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ➔
        </motion.div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h4 className="font-semibold mb-2">Before</h4>
            <p className="text-sm text-gray-700">{item.before}</p>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">After</h4>
            <p className="text-sm text-blue-600">{item.after}</p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="mt-4 text-indigo-600 hover:underline"
        >
          {isOpen ? "See Less" : "See More"}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.p
              className="mt-3 text-sm text-gray-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.takeaway}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TimelineSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Before vs. After</h2>
        <div className="relative" ref={ref}>
          <div className="absolute left-0 top-0 w-1 h-full bg-gray-200">
            <motion.div className="w-full bg-indigo-600" style={{ height }} />
          </div>
          <div className="ml-8">
            {DATA.map((d, i) => (
              <Milestone
                key={i}
                item={d}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
