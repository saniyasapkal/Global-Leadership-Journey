"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FourFramesSection expects an array of frames as a prop.
// Each frame object should have: id, title, score, insight, and example.
const FourFramesSection = ({ frames }) => {
  // State to track which frame is expanded (only one at a time)
  const [expandedFrameId, setExpandedFrameId] = useState(null);
  // State to track "Read More" toggle per frame (object keyed by frame id)
  const [readMoreState, setReadMoreState] = useState({});

  const handleFrameClick = (id) => {
    // Toggle expansion: collapse if clicking the already-expanded frame.
    setExpandedFrameId(expandedFrameId === id ? null : id);
  };

  const toggleReadMore = (id, e) => {
    // Prevent click propagation to avoid collapsing the frame when toggling "Read More"
    e.stopPropagation();
    setReadMoreState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Four Frames Leadership Reflection
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {frames.map((frame) => (
          <motion.div
            key={frame.id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleFrameClick(frame.id)}
            whileHover={{ scale: 1.03 }}
            layout
          >
            <div className="font-bold text-center">
              {frame.title} (Score: {frame.score})
            </div>
            {/* Preview tooltip on hover */}
            <motion.div
              className="mt-2 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {frame.insight}
            </motion.div>
            <AnimatePresence>
              {expandedFrameId === frame.id && (
                <motion.div
                  className="mt-4 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()} // prevent frame collapse when clicking inside
                >
                  <p className="text-sm text-gray-700">{frame.insight}</p>
                  <button
                    className="mt-2 text-blue-600 text-xs"
                    onClick={(e) => toggleReadMore(frame.id, e)}
                  >
                    {readMoreState[frame.id] ? "Read Less" : "Read More"}
                  </button>
                  <AnimatePresence>
                    {readMoreState[frame.id] && (
                      <motion.div
                        className="mt-2 text-xs text-gray-500"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{frame.example}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FourFramesSection;
