"use client";

// Adapted from ReactBits TiltedCard (via Bedrock): takes children instead of a bare <img>,
// so it can wrap next/image, and the "not optimised for mobile" banner is dropped.
import { useRef } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

const spring: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

type Props = React.PropsWithChildren<{
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  overlay?: React.ReactNode;
}>;

export default function TiltedCard({
  children,
  className,
  rotateAmplitude = 12,
  scaleOnHover = 1.04,
  overlay,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const reset = () => {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn("[perspective:900px]", className)}
      onMouseMove={onMove}
      onMouseEnter={() => scale.set(scaleOnHover)}
      onMouseLeave={reset}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
        {overlay && (
          <div className="absolute inset-0 [transform:translateZ(40px)] pointer-events-none">{overlay}</div>
        )}
      </motion.div>
    </div>
  );
}
