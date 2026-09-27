"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { DURATION } from "@/lib/motion";

export default function PromoCodeInput() {
  const { promoCode, discountPercent, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyPromo(code)) {
      setCode("");
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }

  function handleChange(value: string) {
    setCode(value);
    if (invalid) setInvalid(false);
  }

  if (promoCode) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.fast }}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm text-green-700"
        >
          {promoCode} applied — {discountPercent}% off
        </motion.p>
        <button
          type="button"
          onClick={removePromo}
          className="text-sm text-[#183fad] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div
          className={`flex-1 flex items-center gap-2 rounded-full border bg-white px-2 py-2 transition-colors ${
            invalid ? "border-red-300" : "border-[#183fad]/20 focus-within:border-[#F1BF0A]"
          }`}
        >
          <span className="flex items-center justify-center rounded-full bg-[#e9ecf6] p-1.5 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#183fad]" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 0 0 3.182 0l4.318-4.318a2.25 2.25 0 0 0 0-3.182l-9.581-9.581A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
          </span>
          <input
            type="text"
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Promo code"
            aria-label="Promo code"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-[#5b5f6b]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#F1BF0A] rounded-full px-4 py-2.5 text-sm font-semibold shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          Apply
        </button>
      </form>

      <AnimatePresence>
        {invalid && (
          <motion.p
            key="invalid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm text-red-700"
          >
            Invalid or expired code
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}