"use client";

import { usePathname } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { href: "/book", label: t("bookCall"), highlight: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md border-b shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
      )}
      style={scrolled ? { backgroundColor: "var(--nav-bg)", borderColor: "var(--border-subtle)" } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-gray-900 dark:text-white font-semibold text-lg tracking-tight hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <span className="text-brand-700 dark:text-brand-400">Sia</span>Explains
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label, highlight }) =>
              highlight ? (
                <Link
                  key={href}
                  href={href}
                  className="ml-2 px-4 py-1.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-900 text-sm font-medium transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm transition-colors",
                    pathname === href
                      ? "text-brand-700 dark:text-brand-400 bg-brand-400/10"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  )}
                >
                  {label}
                </Link>
              )
            )}
            <div className="flex items-center gap-1 ml-1 pl-1 border-l border-gray-200 dark:border-white/10">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile: language + theme + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className="backdrop-blur-md border-b px-4 py-3 space-y-1"
          style={{ backgroundColor: "var(--nav-mobile-bg)", borderColor: "var(--border-subtle)" }}
        >
          {navLinks.map(({ href, label, highlight }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                highlight
                  ? "bg-brand-400 text-brand-900 font-semibold text-center mt-2"
                  : pathname === href
                  ? "text-brand-700 dark:text-brand-400 bg-brand-400/10"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
