"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PillLink } from "@/components/PillButton";
import { fadeRise, VIEWPORT } from "@/lib/motion";

const EXPLORE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

export default function CollectionHeader() {
  return (
    <motion.div
      id="collection"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeRise}
      className="flex items-center justify-between gap-3 sm:gap-6 scroll-mt-6"
    >
      <h1 className="font-anton text-2xl sm:text-3xl md:text-5xl lg:text-6xl sm:whitespace-nowrap">
        EXPLORE THE COLLECTION
      </h1>

      {/* Wrapped rather than passed as a class on the pill itself: the pill's
          own base class already includes `flex`, and stacking `hidden` +
          `flex`/`inline-flex` on the same element depends on unpredictable
          Tailwind rule ordering. A wrapper with `hidden` / `block` sidesteps that. */}
      <div className="hidden sm:block shrink-0">
        <PillLink
          href="/shop"
          icon={EXPLORE_ICON}
          layout="hug"
          size="compact"
          focusRing="dark"
          className="border border-[#F1BF0A]"
        >
          Explore Collection
        </PillLink>
      </div>

      <Link
        href="/shop"
        aria-label="Explore Collection"
        className="sm:hidden flex items-center justify-center bg-[#F1BF0A] rounded-full size-11 shrink-0 border border-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </motion.div>
  );
}
