"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Link2, Mail, Timer, Users } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/SocialIcons";
import ClickSpark from "@/components/motion/ClickSpark";
import { ENTRANCE, MICRO } from "@/lib/motion";
import type { LinkIcon, LinkItem } from "@/lib/links";

const ICONS: Record<LinkIcon, React.ComponentType<{ size?: number; className?: string }>> = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  users: Users,
  timer: Timer,
  globe: Globe,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
  link: Link2,
};

const ICON_TINT: Partial<Record<LinkIcon, string>> = {
  youtube: "from-red-500 to-orange-500",
  instagram: "from-fuchsia-500 via-rose-500 to-amber-400",
  users: "from-emerald-500 to-teal-500",
  timer: "from-teal-600 to-cyan-500",
  globe: "from-brand-400 to-accent-500",
};

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } };
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: ENTRANCE },
};

export default function LinkTree({ links }: { links: LinkItem[] }) {
  return (
    <main className="relative isolate flex min-h-dvh flex-col items-center overflow-hidden px-4 pb-10 pt-12">
      <ClickSpark />

      {/* Ambient background: two slow drifting blobs + a faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-600/35 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-400/25 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="bg-dots absolute inset-x-0 top-0 h-[480px]" />
      </div>

      <div className="w-full max-w-md">
        <motion.header
          className="mb-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={ENTRANCE}
        >
          <motion.div
            className="relative mb-5 h-28 w-28"
            whileHover={{ scale: 1.06, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={MICRO}
          >
            <div className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#f5b82e,#fb923c,#8b5cf6,#a78bfa,#f5b82e)] animate-spin-slow" />
            <div className="absolute -inset-0.5 rounded-full bg-[var(--background)]" />
            <Image
              src="/sia-portrait.webp"
              alt="Siavash Ghanbari"
              fill
              priority
              sizes="112px"
              className="rounded-full object-cover"
            />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            <span className="font-serif text-3xl font-normal italic text-gradient">Siavash</span> Ghanbari
          </h1>
          <p className="mt-1.5 text-sm text-gray-400">Principal Engineer · YouTuber · Builder in Berlin</p>
        </motion.header>

        <motion.ul className="space-y-3" variants={list} initial="hidden" animate="visible">
          {links.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <motion.li key={link.id} variants={item}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 pe-5 backdrop-blur-md transition-colors hover:border-accent-400/50 hover:bg-white/[0.07]"
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={MICRO}
                >
                  {/* Shine sweep on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ICON_TINT[link.icon] ?? "from-gray-600 to-gray-700"} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-white">{link.label}</span>
                    {link.description && (
                      <span className="block truncate text-xs text-gray-400">{link.description}</span>
                    )}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300"
                  />
                </motion.a>
              </motion.li>
            );
          })}
        </motion.ul>

        {links.length === 0 && <p className="text-center text-sm text-gray-500">Links are on their way.</p>}

        <motion.footer
          className="mt-10 text-center text-xs text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a href="https://www.siaexplains.com" target="_blank" rel="noopener noreferrer" className="link-draw hover:text-gray-300">
            siaexplains.com
          </a>
        </motion.footer>
      </div>
    </main>
  );
}
