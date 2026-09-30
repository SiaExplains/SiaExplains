"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

// WebGL never renders on the server.
const Aurora = dynamic(() => import("./Aurora"), { ssr: false });

const BLOBS = [
  { className: "left-[-10%] top-[-20%] h-[420px] w-[520px] bg-accent-400/45", x: [0, 60, 0], y: [0, 30, 0], duration: 16 },
  { className: "left-[30%] top-[-30%] h-[380px] w-[480px] bg-brand-300/55", x: [0, -50, 0], y: [0, 40, 0], duration: 19 },
  { className: "right-[-10%] top-[-10%] h-[420px] w-[460px] bg-orange-300/40", x: [0, -40, 0], y: [0, -20, 0], duration: 22 },
];

/**
 * Dark mode: the ReactBits Aurora shader. Light mode: drifting gradient blobs, because the
 * shader's dark falloff reads as a grey smudge on a light background.
 */
export default function AuroraBackground({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      {theme === "dark" ? (
        <Aurora colorStops={["#7c3aed", "#f5b82e", "#8b5cf6"]} amplitude={1.1} blend={0.55} speed={0.6} />
      ) : (
        <div className="relative h-full w-full overflow-hidden">
          {BLOBS.map((b, i) => (
            <motion.div
              key={i}
              className={cn("absolute rounded-full blur-3xl", b.className)}
              animate={{ x: b.x, y: b.y }}
              transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
