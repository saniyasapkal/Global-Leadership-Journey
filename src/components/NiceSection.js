// src/components/NiceSection.jsx
"use client";

import LocationSection from "./LocationSection";

const niceData = {
  id: "nice",
  heroImage: "/images/nice-promenade.jpg",
  heroTitle: "Next Stop: Nice, France",
  heroSubtitle: "Mediterranean Lifestyle, Sustainability, and Cultural Insight",
  funFacts: [
    "Nice is the gateway to the French Riviera, where the Alps meet the Mediterranean in a stunning coastal embrace.",
    "With over 300 days of sunshine a year, Nice’s climate has long attracted artists, writers, and travelers seeking inspiration.",
    "Old Town Nice, with its winding alleys and ochre-colored buildings, offers a glimpse into the city's Italian-influenced past.",
    "The Promenade des Anglais isn’t just a famous boardwalk—it reflects Nice’s blend of leisure, luxury, and laid-back elegance.",
    "From Niçoise cuisine to the annual Carnival, the city celebrates life with color, flavor, and tradition.",
  ],
  experiences: [
    {
      id: 1,
      title: "Studying in Nice: A Global Learning Hub",
      description:
        "Living and studying in Nice immersed me in an environment where academic discussions extended beyond the classroom. The city’s international presence, sustainability efforts, and cultural blend provided a real-world backdrop for understanding global leadership.",
      image: "/images/nice-france.jpg",
    },
    {
      id: 2,
      title: "Cannes Island: A Case Study in Sustainable Tourism",
      description:
        "As part of a university-led visit, I explored Île Sainte-Marguerite in Cannes, where France has integrated historical preservation with eco-tourism. The experience highlighted the delicate balance between maintaining heritage sites and ensuring long-term environmental responsibility.",
      image: "/images/cannes-island.jpg",
    },
    {
      id: 3,
      title: "Solo Exploration: The Riviera’s Contrasting Realities",
      description:
        "Traveling independently across the French Riviera—from the opulence of Monaco to the slower pace of Menton—revealed the region’s competing priorities between tourism, authenticity, and sustainability. Each city’s approach to balancing these forces offered a unique lesson in adaptive leadership.",
      image: "/images/french-riviera.jpg",
    },
    {
      id: 4,
      title: "Rethinking Consumption: A Sustainability Project",
      description:
        "While in Nice, I worked on a project addressing responsible consumption, focusing on how everyday habits—food delivery, grocery shopping, and single-use plastics—have far-reaching environmental impacts. This experience reinforced the role of individual accountability in global sustainability efforts.",
      image: "/images/sustainability-project.jpg",
    },
  ],
  insights: [
    {
      id: 1,
      title: "Global Learning Requires Local Immersion",
      content:
        "Studying in Nice was a reminder that leadership isn’t just shaped by coursework but by context. Being surrounded by diverse cultures, policies, and sustainability initiatives deepened my understanding of how global issues play out in everyday life.",
    },
    {
      id: 2,
      title: "Preserving the Past Requires a Vision for the Future",
      content:
        "Cannes Island’s conservation efforts showed that safeguarding history is not about freezing it in time but about integrating it into the present responsibly. The most effective leaders balance heritage with progress, ensuring that preservation and innovation go hand in hand.",
    },
    {
      id: 3,
      title: "Independent Exploration Fosters Critical Thinking",
      content:
        "Traveling solo across the Riviera forced me to analyze how different cities approach tourism and sustainability. Observing how Monaco embraces luxury while Menton prioritizes local charm reinforced that leadership isn’t about imposing one-size-fits-all solutions but adapting strategies to fit specific environments.",
    },
    {
      id: 4,
      title: "Sustainability is a Leadership Responsibility",
      content:
        "Through my research on consumption habits, I saw how small lifestyle changes can create a ripple effect in global sustainability. Leaders in any field must take responsibility for setting behavioral norms that drive long-term environmental impact.",
    },
    {
      id: 5,
      title: "Borders May Be Invisible, But Their Impact is Profound",
      content:
        "Crossing from Nice into Ventimiglia, I witnessed firsthand how cultural and economic dynamics shift in an instant. Leadership today requires a cross-border mindset—decisions made in one place can have far-reaching consequences elsewhere.",
    },
  ],
};

export default function NiceSection() {
  return <LocationSection {...niceData} />;
}
