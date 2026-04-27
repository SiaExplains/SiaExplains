"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineEvent } from "@/types";

const categoryConfig = {
  Education: {
    icon: GraduationCap,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    dot: "bg-sky-500 dark:bg-sky-400",
    glow: "shadow-sky-500/30",
  },
  Career: {
    icon: Briefcase,
    color: "text-brand-600 dark:text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/30",
    dot: "bg-brand-500 dark:bg-brand-400",
    glow: "shadow-brand-500/30",
  },
  Company: {
    icon: Rocket,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    glow: "shadow-emerald-500/30",
  },
  Life: {
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    dot: "bg-rose-500 dark:bg-rose-400",
    glow: "shadow-rose-500/30",
  },
};

function TimelineItem({
  event,
  index,
  isLast,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = categoryConfig[event.category];
  const Icon = cfg.icon;
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-6 md:gap-0">
      {/* Left side (desktop) */}
      <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className={cn(
              "max-w-sm rounded-2xl border p-5 text-right",
              cfg.bg,
              cfg.border
            )}
          >
            <div
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium mb-2",
                cfg.color
              )}
            >
              <Icon size={12} />
              {event.category}
            </div>
            <p className="text-xs text-gray-500 mb-1">{event.year}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1.5">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {event.description}
            </p>
            {event.location && (
              <p className="text-xs text-gray-500 mt-2">📍 {event.location}</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Center dot + line */}
      <div className="relative flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.1, type: "spring", stiffness: 200 }}
          className={cn(
            "w-4 h-4 rounded-full border-2 border-white dark:border-[#0a0a0f] shadow-lg z-10 mt-5",
            cfg.dot,
            cfg.glow,
            "shadow-[0_0_12px_2px]"
          )}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-gray-300/60 dark:from-white/10 to-transparent min-h-[60px]" />
        )}
      </div>

      {/* Right side (desktop) */}
      <div className="hidden md:flex md:w-1/2 md:pl-10">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className={cn(
              "max-w-sm rounded-2xl border p-5",
              cfg.bg,
              cfg.border
            )}
          >
            <div
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium mb-2",
                cfg.color
              )}
            >
              <Icon size={12} />
              {event.category}
            </div>
            <p className="text-xs text-gray-500 mb-1">{event.year}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1.5">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {event.description}
            </p>
            {event.location && (
              <p className="text-xs text-gray-500 mt-2">📍 {event.location}</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Mobile card (always full-width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className={cn(
          "md:hidden flex-1 rounded-2xl border p-4 ml-2",
          cfg.bg,
          cfg.border
        )}
      >
        <div
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium mb-1.5",
            cfg.color
          )}
        >
          <Icon size={12} />
          {event.category}
        </div>
        <p className="text-xs text-gray-500 mb-0.5">{event.year}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
          {event.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {event.description}
        </p>
        {event.location && (
          <p className="text-xs text-gray-500 mt-1.5">📍 {event.location}</p>
        )}
      </motion.div>
    </div>
  );
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      {/* Vertical line (desktop) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300/60 dark:via-white/10 to-transparent" />

      <div className="space-y-8 md:space-y-12">
        {events.map((event, i) => (
          <TimelineItem
            key={`${event.year}-${event.title}`}
            event={event}
            index={i}
            isLast={i === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
