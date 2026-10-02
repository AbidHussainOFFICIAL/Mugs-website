"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { DURATION, EASE } from "@/lib/motion";

const AUTO_DISMISS_MS = 5000;

// Positioned at the TOP of the screen rather than the bottom: the app
// already docks a lot at the bottom on mobile — the cart drawer's bottom
// sheet, StickyMobileCartBar, StickyMobileOrderBar's collapsed bar and
// sheet — and a bottom toast would either hide behind one of those or
// have to out-rank all of them in z-index and risk covering their own
// controls (the drawer's Checkout button, in particular). The top of the
// screen has no competing fixed elements anywhere in the app.
export default function UndoToast() {
  const { pendingUndo, undoRemove, dismissUndo } = useCart();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!pendingUndo) return;
    const timeout = window.setTimeout(dismissUndo, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timeout);
  }, [pendingUndo, dismissUndo]);

  const entranceProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };

  return (
    <AnimatePresence>
      {pendingUndo && (
        <motion.div
          key={pendingUndo.id}
          role="status"
          aria-live="polite"
          {...entranceProps}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-3 bg-[#F1BF0A] text-[#090909] rounded-full py-2 pl-4 pr-2 shadow-lg max-w-[calc(100%-2rem)]"
        >
          <span className="text-sm truncate">{pendingUndo.product.name} removed</span>
          <button
            type="button"
            onClick={undoRemove}
            className="shrink-0 bg-[#183fad] text-white text-sm font-semibold rounded-full px-4 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Undo
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}