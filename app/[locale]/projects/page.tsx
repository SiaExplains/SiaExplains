import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeMetadata } from "@/lib/seo";
import Image from "next/image";
import { ExternalLink, Zap, Clock, Lightbulb, CalendarDays, Crown, Users } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { Link } from "@/lib/navigation";
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return { title: t("title"), description: t("description"), ...(await localeMetadata("/projects")) };
}

const projects: (Project & { emoji?: string; image?: string; started?: string })[] = [
  { emoji: "🎨", title: "Mylper", role: "soloFounder", description: "A free, browser-based image editor in the spirit of Photoshop and GIMP — edit photos, design images, and draw with layers and familiar tools. Nothing to install: it runs entirely in your browser.", tags: ["Next.js", "TypeScript", "Canvas API"], status: "live", url: "https://mylper.com", started: "Oct 2026" },
  { emoji: "🤝", title: "Iranian Tech Hub", role: "soloFounder", description: "A vetted, members-only platform for the Iranian Startup Community: searchable topic archives, verified profiles, co-founder matching, and a funding channel. A non-profit built to give an 800+ member Telegram community a durable home; 150 members onboarded so far and growing.", tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "next-intl"], status: "live", url: "https://www.iraniantechhub.com", started: "Sep 2026" },
  { emoji: "⏱️", title: "FocusCrew", role: "coFounder", description: "A gamified Pomodoro platform with crew-based accountability — your plan, your habits, and your focus in one place. Pick a small crew, focus at the same time, earn XP and badges. Co-founded with Sheida.", tags: ["Next.js", "TypeScript", "tRPC", "Drizzle", "PostgreSQL"], status: "live", url: "https://www.focus-crew.com", started: "Aug 2026" },
  { emoji: "📰", title: "WikiDigit", role: "soloFounder", description: "A tech media and news website covering the latest in technology, AI, and the digital world. Curated content for engineers and tech enthusiasts who want signal over noise.", tags: ["Next.js", "TypeScript", "Tailwind", "CMS"], status: "live", url: "https://wikidigit.com", started: "Jan 2026" },
  { image: "/emojar-favicon.png", title: "Emojar", role: "soloFounder", description: "A free collection of fast, privacy-friendly online tools — from image and PDF converters to developer utilities, calculators, and text tools. Everything runs directly in your browser, so your files stay on your device.", tags: ["TypeScript", "Next.js", "Tailwind", "Browser APIs", "WebAssembly"], status: "live", url: "https://emojar.com", started: "Apr 2025" },
  { emoji: "🌐", title: "SiaExplains.com", description: "This website. A personal portfolio, blog, and content hub built with Next.js 15, Tailwind CSS, and MDX. Open source and built in public.", tags: ["Next.js", "TypeScript", "Tailwind", "MDX", "Neon"], status: "live", url: "https://www.siaexplains.com", repo: "https://github.com/SiaExplains/SiaExplains" },
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
      <PageHeader label={t("label")} title={t("title")} description={t("description")} />

      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;
          return (
            <RevealItem key={project.title} className="h-full">
              <SpotlightCard className="group h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400/15 to-accent-500/15 ring-1 ring-accent-500/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      {project.image ? (
                        <Image src={project.image} alt={project.title} width={30} height={30} className="rounded-lg" />
                      ) : (
                        <span className="text-2xl">{project.emoji}</span>
                      )}
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.border} border ${status.color}`}>
                      <StatusIcon size={10} />
                      {status.label}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 transition-colors group-hover:text-accent-700 dark:group-hover:text-accent-200">{project.title}</h3>
                  {project.role && (
                    <p className="-mt-1 mb-2 inline-flex items-center gap-1 text-xs font-medium text-brand-700 dark:text-brand-300">
                      {project.role === "soloFounder" ? <Crown size={11} /> : <Users size={11} />}
                      {t(project.role)}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 transition-colors group-hover:bg-accent-500/10 group-hover:text-accent-700 dark:group-hover:text-accent-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-3">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 dark:text-accent-300">
                          <ExternalLink size={12} />
                          {t("visit")}
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
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
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal className="mt-12 p-6 rounded-2xl border border-dashed border-accent-500/30 bg-gradient-to-r from-brand-400/5 to-accent-500/5 text-center">
        <p className="text-gray-500 text-sm">
          {t("morePipeline")}{" "}
          <Link href="/youtube" className="link-draw font-medium text-accent-700 dark:text-accent-300">
            {t("followYouTube")}
          </Link>{" "}
          to watch them get built.
        </p>
      </Reveal>
    </div>
  );
}
