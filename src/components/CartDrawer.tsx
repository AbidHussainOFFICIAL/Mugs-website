"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CartLineItem from "@/components/CartLineItem";
import EmptyState from "@/components/EmptyState";
import { useCart, type CartItem } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { DURATION, EASE } from "@/lib/motion";

const FREE_SHIPPING_THRESHOLD = 100;

function DrawerContent({
  items,
  itemCount,
  subtotal,
  freeShippingLeft,
  onQuantityChange,
  onRemove,
  onClose,
}: {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  freeShippingLeft: number;
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-[#e9ecf6] shrink-0">
        <h2 className="font-anton text-xl sm:text-2xl">Your Cart ({itemCount})</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="flex items-center justify-center bg-[#F1BF0A] rounded-full p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
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
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#090909]/80">Subtotal</span>
            <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
          </div>
          {freeShippingLeft > 0 ? (
            <p className="text-xs text-[#183fad]">Add ${freeShippingLeft.toFixed(2)} more for free shipping</p>
          ) : (
            <p className="text-xs text-[#183fad]">You&apos;ve unlocked free shipping</p>
          )}

          <Link
            href="/checkout"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </span>
            <span className="relative z-10 pl-8">Checkout</span>
          </Link>
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
  const { items, itemCount, updateQuantity, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  function handleQuantityChange(item: CartItem, quantity: number) {
    updateQuantity(item.slug, item.selectedColor, item.selectedSize, quantity);
  }

  function handleRemove(item: CartItem) {
    removeItem(item.slug, item.selectedColor, item.selectedSize);
  }

  const contentProps = {
    items,
    itemCount,
    subtotal,
    freeShippingLeft,
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

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="hidden sm:flex fixed top-0 right-0 bottom-0 z-[71] w-full max-w-[420px] bg-white flex-col"
          >
            <DrawerContent {...contentProps} />
          </motion.div>

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="sm:hidden fixed left-0 right-0 bottom-0 z-[71] max-h-[85vh] bg-white rounded-t-4xl flex flex-col"
          >
            <DrawerContent {...contentProps} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}