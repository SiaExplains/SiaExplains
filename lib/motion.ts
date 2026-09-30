// Motion tokens (Bedrock design-tokens). Springs, not durations: they feel alive instead of robotic.
import type { Transition, Variants } from "framer-motion";

export const MICRO: Transition = { type: "spring", stiffness: 400, damping: 30 };
export const ENTRANCE: Transition = { type: "spring", stiffness: 200, damping: 25 };
export const AMBIENT: Transition = { type: "spring", stiffness: 100, damping: 20 };

export const STAGGER_FAST = 0.04;
export const STAGGER_NORMAL = 0.08;
export const STAGGER_SLOW = 0.15;

export const SCROLL_ENTER: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: ENTRANCE },
};

export const staggerContainer = (stagger = STAGGER_NORMAL, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
