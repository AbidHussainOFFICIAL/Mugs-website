"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import StatusChip from "@/components/StatusChip";
import { ChevronDownIcon } from "@/components/icons";
import { DURATION, EASE } from "@/lib/motion";

// The shared frame for the date and time pickers: a pill field in the same
// anatomy as TextField, and a panel that opens from it. From the sm
// breakpoint the panel is a small popover under the field; below it, a
// bottom sheet with a dimmed backdrop so it is easy to reach and read.
// Escape, a click outside and choosing a value all close it, and focus goes
// back to the field.
export default function PickerShell({
  id,
  label,
  valueText,
  placeholder,
  icon,
  open,
  onOpenChange,
  panelLabel,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  /** What the field shows once a value is chosen; empty shows the placeholder. */
  valueText: string;
  placeholder: string;
  icon: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panelLabel: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `${id}-panel`;

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      onOpenChange(false);
      triggerRef.current?.focus();
    }
    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onOpenChange(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, onOpenChange]);

  const panelMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 16 } };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label htmlFor={id} className="mb-1.5 ml-4 block text-sm font-semibold">
        {label}
      </label>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`flex h-12 w-full items-center gap-2 rounded-full border bg-white pl-2 pr-4 text-left text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] sm:text-sm ${
          error ? "border-red-300" : open ? "border-[#F1BF0A]" : "border-[#183fad]/20 hover:border-[#F1BF0A]"
        }`}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">{icon}</span>
        <span className={`min-w-0 flex-1 truncate ${valueText ? "" : "text-[#090909]/50"}`}>{valueText || placeholder}</span>
        <ChevronDownIcon className={`size-4 shrink-0 text-[#183fad] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {error && (
        <StatusChip variant="error" id={`${id}-error`} className="mt-1.5 ml-4">
          {error}
        </StatusChip>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              className="fixed inset-0 z-[59] bg-[#090909]/40 sm:hidden"
              aria-hidden="true"
            />
            <motion.div
              id={panelId}
              role="dialog"
              aria-label={panelLabel}
              {...panelMotion}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="fixed inset-x-0 bottom-0 z-[60] rounded-t-4xl bg-white p-4 pb-6 shadow-[0_-8px_32px_rgba(0,0,0,0.18)] sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 sm:rounded-3xl sm:pb-4 sm:shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#e9ecf6] sm:hidden" aria-hidden="true" />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
