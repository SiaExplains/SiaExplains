import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Calendar } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const highlights = [
  {
    icon: Layers,
    title: "Principal Engineer",
    description:
      "10+ years building distributed systems, leading engineering teams, and shipping products at scale in Berlin's tech scene.",
    href: "/cv",
    color: "text-brand-500 dark:text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
  },
  {
    icon: YoutubeIcon,
    title: "SiaExplains YouTube",
    description:
      "A channel covering tech, AI, productivity, and immigration — for engineers who want depth over hype.",
    href: "/youtube",
    color: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: BookOpen,
    title: "Writing & Articles",
    description:
      "Long-form technical writing on system design, engineering leadership, and building software that lasts.",
    href: "/articles",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Calendar,
    title: "Book a Call",
    description:
      "30-minute sessions for career advice, code review, or just talking shop with a senior engineer.",
    href: "/book",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts("blog").slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400 animate-pulse" />
            Based in Berlin · Open to new projects
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600 bg-clip-text text-transparent">
              Siavash
            </span>
            .
            <br />
            I build software &amp;
            <br />
            explain things.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Principal Software Engineer & Tech Lead in Berlin. Originally from Iran.
            I run{" "}
            <Link
              href="/youtube"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
            >
              SiaExplains
            </Link>{" "}
            on YouTube — covering tech, AI, productivity, and the journey of
            building a career internationally.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors inline-flex items-center gap-2"
            >
              About me <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors"
            >
              See my work
            </Link>
            <a
              href="https://youtube.com/@SiaExplains"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors inline-flex items-center gap-2"
            >
              <YoutubeIcon size={16} className="text-rose-500 dark:text-rose-400" />
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="pb-20">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-8">
          What I do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map(({ icon: Icon, title, description, href, color, bg, border }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-2xl border p-6 transition-all hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-0.5 ${bg} ${border}`}
            >
              <div className={`inline-flex p-2 rounded-lg ${bg} mb-4`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {description}
              </p>
              <span className={`text-xs font-medium ${color} inline-flex items-center gap-1 group-hover:gap-2 transition-all`}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600">
              Recent writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 inline-flex items-center gap-1 transition-colors"
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-px">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {post.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-500 dark:text-gray-600">{formatDate(post.date)}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-700 mt-0.5">{post.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
