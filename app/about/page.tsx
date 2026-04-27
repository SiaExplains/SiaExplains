import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Code2, Globe } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Siavash — Principal Software Engineer & YouTuber based in Berlin, originally from Iran.",
};

const facts = [
  { icon: MapPin, label: "Location", value: "Berlin, Germany" },
  { icon: Code2, label: "Role", value: "Principal Software Engineer & Tech Lead" },
  { icon: YoutubeIcon, label: "YouTube", value: "SiaExplains" },
  { icon: Globe, label: "Originally from", value: "Tehran, Iran" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand-500 dark:text-brand-400 text-sm font-medium tracking-wide uppercase mb-3">
          About me
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Engineer. Creator. Builder.
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
          I&apos;m Siavash — a software engineer with over a decade of experience
          building systems that scale, teams that ship, and products that matter.
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {facts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4"
          >
            <Icon size={16} className="text-brand-500 dark:text-brand-400 mb-2" />
            <p className="text-xs text-gray-500 dark:text-gray-600 mb-1">{label}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="prose-custom space-y-10">
        {/* Origin story */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            The origin story
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I grew up in Tehran, Iran, where I fell in love with computers as a
              teenager — taking apart hardware, learning to code, and spending more
              time on forums than I probably should have.
            </p>
            <p>
              I studied Computer Engineering and quickly found my passion in
              building distributed systems. After several years working in the
              Iranian tech ecosystem — which is more vibrant than most people
              realize — I made the decision to pursue my career internationally.
            </p>
            <p>
              That journey eventually brought me to Berlin, a city that matched
              my energy perfectly: pragmatic, international, and serious about
              engineering.
            </p>
          </div>
        </section>

        {/* Engineering */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            The engineering chapter
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Over the past decade, I&apos;ve worked across fintech, e-commerce, and
              SaaS — building everything from payment infrastructure to real-time
              collaboration tools to data pipelines that process billions of events.
            </p>
            <p>
              As a Principal Engineer and Tech Lead, I spend my time at the
              intersection of technical strategy and execution. I write code,
              review systems, mentor engineers, and work closely with product and
              business to make sure technology decisions align with long-term goals.
            </p>
            <p>
              I care deeply about clean architecture, pragmatic technical decisions,
              and building engineering cultures where people do their best work.
            </p>
          </div>
        </section>

        {/* YouTube */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Why SiaExplains?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I started SiaExplains because I wanted to create the content I
              wished existed when I was earlier in my career. Content that respects
              your intelligence, gives you the &ldquo;why&rdquo; not just the &ldquo;how&rdquo;,
              and is honest about the messy realities of a tech career.
            </p>
            <p>
              The channel covers system design, AI tools, productivity systems for
              engineers, and the immigration journey through tech — topics that are
              underserved by the typical tutorial-factory content.
            </p>
          </div>
        </section>

        {/* Personal */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Outside the terminal
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              When I&apos;m not building software, I&apos;m probably reading, doing strength
              training, or exploring Berlin&apos;s surprisingly great coffee scene. I&apos;m
              also an avid reader — fiction and non-fiction alike.
            </p>
            <p>
              I speak Persian (Farsi), English, and enough German to survive a
              Berliner bureaucracy encounter.
            </p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-14 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-wrap gap-4">
        <Link
          href="/timeline"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors text-sm"
        >
          See my timeline <ArrowRight size={14} />
        </Link>
        <Link
          href="/cv"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
        >
          View CV
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
