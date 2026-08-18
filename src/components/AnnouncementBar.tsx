"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Only 2,000 units worldwide",
  "Free shipping over $100",
  "Ships in 3–5 days",
];

const STORAGE_KEY = "mugsys-announcement-dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const rotate = setInterval(() => {
      setFadeIn(false);
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setFadeIn(true);
      }, 200);
    }, 4000);

    return () => clearInterval(rotate);
  }, [visible]);

  function handleDismiss() {
    setVisible(false);
    window.localStorage.setItem(STORAGE_KEY, "true");
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-[#090909] text-white text-xs sm:text-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 px-4 py-2 relative">
        <p
          className={`text-center transition-opacity duration-200 ${fadeIn ? "opacity-100" : "opacity-0"}`}
          aria-live="polite"
        >
          {MESSAGES[index]}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-4 flex items-center justify-center rounded-full p-1 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 0 0-1.06-1.06L12 10.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
