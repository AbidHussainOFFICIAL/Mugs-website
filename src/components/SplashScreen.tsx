"use client";

import { useEffect, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { SPLASH_SEEN_CLASS, SPLASH_SEEN_KEY } from "@/lib/splash";

const MIN_MS = 1000;
const MAX_MS = 2500;
const FADE_MS = 400;

// A short branded screen on a phone's first load of a visit. It is part of
// the server-rendered HTML, so it covers the page from the first paint; the
// layout's inline script adds SPLASH_SEEN_CLASS before paint on later loads
// in the same visit, which hides it with CSS (no flash), and a <noscript>
// rule hides it when scripts are off. It waits for the web fonts (so the page
// doesn't swap type under it) for at least MIN_MS and at most MAX_MS.
export default function SplashScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

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

  return (
    <div data-splash aria-hidden="true" className="[.splash-seen_&]:hidden md:hidden">
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#183fad] text-white transition-opacity motion-reduce:transition-none ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        <LogoMark className="size-20" />
        <p className="font-anton text-3xl">MUGSY&apos;S MUGS</p>
      </div>
    </div>
  );
}
