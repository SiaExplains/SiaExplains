import type { Metadata } from "next";
import { Mail, Zap, BookOpen, Wrench } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to SiaExplains — a newsletter for engineers who want to think more clearly about software, career, and technology.",
};

const perks = [
  {
    icon: Zap,
    title: "What I'm building",
    description: "Early access to projects, tools, and experiments before they're public.",
  },
  {
    icon: BookOpen,
    title: "What I'm reading",
    description: "The most interesting papers, articles, and books I encounter each week.",
  },
  {
    icon: Wrench,
    title: "Tools & systems",
    description: "Productivity systems, AI tools, and engineering workflows that actually work.",
  },
  {
    icon: Mail,
    title: "No spam, ever",
    description: "I send when I have something worth saying. Usually once or twice a month.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
          <Mail size={28} className="text-brand-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">The Newsletter</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          A newsletter for engineers who want to think more clearly about
          software, career, and the future of tech. Written by Siavash from
          Berlin, twice a month.
        </p>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {perks.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-white/5 bg-white/2 p-4"
          >
            <Icon size={16} className="text-brand-400 mb-2" />
            <h3 className="font-medium text-white text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Sign up form */}
      <NewsletterForm />
    </div>
  );
}
