"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import { DURATION, EASE } from "@/lib/motion";

export default function StickyMobileOrderBar({
  subtotal,
  discountPercent = 0,
  anchorId,
}: {
  subtotal: number;
  discountPercent?: number;
  anchorId: string;
}) {
  const [collapsedVisible, setCollapsedVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const target = document.getElementById(anchorId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setCollapsedVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [anchorId]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSheetOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [sheetOpen]);

  const previewTotal = subtotal - (subtotal * discountPercent) / 100;

  return (
    <>
      <AnimatePresence>
        {collapsedVisible && !sheetOpen && (
          <motion.button
            type="button"
            onClick={() => setSheetOpen(true)}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-4xl shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3"
          >
            <span className="text-sm font-medium">
              Total: <span className="font-semibold">${previewTotal.toFixed(2)}</span>
            </span>
            <span className="flex items-center gap-2 bg-[#F1BF0A] rounded-full px-4 py-2 text-sm font-semibold text-[#090909]">
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
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: DURATION.base, ease: EASE }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-4xl p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Order summary"
            >
              <div className="mx-auto h-1.5 w-12 rounded-full bg-[#e9ecf6] mb-3" />
              <OrderSummaryPanel subtotal={subtotal} discountPercent={discountPercent} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}