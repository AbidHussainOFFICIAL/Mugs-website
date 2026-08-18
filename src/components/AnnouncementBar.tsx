"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

const MESSAGES = [
  "Only 2,000 units worldwide",
  "Free shipping over $100",
  "Ships in 3–5 days",
];

const STORAGE_KEY = "mugsys-announcement-dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible || shouldReduceMotion) return;
    const rotate = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(rotate);
  }, [visible, shouldReduceMotion]);

  function handleDismiss() {
    setVisible(false);
    window.localStorage.setItem(STORAGE_KEY, "true");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="w-full bg-[#090909] text-white text-xs sm:text-sm">
            <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 px-4 py-2 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: DURATION.fast }}
                  className="text-center"
                  aria-live="polite"
                >
                  {MESSAGES[index]}
                </motion.p>
              </AnimatePresence>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
