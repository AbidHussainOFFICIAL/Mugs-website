"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VIEWPORT, fadeRise } from "@/lib/motion";

// Fades and lifts its content in once, the first time it scrolls into view,
// using the site's shared tokens (fadeRise, VIEWPORT) so it moves exactly like
// the landing page's sections. People who ask for reduced motion get the
// content as it is, with no animation at all.
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={fadeRise} initial="hidden" whileInView="visible" viewport={VIEWPORT} className={className}>
      {children}
    </motion.div>
  );
}
