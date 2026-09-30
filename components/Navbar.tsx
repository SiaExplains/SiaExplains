"use client";

import { usePathname } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTRANCE, MICRO, STAGGER_FAST } from "@/lib/motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Magnet from "@/components/motion/Magnet";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/timeline", label: t("timeline") },
    { href: "/cv", label: t("cv") },
    { href: "/projects", label: t("projects") },
    { href: "/youtube", label: t("youtube") },
    { href: "/blog", label: t("blog") },
    { href: "/articles", label: t("articles") },
    { href: "/books", label: t("books") },
    { href: "/contact", label: t("contact") },
  ];
  const cta = { href: "/book", label: t("bookCall") };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // The pill follows the hovered link, and rests on the active one otherwise.
  const pillTarget = hovered ?? navLinks.find((l) => isActive(l.href))?.href ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled ? "backdrop-blur-xl border-b shadow-[0_8px_30px_-12px_rgba(139,92,246,0.25)]" : "bg-transparent"
      )}
      style={scrolled ? { backgroundColor: "var(--nav-bg)", borderColor: "var(--border-subtle)" } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" dir="ltr" className="group relative whitespace-nowrap text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            <motion.span
              className="inline-block text-brand-600 dark:text-brand-400"
              whileHover={{ rotate: -6, scale: 1.08 }}
              transition={MICRO}
            >
              Sia
            </motion.span>
            <span className="transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-300">Explains</span>
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-500 transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                className={cn(
                  "relative px-3 py-1.5 rounded-full text-sm transition-colors",
                  isActive(href)
                    ? "text-accent-700 dark:text-accent-200"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {pillTarget === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full",
                      isActive(href)
                        ? "bg-accent-500/12 ring-1 ring-accent-500/25"
                        : "bg-gray-900/5 dark:bg-white/7"
                    )}
                    transition={MICRO}
                  />
                )}
                {label}
              </Link>
            ))}
            <Magnet padding={30} strength={4} className="ml-2">
              <Link href={cta.href} className="btn btn-primary !py-1.5 !px-4">
                {cta.label}
              </Link>
            </Magnet>
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200 dark:border-white/10">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  className="block"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={MICRO}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rtl:origin-right bg-gradient-to-r from-brand-400 via-orange-400 to-accent-500"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={ENTRANCE}
          >
            <motion.div
              className="backdrop-blur-xl border-b px-4 py-3 space-y-1"
              style={{ backgroundColor: "var(--nav-mobile-bg)", borderColor: "var(--border-subtle)" }}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: STAGGER_FAST } } }}
            >
              {[...navLinks, { ...cta, highlight: true }].map(({ href, label, ...rest }) => {
                const highlight = "highlight" in rest;
                return (
                  <motion.div
                    key={href}
                    variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: MICRO } }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        "block px-4 py-2.5 rounded-xl text-sm transition-colors",
                        highlight
                          ? "btn btn-primary w-full justify-center mt-2 font-semibold"
                          : isActive(href)
                          ? "text-accent-700 dark:text-accent-200 bg-accent-500/10"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
