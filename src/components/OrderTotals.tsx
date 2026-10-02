"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { calculateTotals } from "@/lib/pricing";
import { DURATION } from "@/lib/motion";

// The price breakdown shared by the cart's Order Summary and the checkout
// panel, so both always show the same numbers. Styled for the blue summary
// panels (white text on mid-blue).
export default function OrderTotals() {
  const { subtotal, discountPercent } = useCart();
  const { discount, shipping, tax, total } = calculateTotals(subtotal, discountPercent);
  const shouldReduceMotion = useReducedMotion();
  const pulse = shouldReduceMotion ? {} : { animate: { scale: [1, 1.06, 1] } };

  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Subtotal</span>
          <motion.span key={subtotal} initial={{ scale: 1 }} {...pulse} transition={{ duration: DURATION.fast }}>
            ${subtotal.toFixed(2)}
          </motion.span>
        </div>
        <AnimatePresence>
          {discount > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: DURATION.fast }}
              className="flex items-center justify-between overflow-hidden"
            >
              <span className="text-white/80">Discount ({discountPercent}%)</span>
              <span>-${discount.toFixed(2)}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between">
          <span className="text-white/80">Shipping</span>
          {/* Keyed on the shipping value itself, not just re-rendering in
              place — this is the one row that flips between two genuinely
              different displays ("Free" vs a dollar amount), and $0 vs a
              nonzero number both give it a fresh key, so crossing the free-
              shipping threshold gets the same pulse a plain number change
              gets everywhere else, arguably the single most rewarding
              moment in the whole cart to leave unanimated. */}
          <motion.span key={shipping} initial={{ scale: 1 }} {...pulse} transition={{ duration: DURATION.fast }}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </motion.span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/80">Estimated tax</span>
          <motion.span key={tax} initial={{ scale: 1 }} {...pulse} transition={{ duration: DURATION.fast }}>
            ${tax.toFixed(2)}
          </motion.span>
        </div>
      </div>

      <div className="border-t border-white/20 pt-3 flex items-center justify-between">
        <span className="font-anton text-lg">Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1 }}
          {...pulse}
          transition={{ duration: DURATION.fast }}
          className="font-anton text-xl text-[#F1BF0A]"
        >
          ${total.toFixed(2)}
        </motion.span>
      </div>
    </>
  );
}