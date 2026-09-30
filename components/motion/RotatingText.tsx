"use client";

// Trimmed-down take on ReactBits RotatingText (via Bedrock): cycles whole phrases with a
// spring blur-slide. The full per-character splitter isn't needed for short role lines.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ENTRANCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { texts: string[]; interval?: number; className?: string };

export default function RotatingText({ texts, interval = 2600, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => window.clearInterval(id);
  }, [texts.length, interval]);

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={ENTRANCE}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
