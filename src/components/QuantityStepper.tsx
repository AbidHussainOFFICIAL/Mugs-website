"use client";

import { motion } from "framer-motion";

export default function QuantityStepper({
  quantity,
  onChange,
  max = 10,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#183fad]/20">
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex items-center justify-center size-8 m-1 rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </motion.button>

      <span className="min-w-8 text-center font-semibold text-sm" aria-live="polite">
        {quantity}
      </span>

      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex items-center justify-center size-8 m-1 rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </motion.button>
    </div>
  );
}
