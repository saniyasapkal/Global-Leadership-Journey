// src/components/GlasgowSection.jsx
"use client";

import LocationSection from "./LocationSection";

const glasgowData = {
  id: "glasgow",
  heroImage: "/images/glasgow-street.jpg",
  heroTitle: "Next Stop: Glasgow, Scotland",
  heroSubtitle: "A City of Boldness, Community, and Innovation",
  funFacts: [
    "Glasgow is Scotland’s largest city, known for its industrial heritage and creative spirit.",
    "The city has transformed into a hub for music, arts, and design with major cultural festivals.",
    "Once the ‘Second City of the British Empire’ thanks to its shipbuilding might.",
    "Key contributor to the Scottish Enlightenment in philosophy and science.",
    "Renowned for its humor and friendliness—community is at its heart.",
  ],
  experiences: [
    {
      id: 1,
      title: "The Culture of Football",
      description:
        "At a St. Mirren match I felt the raw energy of unified fans. Football here is identity, history, and belonging rolled into 90 minutes.",
      image: "/images/glasgow-football.jpg",
    },
    {
      id: 2,
      title: "Loch Lomond & Sustainability",
      description:
        "Balancing tourism with conservation on Loch Lomond taught me that true leadership protects resources **and** communities alike.",
      image: "/images/loch-lomond.jpg",
    },
    {
      id: 3,
      title: "Paisley’s Regeneration",
      description:
        "Paisley is reinventing itself via arts investment. The lesson: economic revival needs culture, inclusion, and long-term support.",
      image: "/images/paisley-town.jpg",
    },
    {
      id: 4,
      title: "Edinburgh’s Tourism Challenge",
      description:
        "Edinburgh wrestles with overtourism vs. authenticity. Real leadership crafts policies that preserve character **and** welcome visitors.",
      image: "/images/edinburgh.jpg",
    },
  ],
  insights: [
    {
      id: 1,
      title: "Community as a Leadership Asset",
      content:
        "Glasgow’s football fandom shows how belonging drives loyalty. Great leaders cultivate that same sense of “us.”",
    },
    {
      id: 2,
      title: "Earning Trust for Sustainability",
      content:
        "Conservation at Loch Lomond thrives only when locals believe the long-term vision—trust is the currency of change.",
    },
    {
      id: 3,
      title: "Culture-First Regeneration",
      content:
        "Paisley proves that funding alone won’t revitalize a place. You need community engagement and a shared cultural narrative.",
    },
    {
      id: 4,
      title: "Balancing Growth & Authenticity",
      content:
        "Edinburgh’s tourism dilemma teaches leaders to protect heritage while responsibly embracing economic opportunity.",
    },
  ],
};

export default function GlasgowSection() {
  return <LocationSection {...glasgowData} />;
}
