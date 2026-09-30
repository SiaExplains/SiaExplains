"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ENTRANCE, SCROLL_ENTER, STAGGER_NORMAL, staggerContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "span" | "section" };

/** Fades + rises its children in once, when scrolled into view. */
export function Reveal({ delay = 0, y = 30, as = "div", children, ...props }: RevealProps) {
  const motionProps = {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { ...ENTRANCE, delay },
  };
  if (as === "section") {
    return (
      <motion.section {...motionProps} className={props.className} style={props.style}>
        {children}
      </motion.section>
    );
  }
  if (as === "span") {
    return (
      <motion.span {...motionProps} className={props.className} style={props.style}>
        {children}
      </motion.span>
    );
  }
  return (
    <motion.div {...motionProps} {...props}>
      {children}
    </motion.div>
  );
}

type RevealGroupProps = HTMLMotionProps<"div"> & { stagger?: number; delay?: number };

/** Parent that staggers any <RevealItem> children in sequence. */
export function RevealGroup({ stagger = STAGGER_NORMAL, delay = 0, children, ...props }: RevealGroupProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={SCROLL_ENTER} {...props}>
      {children}
    </motion.div>
  );
}
