"use client";

// A soft gold/violet halo that trails the pointer, plus a ring that grows over anything
// clickable. Mouse-only: touch devices and reduced-motion users never mount the effect.
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const haloX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const haloY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 600, damping: 35 });
  const ringY = useSpring(y, { stiffness: 600, damping: 35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(!!target?.closest("a, button, [role='button'], input, textarea, select, label"));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl dark:opacity-40"
        style={{
          x: haloX,
          y: haloY,
          background: "radial-gradient(circle, rgba(139,92,246,0.22), rgba(245,184,46,0.12) 45%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-500/60 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 44 : 14,
          height: hovering ? 44 : 14,
          backgroundColor: hovering ? "rgba(245,184,46,0.18)" : "rgba(139,92,246,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </>
  );
}
