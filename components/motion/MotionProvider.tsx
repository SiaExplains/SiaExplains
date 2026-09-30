"use client";

import { MotionConfig } from "framer-motion";
import ClickSpark from "./ClickSpark";
import CursorGlow from "./CursorGlow";

/** Site-wide motion defaults: respect the OS reduced-motion setting, add cursor + click effects. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      <ClickSpark />
      {children}
    </MotionConfig>
  );
}
