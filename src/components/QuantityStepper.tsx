"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MAX_ITEM_QUANTITY } from "@/lib/pricing";
import { DURATION } from "@/lib/motion";

export default function QuantityStepper({
  quantity,
  onChange,
  size = "lg",
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "lg";
}) {
  const shouldReduceMotion = useReducedMotion();
  const atMax = quantity >= MAX_ITEM_QUANTITY;
  const circleSize = size === "sm" ? "size-5" : "size-8";
  const iconSize = size === "sm" ? "size-2.5" : "size-4";
  const numberClass = size === "sm" ? "min-w-3 text-xs" : "min-w-4 text-sm";
  const containerClass = size === "sm" ? "gap-1 px-1 py-1" : "gap-1.5 px-1 py-1.5";

  return (
    // flex-col rather than a single row: the "max reached" caption below
    // needs somewhere to sit without pushing the +/- controls themselves
    // out of alignment with whatever sits beside this component (e.g. the
    // Remove button in CartLineItem, which aligns itself to the top of
    // this whole block rather than its vertical center for exactly this
    // reason — see the comment there).
    <div className="flex flex-col gap-1">
      <div className={`inline-flex items-center rounded-full border border-[#183fad]/20 ${containerClass}`}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className={`flex items-center justify-center ${circleSize} rounded-full bg-[#F1BF0A] text-[#090909] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconSize} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </motion.button>

        <motion.span
          key={quantity}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.15 }}
          className={`${numberClass} text-center font-semibold text-[#090909]`}
          aria-live="polite"
        >
          {quantity}
        </motion.span>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.min(MAX_ITEM_QUANTITY, quantity + 1))}
          disabled={atMax}
          aria-label="Increase quantity"
          aria-describedby={atMax ? "quantity-max-note" : undefined}
          className={`flex items-center justify-center ${circleSize} rounded-full bg-[#F1BF0A] text-[#090909] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconSize} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {atMax && (
          <motion.p
            id="quantity-max-note"
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast }}
            className="text-[10px] text-[#5b5f6b] overflow-hidden"
          >
            Max {MAX_ITEM_QUANTITY} per item
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
