"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CartLineItem from "@/components/CartLineItem";
import EmptyState from "@/components/EmptyState";
import { PillLink } from "@/components/PillButton";
import { useCart, type CartItem } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { calculateTotals, type OrderTotals } from "@/lib/pricing";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

const CHECKOUT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

function FreeShippingMessage({ remaining, shouldReduceMotion }: { remaining: number; shouldReduceMotion: boolean | null }) {
  const unlocked = remaining === 0;
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={unlocked ? "unlocked" : "remaining"}
        initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 4 }}
        transition={{ duration: DURATION.fast }}
        className="flex items-center gap-1.5 text-xs text-[#183fad]"
      >
        {unlocked && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        )}
        {unlocked ? "You've unlocked free shipping" : `Add $${remaining.toFixed(2)} more for free shipping`}
      </motion.p>
    </AnimatePresence>
  );
}

function DrawerContent({
  items,
  itemCount,
  totals,
  discountPercent,
  shouldReduceMotion,
  onQuantityChange,
  onRemove,
  onClose,
}: {
  items: CartItem[];
  itemCount: number;
  totals: OrderTotals;
  discountPercent: number;
  shouldReduceMotion: boolean | null;
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-[#e9ecf6] shrink-0">
        <h2 className="font-anton text-xl sm:text-2xl">Your Cart ({itemCount})</h2>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close cart"
          className="flex items-center justify-center bg-[#F1BF0A] rounded-full p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {items.length === 0 ? (
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#090909" strokeWidth="1.5" className="size-7" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            }
            title="Your cart is empty"
            description="Add a few mugs and they'll show up here."
            ctaLabel="Explore Collection"
            ctaHref="/shop"
          />
        ) : (
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartLineItem
                key={`${item.slug}-${item.selectedColor ?? ""}-${item.selectedSize ?? ""}`}
                item={item}
                size="compact"
                onQuantityChange={(q) => onQuantityChange(item, q)}
                onRemove={() => onRemove(item)}
                onNavigate={onClose}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-[#e9ecf6] shrink-0 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#090909]/80">Subtotal</span>
              <motion.span
                key={totals.subtotal}
                initial={{ scale: 1 }}
                animate={{ scale: shouldReduceMotion ? 1 : [1, 1.06, 1] }}
                transition={{ duration: DURATION.fast }}
                className="font-semibold text-lg"
              >
                ${totals.subtotal.toFixed(2)}
              </motion.span>
            </div>
            <AnimatePresence>
              {totals.discount > 0 && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: DURATION.fast }}
                  className="flex items-center justify-between text-sm text-[#183fad] overflow-hidden"
                >
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <FreeShippingMessage remaining={totals.freeShippingRemaining} shouldReduceMotion={shouldReduceMotion} />

          <PillLink href="/checkout" onClick={onClose} icon={CHECKOUT_ICON} layout="full" focusRing="dark" tapFeedback>
            Checkout
          </PillLink>
          <Link
            href="/cart"
            onClick={onClose}
            className="text-center text-sm text-[#183fad] underline underline-offset-2"
          >
            View Full Cart
          </Link>
        </div>
      )}
    </>
  );
}

export default function CartDrawer() {
  const { items, itemCount, subtotal, discountPercent, updateQuantity, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();
  const shouldReduceMotion = useReducedMotion();

  // Both the desktop (side) and mobile (bottom-sheet) variants below are
  // mounted at once and switched purely with CSS breakpoints — so the focus
  // trap needs one ref that covers both. `display: contents` makes this
  // wrapper invisible to layout (the fixed-positioned children inside are
  // unaffected), while still giving useOverlay a single container to query.
  const overlayRef = useOverlay<HTMLDivElement>(isOpen, close);

  const desktopPanelProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
  const mobilePanelProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  function handleQuantityChange(item: CartItem, quantity: number) {
    updateQuantity(item.slug, item.selectedColor, item.selectedSize, quantity);
  }

  function handleRemove(item: CartItem) {
    removeItem(item.slug, item.selectedColor, item.selectedSize);
  }

  const contentProps = {
    items,
    itemCount,
    totals: calculateTotals(subtotal, discountPercent),
    discountPercent,
    shouldReduceMotion,
    onQuantityChange: handleQuantityChange,
    onRemove: handleRemove,
    onClose: close,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-[#183fad]/90"
            aria-hidden="true"
          />

          <div ref={overlayRef} style={{ display: "contents" }}>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              {...desktopPanelProps}
              transition={{ duration: DURATION.base, ease: EASE }}
              className="hidden sm:flex fixed top-0 right-0 bottom-0 z-[71] w-full max-w-[420px] bg-white flex-col"
            >
              <DrawerContent {...contentProps} />
            </motion.div>

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              {...mobilePanelProps}
              transition={{ duration: DURATION.base, ease: EASE }}
              className="sm:hidden fixed left-0 right-0 bottom-0 z-[71] max-h-[85vh] bg-white rounded-t-4xl flex flex-col"
            >
              <DrawerContent {...contentProps} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}