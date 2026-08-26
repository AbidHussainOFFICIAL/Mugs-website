"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { DURATION } from "@/lib/motion";

export default function AddToCartButton({
  product,
  quantity,
  onQuantityChange,
  selectedColor,
  selectedSize,
  maxQuantity = 10,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  selectedColor?: string;
  selectedSize?: string;
  maxQuantity?: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

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
          pill via the parent's items-stretch, rather than a fixed value. */}
      <div className="flex items-center gap-1.5 bg-white rounded-full px-1 shrink-0">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex items-center justify-center size-8 rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
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
          onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
          disabled={quantity >= maxQuantity}
          aria-label="Increase quantity"
          className="flex items-center justify-center size-8 rounded-full bg-[#F1BF0A] text-[#090909] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}