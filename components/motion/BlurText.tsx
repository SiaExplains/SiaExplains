"use client";

// Adapted from ReactBits BlurText (via Bedrock): renders any heading tag, and uses
// motion's whileInView instead of a hand-rolled IntersectionObserver.
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  /** ms between words */
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
};

export default function BlurText({
  text,
  as = "p",
  className,
  delay = 70,
  animateBy = "words",
  direction = "bottom",
}: Props) {
  const Comp = motion[as];
  const segments = animateBy === "words" ? text.split(" ") : Array.from(text);
  const fromY = direction === "top" ? -30 : 30;

  return (
    <Comp
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Screen readers get the whole string once, not a word-by-word stutter. */}
      <span className="sr-only">{text}</span>
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-[transform,filter,opacity]"
          variants={{
            hidden: { filter: "blur(10px)", opacity: 0, y: fromY },
            visible: {
              filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
              opacity: [0, 0.5, 1],
              y: [fromY, fromY / -6, 0],
              transition: { duration: 0.7, times: [0, 0.5, 1], delay: (i * delay) / 1000 },
            },
          }}
        >
          {segment === " " ? " " : segment}
          {animateBy === "words" && i < segments.length - 1 && " "}
        </motion.span>
      ))}
    </Comp>
  );
}
