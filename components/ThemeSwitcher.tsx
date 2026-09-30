"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { MICRO } from "@/lib/motion";

export default function ThemeSwitcher() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85, rotate: 20 }}
      transition={MICRO}
      className="p-2 rounded-full transition-colors text-gray-500 hover:text-brand-600 hover:bg-brand-400/10 dark:text-gray-400 dark:hover:text-brand-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="block"
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={MICRO}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
