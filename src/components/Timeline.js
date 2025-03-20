"use client";

import { useState } from "react";
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
import milestones from "@/data/milestones.json"; // Ensure this file exists with your milestone data

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// MilestoneCard component – represents a clickable marker with a tooltip on hover.
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
      {/* Tooltip displayed on hover */}
      <motion.div
        className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {milestone.name}: {milestone.summary}
      </motion.div>
    </motion.div>
  );
};

export default function Timeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <div className="relative">
      {/* Timeline Container: horizontally scrollable and draggable */}
      <motion.div
        className="flex space-x-8 overflow-x-scroll p-4"
        drag="x"
        dragConstraints={{ left: -200, right: 0 }} // Adjust constraints as needed
      >
        {milestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onClick={() => setSelectedMilestone(milestone)}
          />
        ))}
      </motion.div>

      {/* Modal Overlay for Expanded Milestone Details */}
      {selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedMilestone.name} - {selectedMilestone.date}
            </h2>
            <p className="mb-4">{selectedMilestone.reflection}</p>

            {/* Optional: Media content (photos/videos) */}
            {selectedMilestone.media && (
              <div className="mb-4">
                <img
                  src={selectedMilestone.media}
                  alt={selectedMilestone.name}
                  className="w-full h-auto rounded"
                />
              </div>
            )}

            {/* Leadership Skill Progress Visualization */}
            {selectedMilestone.skillData && (
              <div className="mb-4 h-64">
                <Radar
                  data={{
                    labels: selectedMilestone.skillData.labels,
                    datasets: [
                      {
                        label: "Leadership Skill Progress",
                        data: selectedMilestone.skillData.data,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            )}

            <p className="mb-2">
              <strong>Key Takeaway:</strong> {selectedMilestone.takeaway}
            </p>
          </motion.div>
        </div>
      )}

      {/* Progress Indicators: a row of dots showing milestone positions */}
      <div className="flex justify-center space-x-2 mt-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`w-3 h-3 rounded-full ${
              selectedMilestone && selectedMilestone.id === milestone.id
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
