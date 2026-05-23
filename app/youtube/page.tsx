import type { Metadata } from "next";
import Image from "next/image";
import { Play, ExternalLink, TrendingUp } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "SiaExplains YouTube channel — immigration to Germany, tech career lessons, AI tools, and life as a software engineer in Berlin. Videos in Persian (Farsi).",
};

const videos = [
  {
    id: "oGQxFNgn6BY",
    title: "پنج سال زندگی در آلمان",
    titleEn: "Five Years Living in Germany",
    views: "40K",
    date: "Apr 2025",
    topPick: true,
  },
  {
    id: "BwWjT-IKZWU",
    title: "چطور شهروندی آلمان رو گرفتم؟",
    titleEn: "How I Got German Citizenship",
    views: "10K",
    date: "Sep 2025",
    topPick: false,
  },
  {
    id: "pO4iPZNygNI",
    title: "شهروندی آلمان، اخراج‌ها و عمل جراحی",
    titleEn: "German Citizenship, Layoffs & Surgery",
    views: "6.7K",
    date: "Aug 2025",
    topPick: false,
  },
  {
    id: "WmshwR6kIzo",
    title: "خلاصه ۱۷ سال تجربه من در ۱۴ نکته",
    titleEn: "17 Years of Experience: 14 Key Lessons",
    views: "6.4K",
    date: "Oct 2025",
    topPick: false,
  },
  {
    id: "Qq3JshLIJ-U",
    title: "۴ باور غلط درباره مهاجرت",
    titleEn: "4 Wrong Beliefs About Immigration",
    views: "6.4K",
    date: "May 2025",
    topPick: false,
  },
  {
    id: "qg9UakuAJm0",
    title: "صدای مردم ایران در برلین",
    titleEn: "Voice of Iranians in Berlin",
    views: "4.6K",
    date: "Jan 2026",
    topPick: false,
  },
  {
    id: "ux8V6ESAI4Y",
    title: "هفت مدرک مربوط به هوش مصنوعی",
    titleEn: "7 AI Certifications Worth Getting",
    views: "3.3K",
    date: "Mar 2025",
    topPick: false,
  },
  {
    id: "DPkxSF_IF_s",
    title: "داستان من از درآمدزایی از یوتوب",
    titleEn: "My YouTube Monetization Story",
    views: "767",
    date: "Nov 2025",
    topPick: false,
  },
];

const topics = [
  {
    emoji: "🇩🇪",
    title: "Immigration & Life in Germany",
    description:
      "The real story of moving from Iran to Berlin — visas, German citizenship, housing, banking, and how to actually build a life abroad.",
  },
  {
    emoji: "💼",
    title: "Career & Engineering Growth",
    description:
      "Lessons from 17+ years in software engineering across Tehran, Sydney, and Berlin — from junior dev to Principal Engineer and manager.",
  },
  {
    emoji: "🤖",
    title: "AI & Tech Tools",
    description:
      "Honest walkthroughs of AI certifications, tools, and what actually helps engineers in day-to-day work versus what's just hype.",
  },
  {
    emoji: "💰",
    title: "Finance & Expat Tips",
    description:
      "Practical money advice for immigrants and expats in Germany — banks, taxes, savings, and navigating the German financial system.",
  },
];

export default function YoutubePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-16 pb-12 border-b border-gray-200 dark:border-white/5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shrink-0">
          <YoutubeIcon size={36} className="text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SiaExplains
          </h1>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
              🇮🇷 Videos in Persian (Farsi)
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500">
              <Play size={10} />
              New videos regularly
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-5">
            A Persian-language channel for Iranians navigating tech careers,
            immigration to Germany, and life as an expat engineer. Real stories,
            real numbers — no fluff.
          </p>
          <a
            href="https://youtube.com/@SiaExplains"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-900 font-medium transition-colors text-sm"
          >
            <YoutubeIcon size={16} />
            Subscribe on YouTube
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Videos */}
      <section className="mb-14">
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-6">
          Featured videos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 overflow-hidden hover:border-brand-400/40 dark:hover:border-brand-400/20 transition-colors"
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden bg-gray-200 dark:bg-white/5">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Most viewed badge */}
                {video.topPick && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-xs bg-brand-400 text-brand-900 font-semibold px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    Most Viewed
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-0.5 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors" dir="rtl">
                  {video.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {video.titleEn}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600">
                  {video.views} views · {video.date}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://youtube.com/@SiaExplains"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent-600 dark:text-accent-300 hover:text-accent-500 dark:hover:text-accent-200 transition-colors"
          >
            View all videos on YouTube
            <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {/* Topics */}
      <section>
        <p className="text-accent-600 dark:text-accent-300 text-sm font-medium tracking-wide uppercase mb-6">
          What I cover
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-5 hover:border-gray-300 dark:hover:border-white/10 transition-colors"
            >
              <span className="text-2xl mb-3 block">{topic.emoji}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 p-6 rounded-2xl bg-brand-400/10 border border-brand-400/20 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          If you&apos;re an Iranian engineer thinking about moving abroad or growing
          your tech career — this channel is for you.
        </p>
        <a
          href="https://youtube.com/@SiaExplains"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-900 font-medium text-sm transition-colors"
        >
          <YoutubeIcon size={15} />
          Follow the journey
        </a>
      </div>
    </div>
  );
}
