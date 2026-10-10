"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { DURATION } from "@/lib/motion";
import { MAX_ITEM_QUANTITY } from "@/lib/pricing";

export default function AddToCartButton({
  product,
  quantity,
  onQuantityChange,
  selectedColor,
  selectedSize,
  onAdded,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  selectedColor?: string;
  selectedSize?: string;
  /** Called after the item is added. The page decides what happens next
   * (e.g. whether to open the cart drawer) — this button doesn't open it
   * itself, since the drawer's auto-open-once-per-page-view gate is shared
   * with StickyMobileCartBar and has to live at the page level to work. */
  onAdded?: () => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const atMax = quantity >= MAX_ITEM_QUANTITY;

  if (!product.inStock) {
    return (
      <div className="flex-1 flex items-center justify-center gap-2 bg-[#e9ecf6] rounded-full py-3 px-6 text-[#5b5f6b] font-semibold cursor-not-allowed">
        Out of Stock
      </div>
    );
  }

  function handleClick() {
    addItem(product, quantity, { selectedColor, selectedSize });
    setAdded(true);
    onAdded?.();
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex-1 flex items-stretch gap-1.5 bg-[#F1BF0A] rounded-full p-1.5">
      {/* Add to Cart — plain white pill, no icon, no hover-fill animation.
          Text-only, matching the heart button's "one clear signal" logic. */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className="flex-1 flex items-center justify-center bg-white rounded-full py-3 px-5 text-[#090909] font-semibold whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? "added" : "add"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: DURATION.fast }}
          >
            {added ? "Added!" : "Add to Cart"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Quantity — white pill, yellow +/- circles, matching the reference
          shape exactly. Stretches to the same height as the Add to Cart
          pill via the parent's items-stretch, rather than a fixed value.
          `relative` here is only for the "max reached" caption below —
          everything else about this pill is unchanged. */}
      <div className="flex items-center gap-1.5 bg-white rounded-full px-1 shrink-0 relative">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex items-center justify-center size-8 rounded-full bg-[#F1BF0A] text-[#090909] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </motion.button>

        <motion.span
          key={quantity}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.15 }}
          className="min-w-4 text-center font-semibold text-sm text-[#090909]"
          aria-live="polite"
        >
          {quantity}
        </motion.span>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onQuantityChange(Math.min(MAX_ITEM_QUANTITY, quantity + 1))}
          disabled={atMax}
          aria-label="Increase quantity"
          aria-describedby={atMax ? "add-to-cart-max-note" : undefined}
          className="flex items-center justify-center size-8 rounded-full bg-[#F1BF0A] text-[#090909] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.button>

        {/* Absolutely positioned, deliberately: this sub-pill sits inside a
            row using items-stretch (the Add to Cart button matches its
            height), and this is the component the project notes flag as
            having broken twice before from layout changes. A caption that
            took up real flex space here would grow this pill taller and,
            via items-stretch, drag the Add to Cart button taller with it.
            Taking it out of flow entirely avoids that class of bug outright
            rather than relying on careful sizing. */}
        <AnimatePresence>
          {atMax && (
            <motion.p
              id="add-to-cart-max-note"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: DURATION.fast }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[10px] text-[#5b5f6b] whitespace-nowrap"
            >
              Max {MAX_ITEM_QUANTITY}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
