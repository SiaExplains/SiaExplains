import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ExternalLink, Zap, Clock, Lightbulb, CalendarDays } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { Project } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return { title: t("title"), description: t("description") };
}

const projects: (Project & { emoji?: string; image?: string; started?: string })[] = [
  { emoji: "🤝", title: "Iranian Tech Hub", description: "A vetted, members-only platform for the Iranian Startup Community: searchable topic archives, verified profiles, co-founder matching, and a funding channel. Built to give a 348-member Telegram group a durable home.", tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "next-intl"], status: "live", url: "https://www.iraniantechhub.com", started: "Sep 2026" },
  { emoji: "⏱️", title: "FocusCrew", description: "A gamified Pomodoro platform with crew-based accountability — your plan, your habits, and your focus in one place. Pick a small crew, focus at the same time, earn XP and badges. Co-founded with Sheida.", tags: ["Next.js", "TypeScript", "tRPC", "Drizzle", "PostgreSQL"], status: "live", url: "https://www.focus-crew.com", started: "Aug 2026" },
  { emoji: "📰", title: "WikiDigit", description: "A tech media and news website covering the latest in technology, AI, and the digital world. Curated content for engineers and tech enthusiasts who want signal over noise.", tags: ["Next.js", "TypeScript", "Tailwind", "CMS"], status: "live", url: "https://wikidigit.com", started: "Jan 2026" },
  { image: "/emojar-favicon.png", title: "Emojar", description: "A free emoji search and copy platform with 3,600+ emojis, curated collections, and mini-games. Built entirely with AI tools — zero lines of hand-written code. Monetised via Google Ads.", tags: ["TypeScript", "Next.js", "Tailwind", "Google Ads"], status: "live", url: "https://emojar.com", started: "Apr 2025" },
  { emoji: "🌐", title: "SiaExplains.com", description: "This website. A personal portfolio, blog, and content hub built with Next.js 15, Tailwind CSS, and MDX. Open source and built in public.", tags: ["Next.js", "TypeScript", "Tailwind", "MDX", "Neon"], status: "live", url: "https://siaexplains.com", repo: "https://github.com/SiaExplains/SiaExplains" },
  { emoji: "🤖", title: "AI Code Review Bot", description: "A GitHub app that performs automated code reviews using LLMs. Catches security issues, performance anti-patterns, and style violations before human review.", tags: ["TypeScript", "Claude API", "GitHub API", "PostgreSQL"], status: "building", repo: "https://github.com/SiaExplains/ai-review-bot" },
  { emoji: "📊", title: "Infra Cost Analyzer", description: "A CLI tool that analyzes AWS/GCP bills and suggests architectural changes to reduce costs. Saved my team 35% on cloud infrastructure.", tags: ["Go", "AWS SDK", "GCP", "CLI"], status: "building" },
  { emoji: "📚", title: "ReadingList", description: "A minimalist Goodreads alternative for engineers. Track books, write notes, share recommendations. Dark mode only.", tags: ["Next.js", "Drizzle", "Neon", "Vercel"], status: "concept" },
];

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  const statusConfig = {
    live: { label: t("live"), icon: Zap, color: "text-brand-700 dark:text-brand-400", bg: "bg-brand-400/10", border: "border-brand-400/20" },
    building: { label: t("building"), icon: Clock, color: "text-brand-500/70 dark:text-brand-300/70", bg: "bg-brand-400/5", border: "border-brand-400/15" },
    concept: { label: t("concept"), icon: Lightbulb, color: "text-gray-500 dark:text-gray-400", bg: "bg-gray-500/5", border: "border-gray-500/15" },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-3">
          {t("label")}
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">{t("description")}</p>
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
                  <Image src={project.image} alt={project.title} width={36} height={36} className="rounded-lg" />
                ) : (
                  <span className="text-3xl">{project.emoji}</span>
                )}
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.border} border ${status.color}`}>
                  <StatusIcon size={10} />
                  {status.label}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-3">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-accent-600 dark:text-accent-300 hover:text-accent-500 dark:hover:text-accent-200 transition-colors">
                      <ExternalLink size={12} />
                      {t("visit")}
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      <GithubIcon size={12} />
                      {t("source")}
                    </a>
                  )}
                </div>
                {project.started && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600">
                    <CalendarDays size={10} />
                    {project.started}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          {t("morePipeline")}{" "}
          <a href="https://youtube.com/@SiaExplains" target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
            {t("followYouTube")}
          </a>{" "}
          to watch them get built.
        </p>
      </div>
    </div>
  );
}
