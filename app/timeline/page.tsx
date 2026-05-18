import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import { TimelineEvent } from "@/types";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Key milestones in Siavash's journey — from co-founding a tech company in Iran to Principal Engineer and manager in Berlin.",
};

const timelineEvents: TimelineEvent[] = [
  {
    year: "2026",
    title: "Building in Public",
    category: "Life",
    description:
      "Launched SiaExplains.com as a home for writing, projects, and the full story. Building side projects and startups while sharing the journey — engineering, content creation, and everything in between.",
    location: "Berlin, Germany",
  },
  {
    year: "2026",
    title: "Launched WikiDigit",
    category: "Company",
    description:
      "Founded WikiDigit — a tech media and news platform delivering curated stories on AI, software, and the digital world. Built for engineers and tech enthusiasts who want depth over clickbait.",
    location: "Berlin, Germany",
  },
  {
    year: "2025",
    title: "Launched Emojar",
    category: "Company",
    description:
      "Built and launched Emojar.com — a free emoji search and copy platform featuring 3,600+ emojis, curated collections, and mini-games. The entire product was shipped using AI tools with zero hand-written code. Monetised via Google Ads.",
    location: "Berlin, Germany",
  },
  {
    year: "2023",
    title: "Principal Engineer & Manager at MHP",
    category: "Career",
    description:
      "Joined MHP as Principal Software Engineer and Manager. Leading a cross-functional team, designing KPI comparison tools for Volkswagen Group plants, implementing virtual meter concepts for energy dashboards, and automating CI/CD pipelines that were previously fully manual.",
    location: "Berlin, Germany",
  },
  {
    year: "2022",
    title: "Launched SiaExplains on YouTube",
    category: "Life",
    description:
      "Started SiaExplains to share what I'd learned about engineering, career growth, and international tech careers. The response exceeded all expectations and ignited a passion for teaching and content creation.",
    location: "Berlin, Germany",
  },
  {
    year: "2020",
    title: "Senior Engineer at Trademachines, Berlin",
    category: "Career",
    description:
      "Joined Trademachines as a Senior Software Engineer. Built a Next.js 13 management dashboard, boosted Web Core Vitals by 18%, drove a 30% SEO traffic increase, introduced A/B testing that lifted conversion rates by 20%, and led migration from legacy PHP7 to React.",
    location: "Berlin, Germany",
  },
  {
    year: "2019",
    title: "Moved Abroad",
    category: "Life",
    description:
      "Made the leap internationally — first to Sydney, Australia, where I helped migrate a legacy e-commerce platform to React and Node.js. Then onward to Europe, landing in Berlin: a city that immediately felt like home.",
    location: "Sydney → Berlin",
  },
  {
    year: "2016",
    title: "Lead Engineer & Senior Roles in Tehran",
    category: "Career",
    description:
      "Progressed through senior engineering roles across multiple companies. At Soniran, led front-end and back-end teams building an e-wallet and credit system. At SON Corporate Group, improved financial data entry applications and built a custom spreadsheet language for non-technical users.",
    location: "Tehran, Iran",
  },
  {
    year: "2012",
    title: "First Professional Engineering Role",
    category: "Career",
    description:
      "Joined Saman International Analysts as a Software Developer. Redesigned a core financial messaging app based on ISO-8553, implemented an automatic modular update system saving $50k/year, and led development of deposit, withdrawal, and transfer modules.",
    location: "Tehran, Iran",
  },
  {
    year: "2009",
    title: "Bachelor's in Computer Software Engineering",
    category: "Education",
    description:
      "Enrolled at Mazandaran University of Science and Technology. Graduated in 2012 with a grade of 15.94/20. My thesis focused on analysis, design, and implementation of a multi-glossary dictionary similar to Babylon.",
    location: "Mazandaran, Iran",
  },
  {
    year: "2007",
    title: "Co-founded Taazuu Developers",
    category: "Company",
    description:
      "Co-founded a software development company while still in university. As CTO, built a multilingual dictionary supporting 12+ languages with OCR, architected an LMS for a major Iranian university, and shipped over 12 web portfolios and a native Windows app for fuel card distribution across 14 cities.",
    location: "Ghaemshahr, Iran",
  },
  {
    year: "2006",
    title: "Associate's Degree in Software",
    category: "Education",
    description:
      "Enrolled at Azad University to study Software. Participated in Robotics Seminar and built an Interactive Content Management System as my final project. Graduated in 2009 with a grade of 16.66/20.",
    location: "Iran",
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <p className="text-brand-500 dark:text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          The journey
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Timeline</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Key milestones from Iran to Berlin — from co-founding a company at 20
          to Principal Engineer, manager, and creator.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm">
        {[
          { label: "Education", color: "bg-sky-400" },
          { label: "Career", color: "bg-brand-400" },
          { label: "Company", color: "bg-emerald-400" },
          { label: "Life", color: "bg-rose-400" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 text-gray-500">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>

      <Timeline events={timelineEvents} />
    </div>
  );
}
