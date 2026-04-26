import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import { TimelineEvent } from "@/types";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Key milestones in Siavash's journey — from studying engineering in Tehran to leading engineering teams in Berlin.",
};

const timelineEvents: TimelineEvent[] = [
  {
    year: "2012",
    title: "BSc Computer Engineering",
    category: "Education",
    description:
      "Graduated with a degree in Computer Engineering from one of Iran's top technical universities. Fell in love with distributed systems and operating systems during my thesis work.",
    location: "Tehran, Iran",
  },
  {
    year: "2013",
    title: "First Software Engineering Role",
    category: "Career",
    description:
      "Joined a rapidly growing Iranian tech startup as a backend engineer. Built my first production APIs serving hundreds of thousands of users. Learned that real software is nothing like university projects.",
    location: "Tehran, Iran",
  },
  {
    year: "2016",
    title: "Co-founded a Startup",
    category: "Company",
    description:
      "Co-founded a B2B SaaS company targeting the logistics sector. Served as CTO — built the product from scratch, hired the first engineering team, and raised a seed round. Learned more in 18 months than in the previous 5 years.",
    location: "Tehran, Iran",
  },
  {
    year: "2019",
    title: "Moved to Europe",
    category: "Life",
    description:
      "Made the leap to Europe after years of planning. The immigration process was long and bureaucratic, but ultimately life-changing. Berlin was the destination — a city that felt immediately like home.",
    location: "Berlin, Germany",
  },
  {
    year: "2020",
    title: "Senior Engineer at Berlin Fintech",
    category: "Career",
    description:
      "Joined a Berlin-based fintech unicorn as a Senior Software Engineer. Led the redesign of the core payment processing pipeline, reducing latency by 60% and improving reliability from 99.9% to 99.99% uptime.",
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
    year: "2023",
    title: "Promoted to Principal Engineer",
    category: "Career",
    description:
      "Promoted to Principal Software Engineer & Tech Lead, taking ownership of system architecture across multiple teams. Responsible for technical strategy, cross-team standards, and mentoring senior engineers.",
    location: "Berlin, Germany",
  },
  {
    year: "2026",
    title: "Building in Public",
    category: "Life",
    description:
      "Launched SiaExplains.com as a home for writing, projects, and the full story. Building side projects and startups while sharing the journey — engineering, content creation, and everything in between.",
    location: "Berlin, Germany",
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <p className="text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          The journey
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Timeline</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Key milestones from Tehran to Berlin — from student to Principal
          Engineer, founder, and creator.
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
