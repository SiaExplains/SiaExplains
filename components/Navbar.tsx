"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/youtube", label: "YouTube" },
  { href: "/blog", label: "Blog" },
  { href: "/articles", label: "Articles" },
  { href: "/books", label: "Books" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book a Call", highlight: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <span className="text-brand-500">Sia</span>Explains
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label, highlight }) =>
              highlight ? (
                <Link
                  key={href}
                  href={href}
                  className="ml-2 px-4 py-1.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors"
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
                      ? "text-brand-600 dark:text-brand-400 bg-brand-500/10"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  )}
                >
                  {label}
                </Link>
              )
            )}
            <ThemeSwitcher />
          </div>

          {/* Mobile: theme switcher + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
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
                  ? "bg-brand-600 text-white font-medium text-center mt-2"
                  : pathname === href
                  ? "text-brand-600 dark:text-brand-400 bg-brand-500/10"
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
