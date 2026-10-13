"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { SPLASH_SEEN_CLASS, SPLASH_SEEN_KEY } from "@/lib/splash";

// The splash's own animation (see the splash-* rules in styles.css) finishes
// about 2.3s after the page starts loading. It never leaves before then, so
// the site is only revealed once the whole animation has played.
const ANIMATION_MS = 2400;
// If the web fonts are still loading after this long, stop waiting for them.
const MAX_FONT_WAIT_MS = 4000;
// Length of the exit: the screen lifts away like a curtain.
const EXIT_MS = 700;
const WORDMARK = "MUGSY'S MUGS";
const LETTER_START_S = 0.5;
const LETTER_STEP_S = 0.06;

// A short branded screen on a phone's first load of a visit. It is part of
// the server-rendered HTML, so it covers the page from the first paint, and
// its animation is plain CSS, so it plays from that first paint too rather
// than waiting for the page's scripts. The layout's inline script adds
// SPLASH_SEEN_CLASS before paint on later loads in the same visit, which
// hides it with CSS (no flash), and a <noscript> rule hides it when scripts
// are off. Timing is measured from the start of the page load
// (performance.now()), so a slow start is not added on top of the animation.
export default function SplashScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    const root = document.documentElement;

    if (root.classList.contains(SPLASH_SEEN_CLASS)) {
      timers.push(window.setTimeout(() => setGone(true), 0));
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    // Keep the page behind the splash from scrolling while it plays.
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

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
      root.style.overflow = previousOverflow;
      setLeaving(true);
      timers.push(window.setTimeout(() => setGone(true), reduced ? 0 : EXIT_MS));
    }

    const fontsReady = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, MAX_FONT_WAIT_MS)));
    Promise.race([fontsReady, cap]).then(() => {
      if (cancelled) return;
      const wait = Math.max(0, ANIMATION_MS - performance.now());
      timers.push(window.setTimeout(finish, wait));
    });

    return () => {
      cancelled = true;
      root.style.overflow = previousOverflow;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  if (gone) return null;

  return (
    <div data-splash aria-hidden="true" className="[.splash-seen_&]:hidden md:hidden">
      {/* Exit: the whole screen lifts away like a curtain, rounded at the
          bottom to match the site's panels. */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 overflow-hidden rounded-b-[3rem] bg-[#183fad] text-white transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
          leaving ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
      >
        <span className="splash-ring absolute size-64 rounded-full bg-[#4565bc]" />
        <div className="splash-logo relative">
          <div className="splash-float">
            <LogoMark className="size-20" />
          </div>
        </div>

        <p className="relative flex font-anton text-3xl">
          {WORDMARK.split("").map((char, index) => (
            <span
              key={index}
              className="splash-letter inline-block whitespace-pre"
              style={{ animationDelay: `${(LETTER_START_S + index * LETTER_STEP_S).toFixed(2)}s` }}
            >
              {char}
            </span>
          ))}
        </p>

        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/20">
          <div className="splash-bar h-full rounded-full bg-[#F1BF0A]" />
        </div>
      </div>
    </div>
  );
}
