import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* Section Title with Subtle Animation */
const SectionTitle = ({ title }) => {
  return (
    <motion.h2
      className="mb-8 mt-4 text-3xl font-semibold text-gray-800 inline-block border-b border-gray-300 pb-2"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {title}
    </motion.h2>
  );
};

/* Auto-Scrolling Fun Facts Component */
const AutoScrollingFunFacts = ({ funFacts }) => {
  const scrollAnimation = {
    animate: { x: ["0%", "-50%"] },
    transition: { duration: 20, ease: "linear", repeat: Infinity }
  };

  return (
    <div className="relative overflow-hidden py-4 shadow-md bg-gray-100">
      <motion.div className="flex space-x-10 w-[200%]" {...scrollAnimation}>
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

/* Glasgow Experiences Component */
const GlasgowExperiences = ({ experiences }) => {
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

/* Leadership Insights Component (Fluid, Storytelling Format) */
const LeadershipInsights = ({ insights }) => {
  return (
    <div className="py-20 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto">
        {insights.map((insight, index) => {
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

/* Glasgow Section */
const GlasgowSection = () => {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.03]);

  const funFacts = [
    { id: 1, text: "Glasgow is Scotland’s largest city, known for its industrial past and cultural festivals.", icon: "/icons/industry.svg" },
    { id: 2, text: "Once the 'Second City of the British Empire,' Glasgow was a global shipbuilding powerhouse.", icon: "/icons/ship.svg" },
    { id: 3, text: "Glasgow played a major role in the Scottish Enlightenment, fostering innovation and philosophy.", icon: "/icons/philosophy.svg" }
  ];

  const experiences = [
    {
      id: 1,
      title: "⚽ The Culture of Football in Glasgow",
      description:
        "Football in Glasgow is more than just a game—it’s a deep-rooted passion that connects communities. At the St. Mirren match, I saw the raw energy of fans whose chants echoed across the stadium. Visiting Celtic Park later reinforced how football represents history, identity, and a sense of belonging that spans generations.",
      image: "/images/glasgow-football.jpg"
    },
    {
      id: 2,
      title: "🌿 Balancing Nature and Tourism at Loch Lomond",
      description:
        "Loch Lomond’s stunning landscapes attract millions of visitors, but the challenge lies in balancing tourism with conservation. While efforts are being made to reduce environmental impact, many locals fear that changes could disrupt the park’s character. The debate reflects a broader challenge in sustainability—protecting nature while ensuring accessibility for future generations.",
      image: "/images/loch-lomond.jpg"
    },
    {
      id: 3,
      title: "🏗️ Paisley’s Cultural Regeneration",
      description:
        "Once a textile powerhouse, Paisley is reinventing itself through arts and cultural investment. From the restoration of historic landmarks to community-driven festivals, the town is embracing creativity as a path to economic revival. However, sustaining this transformation requires long-term support and ensuring that regeneration benefits everyone—not just tourists and investors.",
      image: "/images/paisley-town.jpg"
    },
    {
      id: 4,
      title: "🏰 Navigating Tourism in Edinburgh",
      description:
        "Walking through Edinburgh’s bustling streets, I saw a city grappling with the impact of mass tourism. While the historic charm attracts millions, rising property costs and overcrowding threaten its authenticity. The city’s challenge is finding a balance—embracing tourism while protecting the cultural identity that makes Edinburgh unique.",
      image: "/images/edinburgh.jpg"
    }
  ];
  
  

  const insights = [
    {
      id: 1,
      title: "The Power of Community in Leadership",
      content:
        "Glasgow’s football culture shows how strong community ties create loyalty and shared purpose. Leaders who understand the importance of belonging can inspire teams and drive meaningful change.",
      category: "cultural"
    },
    {
      id: 2,
      title: "Sustainability Requires Public Trust",
      content:
        "Loch Lomond’s conservation efforts reveal that even well-intended policies face resistance without community buy-in. Leadership is about balancing long-term environmental goals with the needs of the people affected.",
      category: "adaptive"
    },
    {
      id: 3,
      title: "Cultural Revitalization Needs More Than Funding",
      content:
        "Paisley’s transformation highlights that restoring a city is not just about investment. It requires public engagement, a strong cultural identity, and opportunities that benefit the entire community.",
      category: "strategic"
    },
    {
      id: 4,
      title: "Sustainable Tourism Requires Leadership",
      content:
        "Edinburgh’s tourism policies show that growth is not just about attracting visitors. Leaders must find ways to support local economies while preserving the authenticity of the places people want to experience.",
      category: "strategic"
    }
  ];
  
  

  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative w-full" style={{ height: '70vh' }}>
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 40, ease: "linear" }}
        >
          <Image
            src="/images/glasgow-street.jpg"
            alt="Vibrant streets of Glasgow"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
        <div className="absolute bottom-10 left-10">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Next Stop: Glasgow, Scotland
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-2xl text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A City of Boldness, Community, and Innovation
          </motion.p>
        </div>
      </div>

      <div className="py-12 bg-gray-50">
        <SectionTitle title="📍 Location Insights" />
        <AutoScrollingFunFacts funFacts={funFacts} />
      </div>

      <div className="py-20">
        <SectionTitle title="📍 My Glasgow Experiences" />
        <GlasgowExperiences experiences={experiences} />
      </div>

      <div className="py-20 bg-gray-100">
        <SectionTitle title="💡 Leadership Insights from Glasgow" />
        <LeadershipInsights insights={insights} />
      </div>
    </section>
  );
};

export default GlasgowSection;
