import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Zap, Clock, Lightbulb } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects and startup ideas by Siavash — built in public.",
};

const projects: (Project & { emoji?: string; image?: string })[] = [
  {
    image: "/emojar-favicon.png",
    title: "Emojar",
    description:
      "A free online emoji platform where users can easily search, copy, and paste emojis into social media, messages, and documents.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    status: "live",
    url: "https://emojar.com",
  },
  {
    emoji: "🌐",
    title: "SiaExplains.com",
    description:
      "This website. A personal portfolio, blog, and content hub built with Next.js 15, Tailwind CSS, and MDX. Open source and built in public.",
    tags: ["Next.js", "TypeScript", "Tailwind", "MDX", "Neon"],
    status: "live",
    url: "https://siaexplains.com",
    repo: "https://github.com/siavash/siaexplains",
  },
  {
    emoji: "🤖",
    title: "AI Code Review Bot",
    description:
      "A GitHub app that performs automated code reviews using LLMs. Catches security issues, performance anti-patterns, and style violations before human review.",
    tags: ["TypeScript", "Claude API", "GitHub API", "PostgreSQL"],
    status: "building",
    repo: "https://github.com/siavash/ai-review-bot",
  },
  {
    emoji: "📊",
    title: "Infra Cost Analyzer",
    description:
      "A CLI tool that analyzes AWS/GCP bills and suggests architectural changes to reduce costs. Saved my team 35% on cloud infrastructure.",
    tags: ["Go", "AWS SDK", "GCP", "CLI"],
    status: "building",
  },
  {
    emoji: "📚",
    title: "ReadingList",
    description:
      "A minimalist Goodreads alternative for engineers. Track books, write notes, share recommendations. Dark mode only.",
    tags: ["Next.js", "Drizzle", "Neon", "Vercel"],
    status: "concept",
  },
];

const statusConfig = {
  live: {
    label: "Live",
    icon: Zap,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  building: {
    label: "Building",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  concept: {
    label: "Concept",
    icon: Lightbulb,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-500 dark:text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          Side projects
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          Things I&apos;m building outside of work — mostly tools I wish existed, experiments
          with new tech, and startups in progress. All built in public.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => {
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={project.title}
              className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-6 hover:border-gray-300 dark:hover:border-white/10 transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={36}
                    height={36}
                    className="rounded-lg"
                  />
                ) : (
                  <span className="text-3xl">{project.emoji}</span>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.border} border ${status.color}`}
                >
                  <StatusIcon size={10} />
                  {status.label}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Visit
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <GithubIcon size={12} />
                    Source
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          More projects in the pipeline.{" "}
          <a
            href="https://youtube.com/@SiaExplains"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
          >
            Follow on YouTube
          </a>{" "}
          to watch them get built.
        </p>
      </div>
    </div>
  );
}
