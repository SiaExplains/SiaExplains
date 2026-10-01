import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import Image from "next/image";
import { Play, ExternalLink, TrendingUp } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import PageHeader from "@/components/PageHeader";
import Magnet from "@/components/motion/Magnet";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { orderedChannels, type Channel } from "@/lib/channels";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("youtube");
  const channels = orderedChannels(await getLocale());
  return {
    title: `YouTube — ${channels.map((c) => c.name).join(" & ")}`,
    description: t("pageDesc"),
    alternates: await localeAlternates("/youtube"),
  };
}

export default async function YoutubePage() {
  const t = await getTranslations("youtube");
  const channels = orderedChannels(await getLocale());

  const copy: Record<Channel["id"], { badge: string; description: string }> = {
    siaexplains: { badge: t("langBadge"), description: t("channelDesc") },
    siabarry: { badge: t("siaBarryBadge"), description: t("siaBarryDesc") },
  };

  const topics = [
    { emoji: "🇩🇪", title: t("immigrationTitle"), description: t("immigrationDesc") },
    { emoji: "💼", title: t("careerTitle"), description: t("careerDesc") },
    { emoji: "🤖", title: t("aiTitle"), description: t("aiDesc") },
    { emoji: "💰", title: t("financeTitle"), description: t("financeDesc") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader label="YouTube" title={t("pageTitle")} description={t("pageDesc")} />

      {channels.map((channel) => (
        <section key={channel.id} id={channel.id} className="mb-16 pb-12 border-b border-gray-200 dark:border-white/5 scroll-mt-24">
          {/* Channel header */}
          <Reveal className="flex flex-col md:flex-row gap-8 items-start mb-10">
            <div className="animate-float w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 via-brand-500 to-accent-600 flex items-center justify-center shrink-0 shadow-[0_18px_40px_-14px_rgba(139,92,246,0.6)]">
              <YoutubeIcon size={36} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{channel.name}</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
                  {copy[channel.id].badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500" dir="ltr">
                  {channel.handle}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-5">{copy[channel.id].description}</p>
              <Magnet>
                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <YoutubeIcon size={16} />
                  {t("subscribe")}
                  <ExternalLink size={12} />
                </a>
              </Magnet>
            </div>
          </Reveal>

          {/* Videos */}
          <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-6">
            {t("featuredVideos")}
          </p>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channel.videos.map((video) => (
              <RevealItem key={video.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive group block overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-200 dark:bg-white/5">
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.titleEn ?? video.title}
                      fill
                      className="img-hover object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/0 to-black/0 group-hover:from-accent-900/50 group-hover:to-black/10 transition-colors duration-500">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                        <Play size={22} className="text-accent-700 ms-1" fill="currentColor" />
                      </div>
                    </div>
                    {video.topPick && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-xs bg-brand-400 text-brand-900 font-semibold px-2 py-0.5 rounded-full">
                        <TrendingUp size={10} />
                        {t("mostViewed")}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p
                      className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-0.5 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors"
                      dir={channel.lang === "fa" ? "rtl" : "ltr"}
                    >
                      {video.title}
                    </p>
                    {video.titleEn && <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{video.titleEn}</p>}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">{video.views} views · {video.date}</p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-6 text-center">
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-2 text-sm font-medium text-accent-700 dark:text-accent-300"
            >
              {t("viewAll")} · {channel.name}
              <ExternalLink size={13} />
            </a>
          </div>
        </section>
      ))}

      {/* Topics */}
      <section>
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-6">
          {t("whatICover")}
        </p>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <RevealItem key={topic.title}>
              <SpotlightCard className="group h-full p-5">
                <span className="text-2xl mb-3 block transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12 origin-bottom-left">{topic.emoji}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{topic.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{topic.description}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <Reveal className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-brand-400/15 via-orange-400/10 to-accent-500/15 border border-accent-500/20 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{t("ctaText")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {channels.map((channel) => (
            <Magnet key={channel.id}>
              <a href={channel.url} target="_blank" rel="noopener noreferrer" className="btn btn-violet">
                <YoutubeIcon size={15} />
                {channel.name}
              </a>
            </Magnet>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
