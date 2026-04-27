import type { Metadata } from "next";
import { Users, Play, ExternalLink } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "SiaExplains YouTube channel — tech, AI, productivity, and international career stories.",
};

const playlists = [
  {
    title: "System Design",
    description: "Deep dives into distributed systems, architecture patterns, and real-world engineering decisions.",
    count: 8,
    color: "bg-brand-500/10 border-brand-500/20 text-brand-600 dark:text-brand-400",
  },
  {
    title: "AI Tools for Engineers",
    description: "Honest reviews and walkthroughs of AI tools — what works, what's hype, and how to use them effectively.",
    count: 6,
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "Immigration & International Career",
    description: "The real story of moving from Iran to Berlin through the tech industry. Visas, culture, and building a career abroad.",
    count: 5,
    color: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
  },
  {
    title: "Engineering Productivity",
    description: "Systems, tools, and habits for engineers who want to do their best work without burning out.",
    count: 4,
    color: "bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-400",
  },
];

const recentVideos = [
  {
    title: "How I Design Systems for 10M+ Users (Without Overengineering)",
    thumbnail: null,
    duration: "24:31",
    views: "18K",
    date: "1 week ago",
  },
  {
    title: "Claude vs GPT-4: Which AI Actually Helps Engineers?",
    thumbnail: null,
    duration: "19:45",
    views: "32K",
    date: "2 weeks ago",
  },
  {
    title: "Moving from Iran to Berlin: The Full Story",
    thumbnail: null,
    duration: "38:12",
    views: "55K",
    date: "1 month ago",
  },
  {
    title: "My Productivity System as a Principal Engineer",
    thumbnail: null,
    duration: "21:08",
    views: "24K",
    date: "1 month ago",
  },
];

export default function YoutubePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-16 pb-12 border-b border-gray-200 dark:border-white/5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-rose-500 flex items-center justify-center shrink-0">
          <YoutubeIcon size={36} className="text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SiaExplains</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              Growing fast
            </span>
            <span className="flex items-center gap-1.5">
              <Play size={14} />
              New videos bi-weekly
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-5">
            A YouTube channel for engineers who want depth over hype. Covering
            system design, AI tools, engineering productivity, and the journey
            of building an international tech career.
          </p>
          <a
            href="https://youtube.com/@SiaExplains"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium transition-colors text-sm"
          >
            <YoutubeIcon size={16} />
            Subscribe on YouTube
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Recent videos placeholder */}
      <section className="mb-14">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          Recent videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentVideos.map((video) => (
            <a
              key={video.title}
              href="https://youtube.com/@SiaExplains"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 overflow-hidden hover:border-gray-300 dark:hover:border-white/10 transition-colors"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#1a1a24] dark:to-[#111118] flex items-center justify-center relative">
                <Play size={32} className="text-gray-400 dark:text-white/20 group-hover:text-gray-500 dark:group-hover:text-white/40 transition-colors" />
                <span className="absolute bottom-2 right-2 text-xs bg-black/60 dark:bg-black/80 text-white px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-sm leading-snug mb-2">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {video.views} views · {video.date}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Playlists */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-6">
          Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {playlists.map((pl) => (
            <div
              key={pl.title}
              className={`rounded-2xl border p-5 ${pl.color}`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{pl.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {pl.description}
              </p>
              <p className="text-xs text-gray-500">{pl.count} videos</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
