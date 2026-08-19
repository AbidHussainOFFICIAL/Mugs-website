"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

interface ActiveFilter {
  key: string;
  label: string;
  clear: () => void;
}

export default function ActiveFilterChips({
  filters,
  onClearAll,
}: {
  filters: ActiveFilter[];
  onClearAll: () => void;
}) {
  return (
    <AnimatePresence>
      {filters.length > 0 && (
        <motion.div
          key="active-filters-row"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <AnimatePresence>
              {filters.map((filter, i) => (
                <motion.span
                  key={filter.key}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: DURATION.fast, delay: i * STAGGER.tight }}
                  className="flex items-center gap-1.5 bg-[#e9ecf6] rounded-full pl-3 pr-1.5 py-1 text-xs sm:text-sm"
                >
                  {filter.label}
                  <button
                    type="button"
                    onClick={filter.clear}
                    aria-label={`Remove ${filter.label} filter`}
                    className="flex items-center justify-center rounded-full p-0.5 hover:bg-[#183fad]/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 0 0-1.06-1.06L12 10.94 6.28 5.22Z" />
                    </svg>
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs sm:text-sm text-[#183fad] underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
