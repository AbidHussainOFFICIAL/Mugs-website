"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import { SPLASH_SEEN_CLASS, SPLASH_SEEN_KEY } from "@/lib/splash";

const MIN_MS = 1000;
const MAX_MS = 2500;
const FADE_MS = 500;
const WORDMARK = "MUGSY'S MUGS";

// A short branded screen on a phone's first load of a visit. It is part of
// the server-rendered HTML, so it covers the page from the first paint; the
// layout's inline script adds SPLASH_SEEN_CLASS before paint on later loads
// in the same visit, which hides it with CSS (no flash), and a <noscript>
// rule hides it when scripts are off. It waits for the web fonts (so the page
// doesn't swap type under it) for at least MIN_MS and at most MAX_MS, while
// the mark springs in, the name types on and a progress line fills.
export default function SplashScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;

    if (document.documentElement.classList.contains(SPLASH_SEEN_CLASS)) {
      timers.push(window.setTimeout(() => setGone(true), 0));
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    const startedAt = performance.now();
    let finished = false;

    function finish() {
      if (finished || cancelled) return;
      finished = true;
      try {
        window.sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
      } catch {
        // Storage blocked: the splash simply shows again on the next load.
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLeaving(true);
      timers.push(window.setTimeout(() => setGone(true), reduced ? 0 : FADE_MS));
    }

    const fontsReady = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, MAX_MS)));
    Promise.race([fontsReady, cap]).then(() => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - startedAt));
      timers.push(window.setTimeout(finish, wait));
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  if (gone) return null;

  const still = Boolean(shouldReduceMotion);

  return (
    <div data-splash aria-hidden="true" className="[.splash-seen_&]:hidden md:hidden">
      {/* Exit: the whole screen lifts away like a curtain, rounded at the
          bottom to match the site's panels. */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 overflow-hidden rounded-b-[3rem] bg-[#183fad] text-white transition-transform ease-in-out motion-reduce:transition-none ${
          leaving ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        <motion.span
          className="absolute size-64 rounded-full bg-[#4565bc]"
          initial={still ? false : { scale: 0.4, opacity: 0 }}
          animate={still ? undefined : { scale: [0.4, 1, 1.12, 1], opacity: [0, 0.7, 0.5, 0.6] }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <motion.div
          className="relative"
          initial={still ? false : { scale: 0.3, rotate: -12, opacity: 0 }}
          animate={still ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          <motion.div
            animate={still ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
          >
            <LogoMark className="size-20" />
          </motion.div>
        </motion.div>

        <p className="relative flex font-anton text-3xl">
          {WORDMARK.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block whitespace-pre"
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={still ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 + index * 0.04 }}
            >
              {char}
            </motion.span>
          ))}
        </p>

        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full origin-left rounded-full bg-[#F1BF0A]"
            initial={still ? false : { scaleX: 0 }}
            animate={still ? undefined : { scaleX: 1 }}
            transition={{ duration: MIN_MS / 1000 + 0.2, ease: "easeInOut", delay: 0.2 }}
            style={still ? { transform: "scaleX(1)" } : undefined}
          />
        </div>
      </div>
    </div>
  );
}
