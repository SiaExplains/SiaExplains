import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { ArrowRight, ArrowUpRight, BookOpen, Layers, Calendar, MapPin } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import { getBlogPosts } from "@/lib/posts";
import { formatDate, cn } from "@/lib/utils";
import AuroraBackground from "@/components/motion/AuroraBackground";
import BlurText from "@/components/motion/BlurText";
import CountUp from "@/components/motion/CountUp";
import Magnet from "@/components/motion/Magnet";
import RotatingText from "@/components/motion/RotatingText";
import SpotlightCard from "@/components/motion/SpotlightCard";
import TiltedCard from "@/components/motion/TiltedCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: await localeAlternates("/") };
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const recentPosts = (await getBlogPosts()).slice(0, 3);
  const roles = t.raw("heroRoles") as string[];

  const highlights = [
    { icon: Layers, title: t("highlightEngineerTitle"), description: t("highlightEngineerDesc"), href: "/cv" as const, wide: true },
    { icon: YoutubeIcon, title: t("highlightYoutubeTitle"), description: t("highlightYoutubeDesc"), href: "/youtube" as const },
    { icon: BookOpen, title: t("highlightWritingTitle"), description: t("highlightWritingDesc"), href: "/articles" as const },
    { icon: Calendar, title: t("highlightBookTitle"), description: t("highlightBookDesc"), href: "/book" as const, wide: true },
  ];

  const stats = [
    { value: 17, suffix: "+", label: t("statYears") },
    { value: 25, suffix: "+", label: t("statProjects") },
    { value: 3, suffix: "", label: t("statCountries") },
  ];

  return (
    <>
      {/* Hero — the one dramatic moment on the page */}
      <section className="relative isolate overflow-hidden">
        <AuroraBackground className="absolute inset-x-0 top-0 -z-10 h-[560px] dark:opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Reveal y={12}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-brand-400/30 backdrop-blur text-brand-700 dark:text-brand-300 text-sm mb-7">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
                  </span>
                  {t("badge")}
                </div>
              </Reveal>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                <BlurText as="span" text={t("heroGreeting")} className="me-3 inline-flex" />
                <Reveal as="span" delay={0.25} className="inline-block">
                  <span className="font-serif italic font-normal text-gradient pe-1">Siavash</span>
                  <span>.</span>
                </Reveal>
                <BlurText as="span" text={t("heroLine1")} delay={60} className="mt-1" />
                <BlurText as="span" text={t("heroLine2")} delay={60} className="text-gray-500 dark:text-gray-400" />
              </h1>

              <Reveal delay={0.35}>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-3 flex flex-wrap items-baseline gap-x-2">
                  <span>{t("heroRolesPrefix")}</span>
                  <RotatingText texts={roles} className="font-semibold text-accent-700 dark:text-accent-300" />
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-9 max-w-2xl">
                  {t("heroParagraph")}
                </p>
              </Reveal>

              <Reveal delay={0.45} className="flex flex-wrap gap-3">
                <Magnet>
                  <Link href="/about" className="btn btn-primary">
                    {t("ctaAbout")} <ArrowRight size={16} className="rtl:rotate-180" />
                  </Link>
                </Magnet>
                <Magnet>
                  <Link href="/projects" className="btn btn-ghost">
                    {t("ctaProjects")}
                  </Link>
                </Magnet>
                <Magnet>
                  <a href="https://youtube.com/@SiaExplains" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <YoutubeIcon size={16} className="text-red-500" />
                    YouTube
                  </a>
                </Magnet>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={40} className="relative mx-auto w-full max-w-[420px]">
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand-400/40 via-orange-400/20 to-accent-500/40 blur-2xl animate-float" />
              <div aria-hidden className="absolute -inset-3 rounded-[2.2rem] border border-dashed border-accent-500/30 animate-spin-slow" />
              <TiltedCard
                className="relative aspect-square"
                overlay={
                  <div className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 dark:bg-surface-900/85 backdrop-blur px-3 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-100 shadow-lg">
                    <MapPin size={12} className="text-accent-600 dark:text-accent-300" /> Berlin
                  </div>
                }
              >
                <Image
                  src="/sia-portrait.webp"
                  alt={t("portraitAlt")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="rounded-[2rem] object-cover shadow-[0_30px_80px_-30px_rgba(139,92,246,0.6)] ring-1 ring-white/40 dark:ring-white/10"
                />
              </TiltedCard>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats — compact band */}
        <RevealGroup className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-200 dark:bg-white/5 mb-20 md:mb-28">
          {stats.map(({ value, suffix, label }) => (
            <RevealItem key={label} className="bg-[var(--background)] px-4 py-6 sm:py-8 text-center">
              <p className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                <CountUp to={value} />
                <span className="text-gradient">{suffix}</span>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">{label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Highlights — bento */}
        <section className="pb-24 md:pb-32">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-brand-400 to-accent-500" />
              {t("whatIDo")}
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {highlights.map(({ icon: Icon, title, description, href, wide }) => (
              <RevealItem key={href} className={cn(wide ? "md:col-span-3" : "md:col-span-2")}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="h-full p-7">
                    <div className="flex items-start justify-between mb-8">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-brand-400/20 to-accent-500/20 ring-1 ring-accent-500/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon size={22} className="text-accent-700 dark:text-accent-300" />
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-400 transition-all duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{description}</p>
                    <span className="text-xs font-medium text-brand-700 dark:text-brand-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("learnMore")} <ArrowRight size={12} className="rtl:rotate-180" />
                    </span>
                  </SpotlightCard>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Recent posts — tighter */}
        {recentPosts.length > 0 && (
          <section className="pb-20 md:pb-24">
            <Reveal className="flex items-center justify-between mb-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-brand-400 to-accent-500" />
                {t("recentWriting")}
              </h2>
              <Link href="/blog" className="link-draw text-sm text-accent-700 dark:text-accent-300 inline-flex items-center gap-1">
                {t("allPosts")} <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </Reveal>
            <RevealGroup className="divide-y divide-gray-200 dark:divide-white/5 border-y border-gray-200 dark:border-white/5">
              {recentPosts.map((post, i) => (
                <RevealItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex items-center justify-between gap-6 py-6 ps-0 transition-[padding] duration-300 hover:ps-4"
                  >
                    <span aria-hidden className="absolute inset-y-3 start-0 w-0.5 origin-top scale-y-0 rounded-full bg-gradient-to-b from-brand-400 to-accent-500 transition-transform duration-300 group-hover:scale-y-100" />
                    <div className="flex items-start gap-5">
                      <span className="hidden sm:block font-serif italic text-2xl text-gray-300 dark:text-gray-700 transition-colors group-hover:text-accent-500">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-accent-700 dark:group-hover:text-accent-200 transition-colors mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.description}</p>
                      </div>
                    </div>
                    <div className="text-end shrink-0">
                      <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{post.readingTime}</p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        )}
      </div>
    </>
  );
}
