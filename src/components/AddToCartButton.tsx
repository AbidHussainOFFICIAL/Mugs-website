"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { DURATION } from "@/lib/motion";

export default function AddToCartButton({
  product,
  quantity = 1,
  selectedColor,
  selectedSize,
}: {
  product: Product;
  quantity?: number;
  selectedColor?: string;
  selectedSize?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button
        type="button"
        disabled
        className="w-full min-[480px]:w-auto flex items-center justify-center gap-2 bg-[#e9ecf6] rounded-full py-3 px-6 text-[#5b5f6b] font-semibold cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  function handleClick() {
    addItem(product, quantity, { selectedColor, selectedSize });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="w-full min-[480px]:w-auto flex items-center justify-center min-[480px]:justify-start gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
    >
      <span className="rounded-full p-1.5 relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.svg
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: DURATION.fast }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </motion.svg>
          ) : (
            <motion.svg
              key="cart"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: DURATION.fast }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span className="relative z-10">{added ? "Added!" : "Add to Cart"}</span>
    </motion.button>
  );
}
