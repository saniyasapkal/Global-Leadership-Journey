
import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const SectionTitle = ({ title }) => (
  <motion.h2
    className="mb-8 mt-4 text-3xl font-semibold text-gray-800 inline-block border-b border-gray-300 pb-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {title}
  </motion.h2>
);

const AutoScrollingFunFacts = ({ funFacts }) => {
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

const AustriaExperiences = ({ experiences }) => (
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

const LeadershipInsights = ({ insights }) => (
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

const AustriaSection = () => {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.03]);

  const funFacts = [
    { id: 1, text: "Nestled in the Austrian Alps, Innsbruck blends nature and precision.", icon: "/icons/mountain.svg" },
    { id: 2, text: "Host of two Winter Olympics, it's a hub for outdoor adventure.", icon: "/icons/olympics.svg" },
    { id: 3, text: "Home of Swarovski Crystal” innovation through artistry.", icon: "/icons/crystal.svg" }
  ];

  const experiences = [
    {
      id: 1,
      title: "Swarovski Crystal World Tour",
      description: "A surreal walk through immersive installations, crystal chambers, and mirrored rooms. The space was both artistic and futuristic—unlike anything I'd seen before.",
      image: "/images/swarovski-world-tour.jpg"
    },
    {
      id: 2,
      title: "Hiking Nordkette",
      description: "The hike started quiet and steep, but the view from the top made it worth it. Snow-capped peaks, colorful rooftops, and a sky that felt close enough to touch.",
      image: "/images/hiking-nordkette.jpg"
    },
    {
      id: 3,
      title: "Skiing in the Alps",
      description: "Fresh powder, crisp air, and winding trails through wide-open slopes. Fast-paced but peaceful in a way that’s hard to explain unless you’ve done it.",
      image: "/images/skiing-austrian-alps.jpg"
    },
    {
      id: 4,
      title: "Austrian Dessert Tour",
      description: "Tried sachertorte, apfelstrudel, and a few things I couldn't pronounce. Everything was rich, cozy, and perfect with coffee on a cold day.",
      image: "/images/austrian-desserts.jpg"
    }
  ];
  

  const insights = [
    {
      id: 1,
      title: "Reputation Builds Team Trust",
      content:
        "People are more likely to share ideas and collaborate when they trust their leader. A strong reputation for fairness, consistency, and follow-through encourages creativity and engagement.",
      category: "strategic",
    },
    {
      id: 2,
      title: "Structure Enables Adaptability",
      content:
        "In uncertain situations, having a clear framework helps teams adjust without losing direction. Structure doesn’t restrict—it gives flexibility a foundation to work from.",
      category: "adaptive",
    },
    {
      id: 3,
      title: "Clear Feedback Drives Performance",
      content:
        "When feedback is specific and separated from personal judgment, it leads to growth. Precision in communication makes expectations clearer and outcomes stronger.",
      category: "strategic",
    },
    {
      id: 4,
      title: "Work-Life Balance Makes Leaders More Effective",
      content:
        "Taking breaks and creating space for recovery isn’t a luxury—it’s part of leading well. A culture that values both focus and rest helps people perform at their best long-term.",
      category: "cultural",
    },
    {
      id: 5,
      title: "Cultural Context Shapes Interpretation",
      content:
        "A behavior that seems rigid in one culture may be seen as efficient in another. Being aware of these differences prevents misunderstandings and improves cross-cultural collaboration.",
      category: "adaptive",
    },
  ];
  

  return (
    <section className="w-full">
      <div className="relative w-full" style={{ height: '70vh' }}>
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 40, ease: "linear" }}
        >
          <Image
            src="/images/innsbruck-hero.jpg"
            alt="View from Nordkette overlooking Innsbruck"
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
            2nd Stop: Innsbruck, Austria
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-2xl text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Precision, Nature, and Cultural Harmony
          </motion.p>
        </div>
      </div>

      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="Location Insights" />
          <AutoScrollingFunFacts funFacts={funFacts} />
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="My Innsbruck Experiences" />
          <AustriaExperiences experiences={experiences} />
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="Leadership Insights from Innsbruck" />
          <LeadershipInsights insights={insights} />
        </div>
      </div>
    </section>
  );
};

export default AustriaSection;