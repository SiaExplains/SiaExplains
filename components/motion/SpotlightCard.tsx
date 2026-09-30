"use client";

// Adapted from ReactBits SpotlightCard (via Bedrock): the spotlight follows the cursor through
// motion values instead of React state, so moving the mouse never re-renders the card.
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  className?: string;
  spotlightColor?: string;
  interactive?: boolean;
}>;

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "var(--spotlight)",
  interactive = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      onFocus={() => opacity.set(1)}
      onBlur={() => opacity.set(0)}
      className={cn("card overflow-hidden", interactive && "card-interactive", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity, background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
