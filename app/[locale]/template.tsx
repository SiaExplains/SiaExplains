"use client";

import { motion } from "framer-motion";
import { ENTRANCE } from "@/lib/motion";

// template.tsx remounts on every navigation, which gives each page an entrance transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={ENTRANCE}
    >
      {children}
    </motion.div>
  );
}
