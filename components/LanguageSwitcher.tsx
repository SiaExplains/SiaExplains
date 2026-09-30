"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MICRO } from "@/lib/motion";

const locales = [
  { code: "en", flag: "🇬🇧", label: "English", short: "EN" },
  { code: "fa", flag: "🇮🇷", label: "فارسی", short: "FA" },
  { code: "de", flag: "🇩🇪", label: "Deutsch", short: "DE" },
] as const;

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="hidden sm:inline text-xs font-medium">{current.short}</span>
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={MICRO}
          className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1 w-36 origin-top rounded-xl border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-surface-900/95 backdrop-blur-xl shadow-[0_18px_40px_-16px_rgba(139,92,246,0.45)] z-50 overflow-hidden">
          {locales.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all text-start hover:ps-4",
                code === locale
                  ? "text-accent-700 dark:text-accent-300 bg-accent-500/10"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              )}
            >
              <span>{flag}</span>
              <span>{label}</span>
              {code === locale && (
                <span className="ms-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-500" />
              )}
            </button>
          ))}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
