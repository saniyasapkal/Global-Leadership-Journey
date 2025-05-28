// src/components/AustriaSection.jsx
"use client";

import LocationSection from "./LocationSection";

const austriaData = {
  id: "austria",
  heroImage: "/images/innsbruck-hero.jpg",
  heroTitle: "2nd Stop: Innsbruck, Austria",
  heroSubtitle: "Precision, Nature, and Cultural Harmony",
  funFacts: [
    "Nestled in the Austrian Alps, Innsbruck blends nature and precision.",
    "Host of two Winter Olympics, it's a hub for outdoor adventure.",
    "Home of Swarovski Crystal innovation through artistry.",
  ],
  experiences: [
    {
      id: 1,
      title: "Swarovski Crystal World Tour",
      description:
        "A kaleidoscopic journey through art and innovation—crystal-studded chambers, dreamlike installations, and mirrored illusions blending fantasy with futuristic design.",
      image: "/images/swarovski-world-tour.jpg",
    },
    {
      id: 2,
      title: "Hiking Nordkette",
      description:
        "A steep climb through silence and snow, leading to panoramic views of Innsbruck and the Alps—grounding yet awe-inspiring.",
      image: "/images/hiking-nordkette.jpg",
    },
    {
      id: 3,
      title: "Skiing in the Alps",
      description:
        "Carving down powdery slopes with wind in my face and alpine peaks all around—an adrenaline-fueled escape into crisp air and serenity.",
      image: "/images/skiing-austrian-alps.jpg",
    },
    {
      id: 4,
      title: "Austrian Dessert Tour",
      description:
        "From decadent sachertorte to cinnamon-laced apfelstrudel—each bite in cozy cafés felt like a ritual in tradition and warmth.",
      image: "/images/austrian-desserts.jpg",
    },
  ],
  insights: [
    {
      id: 1,
      title: "Reputation Builds Team Trust",
      content:
        "People collaborate best when they trust their leader—fairness, consistency, and follow-through creates psychological safety.",
    },
    {
      id: 2,
      title: "Structure Enables Adaptability",
      content:
        "Clear frameworks allow teams to pivot confidently—structure doesn’t stifle, it supports flexible innovation.",
    },
    {
      id: 3,
      title: "Clear Feedback Drives Performance",
      content:
        "Specific, depersonalized feedback accelerates growth—precision in communication leads to stronger outcomes.",
    },
    {
      id: 4,
      title: "Work–Life Balance Fuels Creativity",
      content:
        "Intentional rest and recovery isn’t optional—it sustains long-term performance and inspires fresh thinking.",
    },
    {
      id: 5,
      title: "Cultural Context Shapes Perception",
      content:
        "What’s “efficient” in one country may feel “cold” in another—cultural nuance avoids misunderstandings and deepens collaboration.",
    },
  ],
};

export default function AustriaSection() {
  return <LocationSection {...austriaData} />;
}
