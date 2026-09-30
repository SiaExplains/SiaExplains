"use client";

// Adapted from ReactBits Magnet (via Bedrock). Springs replace CSS transitions, and the effect
// is off on touch devices, where there is no cursor to follow.
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  className?: string;
  padding?: number;
  strength?: number;
}>;

export default function Magnet({ children, className, padding = 60, strength = 3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const inside =
        Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding;
      x.set(inside ? (e.clientX - cx) / strength : 0);
      y.set(inside ? (e.clientY - cy) / strength : 0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength, x, y]);

  return (
    <motion.div ref={ref} className={cn("inline-block", className)} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
