import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* Optimized Section Title Component (Drop shadow removed) */
const SectionTitle = ({ title }) => {
  return (
    <motion.h2
      className="mb-8 mt-4 text-3xl font-semibold text-gray-800 inline-block border-b border-gray-300 pb-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {title}
    </motion.h2>
  );
};

/* Auto-Scrolling Fun Facts Component */
const AutoScrollingFunFacts = ({ funFacts }) => {
  // Duplicate items to create a seamless loop without gaps
  const scrollAnimation = {
    animate: { x: ["0%", "-50%"] },
    transition: { duration: 20, ease: "linear", repeat: Infinity }
  };

  return (
    <div className="relative overflow-hidden py-4 shadow-md">
      <motion.div
        className="flex space-x-10 w-[200%]"
        {...scrollAnimation}
        whileHover={{ transition: { duration: 5 } }}
      >
        {funFacts.concat(funFacts).map((fact, index) => (
          <div key={index} className="flex items-center space-x-2 bg-white bg-opacity-90 p-4 rounded shadow">
            <img src={fact.icon} alt="icon" className="w-6 h-6" />
            <span className="text-md font-medium">{fact.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* Prague Experiences Component (Personal Layout: Text to the side of image) */
const PragueExperiences = ({ experiences }) => {
  return (
    <div className="py-20">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id} 
          className="flex flex-col md:flex-row items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2">
            <Image 
              src={exp.image}
              alt={exp.title}
              layout="responsive"
              width={800}
              height={500}
              className="rounded-lg shadow-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 text-left">
            <h3 className="text-3xl font-bold">{exp.title}</h3>
            <p className="mt-2 text-lg">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* Leadership Insights Component (Fluid, Journal-like storytelling) */
const LeadershipInsights = ({ insights }) => {
  return (
    <div className="py-20 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto">
        {insights.map((insight, index) => {
          // Split content into sentences
          const sentences = insight.content
            .split('.')
            .filter(s => s.trim() !== "")
            .map(s => s.trim() + '.');
          return (
            <motion.div 
              key={insight.id}
              className="mb-8 text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2">{insight.title}</h3>
              {sentences.map((sentence, i) => (
                <motion.p 
                  key={i}
                  className="text-lg text-gray-700 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.3 }}
                >
                  {sentence}
                </motion.p>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const PragueSection = () => {
  const { scrollY } = useViewportScroll();
  // Very slow, subtle Ken Burns zoom effect on the hero image
  const scale = useTransform(scrollY, [0, 1000], [1, 1.03]);

  // Data for Fun Facts (Location Insights)
  const funFacts = [
    {
      id: 1,
      text: "Known as the 'Heart of Europe,' Prague integrates historical depth with a rising global business presence.",
      icon: "/icons/heart.svg"
    },
    {
      id: 2,
      text: "The Astronomical Clock (1410) — a symbol of precision and craftsmanship — reflects Prague’s commitment to structured and thoughtful execution.",
      icon: "/icons/clock.svg"
    },
    {
      id: 3,
      text: "The Velvet Revolution (1989) showcased the Czech approach to gradual, intellectual-driven change, emphasizing strategic action over abrupt shifts.",
      icon: "/icons/culture.svg"
    }
  ];

  // Data for My Prague Experiences
  const experiences = [
    {
      id: 1,
      title: "Exploring Prague Castle",
      description: "A symbol of history and power, reinforcing the importance of legacy in shaping national and business identities.",
      image: "/images/prague-castle.jpg"
    },
    {
      id: 2,
      title: "Visiting Terezín Concentration Camp",
      description: "A sobering reminder of the impact of history, ethics, and leadership decisions on societies and cultures.",
      image: "/images/terezin-camp.jpg"
    },
    {
      id: 3,
      title: "NC State Building for Class",
      description: "Located in the center of Old Town with diverse architectural styles – a reflection of Prague’s interconnected past where different cultures and philosophies have met for centuries.",
      image: "/images/nc-state-building.jpg"
    }
  ];

  // Data for Key Leadership Insights (Key Takeaways)
  const insights = [
    {
      id: 1,
      title: "The Importance of Planning and Clear Objectives",
      content: "Whether in historical revolutions or business strategy, failing to plan is planning to fail. Setting clear goals—like a well-defined team charter—ensures alignment and direction",
      category: "strategic"
    },
    {
      id: 2,
      title: "Developing a Global Mindset",
      content: "Effective leadership today requires an inclusive, culturally aware perspective, balancing local traditions with global opportunities",
      category: "strategic"
    },
    {
      id: 3,
      title: "Cultural Intelligence Enhances Collaboration",
      content: "Navigating cross-cultural environments—whether in history, leadership, or modern workspaces—requires adaptability, mindfulness, and strong communication skills",
      category: "cultural"
    },
    {
      id: 4,
      title: "Team Development is a Process",
      content: "Like the stages of history, teams evolve through phases (Forming, Storming, Norming, Performing), requiring patience, flexibility, and shared goals",
      category: "adaptive"
    },
    {
      id: 5,
      title: "Learning Cultures Drive Success",
      content: "The most resilient societies, teams, and leaders foster environments of continuous learning and reflection, ensuring long-term adaptability and progress",
      category: "adaptive"
    }
  ];

  return (
    <section className="w-full">
      {/* Hero Section: Immersive & Cinematic */}
      <div className="relative w-full" style={{ height: '70vh' }}>
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 40, ease: "linear" }}
        >
          <Image
            src="/images/charles-bridge-sunrise.jpg"
            alt="Charles Bridge at sunrise with Prague Castle"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            1st Stop: Prague, Czech Republic
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-2xl text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Blending History with Modern Innovation
          </motion.p>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="📍 Location Insights" />
          <AutoScrollingFunFacts funFacts={funFacts} />
        </div>
      </div>

      {/* My Prague Experiences Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="📍 My Prague Experiences" />
          <PragueExperiences experiences={experiences} />
        </div>
      </div>

      {/* Leadership Insights Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="💡 Leadership Insights from Prague" />
          <LeadershipInsights insights={insights} />
        </div>
      </div>
    </section>
  );
};

export default PragueSection;
