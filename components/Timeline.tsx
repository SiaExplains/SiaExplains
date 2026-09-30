"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, Heart, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineEvent } from "@/types";

const categoryConfig = {
  Education: {
    icon: GraduationCap,
    color: "text-accent-700 dark:text-accent-300",
    bg: "bg-accent-500/[0.06]",
    border: "border-accent-500/20",
    dot: "bg-accent-400",
    glow: "shadow-accent-500/40",
  },
  Career: {
    icon: Briefcase,
    color: "text-brand-700 dark:text-brand-300",
    bg: "bg-brand-400/[0.08]",
    border: "border-brand-400/25",
    dot: "bg-brand-400",
    glow: "shadow-brand-500/40",
  },
  Company: {
    icon: Rocket,
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-400/[0.07]",
    border: "border-orange-400/25",
    dot: "bg-orange-400",
    glow: "shadow-orange-500/40",
  },
  Life: {
    icon: Heart,
    color: "text-accent-700 dark:text-accent-300",
    bg: "bg-accent-600/[0.06]",
    border: "border-accent-600/20",
    dot: "bg-accent-600",
    glow: "shadow-accent-600/40",
  },
};

function EventLink({ url, label, className }: { url: string; label: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "link-draw inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 dark:text-accent-300",
        className
      )}
    >
      <ExternalLink size={12} />
      {label}
    </a>
  );
}

function TimelineItem({
  event,
  index,
  isLast,
  categoryLabels,
  visitLabel,
}: {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
  categoryLabels?: Record<string, string>;
  visitLabel: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = categoryConfig[event.category];
  const Icon = cfg.icon;
  const isLeft = index % 2 === 0;
  const categoryLabel = categoryLabels?.[event.category] ?? event.category;

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
              "max-w-sm rounded-2xl border p-5 text-right transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(139,92,246,0.5)]",
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
              {categoryLabel}
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
            {event.url && (
              <EventLink url={event.url} label={visitLabel} className="mt-2" />
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
            "w-4 h-4 rounded-full border-2 border-white dark:border-surface-950 shadow-lg z-10 mt-5",
            cfg.dot,
            cfg.glow,
            "shadow-[0_0_12px_2px]"
          )}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-accent-500/40 to-transparent min-h-[60px]" />
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
              "max-w-sm rounded-2xl border p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(139,92,246,0.5)]",
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
              {categoryLabel}
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
            {event.url && (
              <EventLink url={event.url} label={visitLabel} className="mt-2" />
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
        {event.url && (
          <EventLink url={event.url} label={visitLabel} className="mt-1.5" />
        )}
      </motion.div>
    </div>
  );
}

export default function Timeline({
  events,
  categoryLabels,
  visitLabel,
}: {
  events: TimelineEvent[];
  categoryLabels?: Record<string, string>;
  visitLabel: string;
}) {
  return (
    <div className="relative">
      {/* Vertical line (desktop) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-500/30 to-transparent" />

      <div className="space-y-8 md:space-y-12">
        {events.map((event, i) => (
          <TimelineItem
            key={`${event.year}-${event.title}`}
            event={event}
            index={i}
            isLast={i === events.length - 1}
            categoryLabels={categoryLabels}
            visitLabel={visitLabel}
          />
        ))}
      </div>
    </div>
  );
}
