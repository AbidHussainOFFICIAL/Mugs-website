"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SortOption } from "@/lib/useProductFilters";
import { SORT_OPTIONS } from "@/lib/categories";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

export default function MobileSortSheet({
  open,
  onClose,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  const sheetRef = useOverlay<HTMLDivElement>(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sort"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-4xl max-h-[85vh] overflow-y-auto lg:hidden"
          >
            <div className="sticky top-0 bg-white pt-3 pb-2 px-5 border-b border-[#183fad]/10">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#e9ecf6] mb-3" />
              <div className="flex items-center justify-between">
                <h2 className="font-anton text-lg">SORT BY</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close sort options"
                  className="flex items-center justify-center rounded-full p-1.5 hover:bg-[#e9ecf6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 0 0-1.06-1.06L12 10.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div role="listbox" aria-label="Sort by" className="p-5 flex flex-col gap-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => {
                    onChange(option.value);
                    onClose();
                  }}
                  className={`text-left rounded-xl px-4 py-3 text-sm transition-colors ${
                    value === option.value ? "bg-[#F1BF0A]/20 font-medium" : "hover:bg-[#e9ecf6]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}