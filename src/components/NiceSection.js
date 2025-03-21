import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* Optimized Section Title Component */
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

/* Nice Experiences Component */
const NiceExperiences = ({ experiences }) => {
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

/* Leadership Insights Component */
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

const NiceSection = () => {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.03]);

  const experiences = [
    {
      id: 1,
      title: "📚 Studying in Nice: A Global Learning Hub",
      description:
        "Living and studying in Nice immersed me in an environment where academic discussions extended beyond the classroom. The city’s international presence, sustainability efforts, and cultural blend provided a real-world backdrop for understanding global leadership.",
      image: "/images/nice-study.jpg"
    },
    {
      id: 2,
      title: "🌊 Cannes Island: A Case Study in Sustainable Tourism",
      description:
        "As part of a university-led visit, I explored Île Sainte-Marguerite in Cannes, where France has integrated historical preservation with eco-tourism. The experience highlighted the delicate balance between maintaining heritage sites and ensuring long-term environmental responsibility.",
      image: "/images/cannes-island.jpg"
    },
    {
      id: 3,
      title: "🌴 Solo Exploration: The Riviera’s Contrasting Realities",
      description:
        "Traveling independently across the French Riviera—from the opulence of Monaco to the slower pace of Menton—revealed the region’s competing priorities between tourism, authenticity, and sustainability. Each city’s approach to balancing these forces offered a unique lesson in adaptive leadership.",
      image: "/images/french-riviera.jpg"
    },
    {
      id: 4,
      title: "♻️ Rethinking Consumption: A Sustainability Project",
      description:
        "While in Nice, I worked on a project addressing responsible consumption, focusing on how everyday habits—food delivery, grocery shopping, and single-use plastics—have far-reaching environmental impacts. This experience reinforced the role of individual accountability in global sustainability efforts.",
      image: "/images/sustainability-project.jpg"
    }
  ];
  
  const insights = [
    {
      id: 1,
      title: "Global Learning Requires Local Immersion",
      content:
        "Studying in Nice was a reminder that leadership isn’t just shaped by coursework but by context. Being surrounded by diverse cultures, policies, and sustainability initiatives deepened my understanding of how global issues play out in everyday life.",
      category: "cultural"
    },
    {
      id: 2,
      title: "Preserving the Past Requires a Vision for the Future",
      content:
        "Cannes Island’s conservation efforts showed that safeguarding history is not about freezing it in time but about integrating it into the present responsibly. The most effective leaders balance heritage with progress, ensuring that preservation and innovation go hand in hand.",
      category: "strategic"
    },
    {
      id: 3,
      title: "Independent Exploration Fosters Critical Thinking",
      content:
        "Traveling solo across the Riviera forced me to analyze how different cities approach tourism and sustainability. Observing how Monaco embraces luxury while Menton prioritizes local charm reinforced that leadership isn’t about imposing one-size-fits-all solutions but adapting strategies to fit specific environments.",
      category: "adaptive"
    },
    {
      id: 4,
      title: "Sustainability is a Leadership Responsibility",
      content:
        "Through my research on consumption habits, I saw how small lifestyle changes can create a ripple effect in global sustainability. Leaders in any field must take responsibility for setting behavioral norms that drive long-term environmental impact.",
      category: "cultural"
    },
    {
      id: 5,
      title: "Borders May Be Invisible, But Their Impact is Profound",
      content:
        "Crossing from Nice into Ventimiglia, I witnessed firsthand how cultural and economic dynamics shift in an instant. Leadership today requires a cross-border mindset—decisions made in one place can have far-reaching consequences elsewhere.",
      category: "strategic"
    }
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
            src="/images/nice-promenade.jpg"
            alt="Promenade des Anglais overlooking the Mediterranean"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="📍 My Nice Experiences" />
          <NiceExperiences experiences={experiences} />
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="💡 Leadership Insights from Nice" />
          <LeadershipInsights insights={insights} />
        </div>
      </div>
    </section>
  );
};

export default NiceSection;
