"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import { useCart } from "@/context/CartContext";
import { calculateTotals } from "@/lib/pricing";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

// On mobile the Order Summary panel isn't part of the page (it's a desktop
// sidebar), so this bar is the way to reach Checkout — it stays visible
// while scrolling through the cart items and Saved For Later, and hides
// once "You Might Also Need" (and the Footer beyond it) comes into view,
// where it would otherwise sit on top of unrelated content with nothing
// left to check out.
export default function StickyMobileOrderBar({ anchorId }: { anchorId?: string }) {
  const { subtotal, discountPercent } = useCart();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pastAnchor, setPastAnchor] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const sheetRef = useOverlay<HTMLDivElement>(sheetOpen, () => setSheetOpen(false));

  useEffect(() => {
    if (!anchorId) return;

    // A plain scroll-position check rather than IntersectionObserver:
    // "has the person scrolled past this point" is a continuous position
    // question, not a "is this element currently visible" one, and
    // IntersectionObserver only calls back when the anchor's intersection
    // ratio crosses a threshold. A discontinuous jump — a "back to top"
    // link, browser back/forward restoring scroll position, a
    // reduced-motion instant scroll — can move the anchor from "above the
    // viewport" straight to "below the viewport" (or vice versa) without
    // the ratio ever leaving 0, so the observer never fires and the bar
    // gets stuck in whatever state it was last in. A scroll listener reads
    // the anchor's actual current position on every scroll event
    // regardless of how the scroll happened, so it can't get stuck.
    //
    // The anchor is looked up on every check, not once when this effect
    // runs: the Cart page crossfades between its loading/empty/full states,
    // so the "You Might Also Need" element can mount slightly AFTER this
    // bar does. Resolving it once up front would find nothing, attach no
    // listener behavior, and leave the bar stuck visible forever. If the
    // anchor genuinely isn't there (no cross-sell products), the bar just
    // stays visible.
    function checkPosition() {
      const target = document.getElementById(anchorId!);
      setPastAnchor(target ? target.getBoundingClientRect().top <= 0 : false);
    }

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [anchorId]);

  const barProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
  const sheetProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
  const pulse = shouldReduceMotion ? {} : { animate: { scale: [1, 1.06, 1] } };

  const { total } = calculateTotals(subtotal, discountPercent);
  // The sheet, once opened, stays open regardless of scroll position — only
  // the collapsed trigger bar hides itself past the anchor.
  const showCollapsedBar = !sheetOpen && !pastAnchor;

  return (
    <>
      <AnimatePresence>
        {showCollapsedBar && (
          <motion.button
            type="button"
            onClick={() => setSheetOpen(true)}
            {...barProps}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-4xl shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3"
          >
            <span className="text-sm font-medium">
              Total:{" "}
              {/* Same pulse the Total gets in OrderTotals and the drawer's
                  subtotal gets — this is the same figure, so it should react
                  the same way when it changes. */}
              <motion.span
                key={total}
                initial={{ scale: 1 }}
                {...pulse}
                transition={{ duration: DURATION.fast }}
                className="inline-block font-semibold"
              >
                ${total.toFixed(2)}
              </motion.span>
            </span>
            <span className="flex items-center gap-2 bg-[#F1BF0A] rounded-full px-4 py-3 text-sm font-semibold text-[#090909]">
              Checkout
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              onClick={() => setSheetOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
              aria-hidden="true"
            />
            <motion.div
              ref={sheetRef}
              {...sheetProps}
              transition={{ duration: DURATION.base, ease: EASE }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-4xl p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Order summary"
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#e9ecf6] mb-3" />
              <OrderSummaryPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}