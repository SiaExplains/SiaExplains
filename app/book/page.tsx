import type { Metadata } from "next";
import { Calendar, Clock, MessageSquare, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a 30-minute call with Siavash — for career advice, technical mentoring, or collaboration.",
};

const sessionTypes = [
  {
    icon: MessageSquare,
    title: "Career Advice",
    duration: "30 min",
    description:
      "Career decisions, international job search, transitioning to senior/principal roles, or navigating immigration through tech.",
    color: "text-brand-600 dark:text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
  },
  {
    icon: Video,
    title: "Code / Architecture Review",
    duration: "45 min",
    description:
      "Walk me through your system design, codebase, or architecture decisions. I'll give honest, senior-level feedback.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Clock,
    title: "Open Session",
    duration: "30 min",
    description:
      "No agenda required. Come with questions, problems, or ideas. Good for a second opinion on anything technical.",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
];

export default function BookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
          <Calendar size={28} className="text-brand-600 dark:text-brand-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Book a Call</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          I set aside time each week for 1:1 sessions. Whether you&apos;re navigating
          a career decision, building something interesting, or just want a fresh
          set of eyes — let&apos;s talk.
        </p>
      </div>

      {/* Session types */}
      <div className="space-y-4 mb-10">
        {sessionTypes.map(({ icon: Icon, title, duration, description, color, bg, border }) => (
          <div
            key={title}
            className={`rounded-2xl border p-5 ${bg} ${border}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${bg} shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <span className={`text-xs font-medium ${color}`}>
                    {duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendly placeholder */}
      <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Pick a time</h2>
          <p className="text-sm text-gray-500">
            All sessions are conducted via Google Meet or Zoom.
          </p>
        </div>

        {/* Calendly embed placeholder */}
        <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-100 dark:bg-[#111118] p-8 text-center">
          <Calendar size={40} className="text-gray-400 dark:text-gray-700 mb-4" />
          <p className="text-gray-500 text-sm mb-2">Calendly booking widget</p>
          <p className="text-gray-400 dark:text-gray-700 text-xs max-w-xs">
            Calendly embed will appear here once configured. In the meantime,
            reach out via email or LinkedIn to schedule.
          </p>
          <a
            href="mailto:siaexplains@gmail.com?subject=Book a Call"
            className="mt-5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors"
          >
            Email to schedule
          </a>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-xl border border-gray-200 dark:border-white/5 text-sm text-gray-500 space-y-1.5">
        <p>⏰ Sessions run in CET (Berlin time). I accommodate other timezones when possible.</p>
        <p>🎥 All sessions are confidential — I don&apos;t record without permission.</p>
        <p>💬 Please come prepared with a specific question or topic to make the most of our time.</p>
      </div>
    </div>
  );
}
