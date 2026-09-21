"use client";

import { motion } from "framer-motion";

export default function QuantityStepper({
  quantity,
  onChange,
  size = "lg",
  max = 10,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "lg";
  max?: number;
}) {
  const circleSize = size === "sm" ? "size-5" : "size-8";
  const iconSize = size === "sm" ? "size-2.5" : "size-4";
  const numberClass = size === "sm" ? "min-w-3 text-xs" : "min-w-4 text-sm";
  const containerClass = size === "sm" ? "gap-1 px-1 py-1" : "gap-1.5 px-1 py-1.5";

  return (
    <div className={`inline-flex items-center rounded-full border border-[#183fad]/20 ${containerClass}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center ${circleSize} rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]`}
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
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center ${circleSize} rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconSize} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </motion.button>
    </div>
  );
}
