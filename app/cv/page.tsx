import type { Metadata } from "next";
import { Briefcase, GraduationCap, Code2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum Vitae of Siavash — Principal Software Engineer & Tech Lead based in Berlin.",
};

const experience = [
  {
    role: "Principal Software Engineer & Tech Lead",
    company: "Berlin Fintech GmbH",
    period: "2023 — Present",
    location: "Berlin, Germany",
    bullets: [
      "Own system architecture across 3 product teams serving 2M+ users",
      "Define technical standards, review processes, and cross-team engineering strategy",
      "Reduced infrastructure costs by 35% through strategic architectural changes",
      "Mentor 8 senior engineers; run weekly architecture office hours",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Berlin Fintech GmbH",
    period: "2020 — 2023",
    location: "Berlin, Germany",
    bullets: [
      "Led redesign of core payment processing pipeline (Kotlin, Kafka, PostgreSQL)",
      "Improved payment reliability from 99.9% to 99.99% SLA",
      "Reduced p99 latency from 800ms to 180ms on critical payment flows",
      "Introduced event-driven architecture patterns across 5 engineering teams",
    ],
  },
  {
    role: "Co-founder & CTO",
    company: "LogiSync (Startup)",
    period: "2016 — 2019",
    location: "Tehran, Iran",
    bullets: [
      "Built logistics SaaS from scratch; grew to 50+ enterprise clients",
      "Hired and led team of 7 engineers",
      "Architected multi-tenant system handling 1M+ daily events",
      "Raised seed funding and managed investor relations",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "TechStartup Inc.",
    period: "2013 — 2016",
    location: "Tehran, Iran",
    bullets: [
      "Built and maintained RESTful APIs for consumer products with 500k MAU",
      "Led migration from monolith to service-oriented architecture",
      "Implemented real-time notification system using WebSockets",
    ],
  },
];

const education = [
  {
    degree: "BSc Computer Engineering",
    institution: "Technical University of Tehran",
    period: "2008 — 2012",
    note: "Thesis: Distributed Consensus Algorithms in Peer-to-Peer Networks",
  },
];

const skills = {
  Languages: ["TypeScript", "Python", "Kotlin", "Go", "SQL"],
  "Backend & Infra": ["Node.js", "Next.js", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes"],
  "Architecture": ["Distributed Systems", "Event-Driven Architecture", "CQRS", "DDD", "Microservices"],
  "Cloud": ["AWS", "GCP", "Vercel", "Neon"],
  "Leadership": ["Tech Lead", "Architecture Review", "Hiring", "Mentoring", "Engineering Strategy"],
};

const languages = [
  { lang: "Persian (Farsi)", level: "Native" },
  { lang: "English", level: "Fluent" },
  { lang: "German", level: "B2" },
];

export default function CvPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-gray-200 dark:border-white/5">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Siavash</h1>
        <p className="text-brand-500 dark:text-brand-400 text-lg mb-1">
          Principal Software Engineer & Tech Lead
        </p>
        <p className="text-gray-500 text-sm">
          Berlin, Germany · siavash@siaexplains.com · SiaExplains.com
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Principal engineer with 10+ years building high-scale distributed
          systems. Experienced in fintech, SaaS, and logistics. Passionate about
          clean architecture, engineering culture, and sharing knowledge.
        </p>
      </div>

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Briefcase size={14} />
          Experience
        </div>
        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="border-l-2 border-gray-200 dark:border-white/5 pl-5 hover:border-brand-500/40 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{job.role}</h3>
                  <p className="text-brand-500 dark:text-brand-400 text-sm">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{job.period}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-600">{job.location}</p>
                </div>
              </div>
              <ul className="space-y-1 mt-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <span className="text-brand-500 mt-1 shrink-0">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <GraduationCap size={14} />
          Education
        </div>
        {education.map((edu) => (
          <div key={edu.institution} className="border-l-2 border-gray-200 dark:border-white/5 pl-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-brand-500 dark:text-brand-400 text-sm">{edu.institution}</p>
              </div>
              <p className="text-sm text-gray-500">{edu.period}</p>
            </div>
            {edu.note && (
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-1 italic">{edu.note}</p>
            )}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Code2 size={14} />
          Skills
        </div>
        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-600 w-32 shrink-0">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          <Globe size={14} />
          Languages
        </div>
        <div className="flex flex-wrap gap-4">
          {languages.map(({ lang, level }) => (
            <div
              key={lang}
              className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lang}</p>
              <p className="text-xs text-gray-500">{level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
