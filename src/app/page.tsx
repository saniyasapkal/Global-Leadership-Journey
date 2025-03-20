// src/app/page.tsx

import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import Timeline from "@/components/Timeline";
import LeadershipInsights from "@/components/LeadershipInsights";
import ReflectionSection from "@/components/ReflectionSection";


export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      {/* Hero Section - Engaging Landing View */}
      <HeroSection />

      {/* Interactive Leadership Journey - Dual View (Map & Timeline) */}
      <section id="journey" className="w-full max-w-6xl px-6">
        
        <Timeline />
      </section>

      {/* Key Leadership Insights */}
      <section id="insights" className="w-full max-w-5xl px-6 my-16">
        <LeadershipInsights />
      </section>

      {/* Personal Reflection & Growth */}
      <section id="reflection" className="w-full max-w-5xl px-6 my-16">
        <ReflectionSection />
      </section>

    </main>
  );
}
