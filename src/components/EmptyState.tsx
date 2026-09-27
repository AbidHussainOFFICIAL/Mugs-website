"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PillLink, PillButtonElement } from "@/components/PillButton";
import { DURATION, EASE } from "@/lib/motion";

const ARROW_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

export default function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const entranceProps = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      {...entranceProps}
      transition={{ duration: DURATION.base, ease: EASE }}
      className="flex flex-col items-center text-center py-16 sm:py-24 px-4"
    >
      <div className="flex items-center justify-center bg-[#F1BF0A] rounded-full size-16 mb-5">{icon}</div>
      <h2 className="font-anton text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 text-[#5b5f6b] max-w-sm">{description}</p>
      {onCtaClick ? (
        <PillButtonElement onClick={onCtaClick} icon={ARROW_ICON} layout="hug" focusRing="dark" className="mt-6">
          {ctaLabel}
        </PillButtonElement>
      ) : ctaHref ? (
        <PillLink href={ctaHref} icon={ARROW_ICON} layout="hug" focusRing="dark" className="mt-6">
          {ctaLabel}
        </PillLink>
      ) : null}
    </motion.div>
  );
}
