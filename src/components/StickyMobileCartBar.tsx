"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { DURATION, EASE } from "@/lib/motion";

const CART_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

const CHECK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default function StickyMobileCartBar({
  product,
  anchorId,
  quantity,
  selectedColor,
  selectedSize,
  onAdded,
}: {
  product: Product;
  anchorId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  /** Called after the item is added — see AddToCartButton for why this
   * button doesn't decide on its own whether to open the cart drawer. */
  onAdded?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const target = document.getElementById(anchorId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [anchorId]);

  function handleAdd() {
    addItem(product, quantity, { selectedColor, selectedSize });
    setAdded(true);
    onAdded?.();
    window.setTimeout(() => setAdded(false), 1500);
  }

  const barProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...barProps}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-4xl shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3"
        >
          <Image src={product.image} alt="" width={40} height={40} className="size-10 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-sm font-semibold">${product.price}</p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 bg-[#F1BF0A] rounded-full px-4 py-2 text-sm font-semibold text-[#090909] disabled:opacity-40 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: DURATION.fast }}
                  className="flex items-center gap-1.5"
                >
                  {CHECK_ICON}
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: DURATION.fast }}
                  className="flex items-center gap-1.5"
                >
                  {CART_ICON}
                  Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
