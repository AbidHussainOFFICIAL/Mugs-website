"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { SPLASH_SEEN_CLASS, SPLASH_SEEN_KEY } from "@/lib/splash";

// The splash never leaves before this long after the page starts loading, so
// the logo and the name always get a moment on screen.
const ANIMATION_MS = 1200;
// If the web fonts are still loading after this long, stop waiting for them.
const MAX_FONT_WAIT_MS = 1500;
// Length of the exit: the screen lifts away like a curtain.
const EXIT_MS = 500;

// A short branded screen on a phone's first load of a visit: the logo and the
// name fade in, then the screen lifts away. It is part of the server-rendered
// HTML, so it covers the page from the first paint, and its animation is plain
// CSS, so it plays from that first paint too rather than waiting for the
// page's scripts. The layout's inline script adds SPLASH_SEEN_CLASS before
// paint on later loads in the same visit, which hides it with CSS (no flash),
// and a <noscript> rule hides it when scripts are off. Timing is measured from
// the start of the page load (performance.now()), so a slow start is not added
// on top of the animation.
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
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 overflow-hidden rounded-b-[3rem] bg-[#183fad] text-white transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
          leaving ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
      >
        <div className="splash-logo">
          <LogoMark className="size-20" />
        </div>
        <p className="splash-word font-anton text-3xl">MUGSY&apos;S MUGS</p>
      </div>
    </div>
  );
}
