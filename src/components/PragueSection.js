// src/components/PragueSection.jsx
"use client";

import LocationSection from "./LocationSection";

const pragueData = {
  id: "prague",
  heroImage: "/images/charles-bridge-sunrise.jpg",
  heroTitle: "1st Stop: Prague, Czech Republic",
  heroSubtitle: "Blending History with Modern Innovation",
  funFacts: [
    "Prague blends historical charm with modern dynamism.",
    "Prague’s Astronomical Clock is one of the oldest working mechanical clocks in the world.",
    "The city’s architecture reflects Gothic, Baroque, and Art Nouveau styles.",
    "Prague has long been a center of art, philosophy, and revolution.",
    "Its location in Central Europe makes it a crossroads of cultures and ideas.",
  ],
  experiences: [
    {
      id: 1,
      title: "Exploring Prague Castle",
      description:
        "A symbol of history and power, reinforcing the importance of legacy.",
      image: "/images/prague-castle.jpg",
    },
    {
      id: 2,
      title: "Visiting Terezín Concentration Camp",
      description:
        "A sobering reminder of the impact of history and leadership decisions.",
      image: "/images/terezin-camp.jpg",
    },
    {
      id: 3,
      title: "NC State Building for Class",
      description:
        "Reflecting Prague’s interconnected past and diverse architectural tapestry.",
      image: "/images/nc-state-building.jpg",
    },
  ],
  insights: [
    {
      id: 1,
      title: "The Importance of Clear Objectives",
      content:
        "Setting clear goals—like a well-defined team charter—ensures alignment and direction.",
    },
    {
      id: 2,
      title: "Developing a Global Mindset",
      content:
        "Effective leadership requires an inclusive, culturally aware perspective.",
    },
    {
      id: 3,
      title: "Cultural Intelligence Enhances Collaboration",
      content:
        "Navigating cross-cultural environments demands mindfulness and adaptability.",
    },
    {
      id: 4,
      title: "Teams Evolve Over Time",
      content:
        "Just as history unfolds, teams move through forming, storming, norming, and performing.",
    },
    {
      id: 5,
      title: "Learning Cultures Drive Success",
      content:
        "Resilient societies and teams foster continuous learning for long-term adaptability.",
    },
  ],
};

export default function PragueSection() {
  return <LocationSection {...pragueData} />;
}
