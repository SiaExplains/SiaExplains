"use client";

// ReactBits CountUp (via Bedrock), reduced to the up-counting integer case this site uses.
// Text is written straight to the DOM node, so the spring never re-renders React.
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type Props = { to: number; from?: number; duration?: number; delay?: number; className?: string };

export default function CountUp({ to, from = 0, duration = 2, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useMotionValue(from);
  const spring = useSpring(value, { damping: 20 + 40 / duration, stiffness: 100 / duration });
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => value.set(to), delay * 1000);
    return () => window.clearTimeout(id);
  }, [inView, value, to, delay]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = Math.round(latest).toString();
      }),
    [spring]
  );

  return (
    <span ref={ref} className={className}>
      {from}
    </span>
  );
}
