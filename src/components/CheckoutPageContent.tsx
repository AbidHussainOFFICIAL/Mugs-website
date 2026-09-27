"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import OrderTotals from "@/components/OrderTotals";
import { PillLink, PillButtonElement } from "@/components/PillButton";
import { useCart } from "@/context/CartContext";
import { calculateTotals } from "@/lib/pricing";
import { DURATION, EASE } from "@/lib/motion";

const SHOP_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

const CHECKOUT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

type CheckoutState = "review" | "empty" | "placed";

export default function CheckoutPageContent() {
  const { items, itemCount, subtotal, discountPercent, isReady, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  function handlePlaceOrder() {
    setOrderTotal(calculateTotals(subtotal, discountPercent).total);
    setOrderCount(itemCount);
    clearCart();
    setPlaced(true);
  }

  const state: CheckoutState | "loading" = !isReady ? "loading" : placed ? "placed" : items.length === 0 ? "empty" : "review";

  const swapProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } };

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 flex flex-col">
      <Navbar />

      <PageHeaderBanner
        title="CHECKOUT"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 mb-20 flex-1">
        <AnimatePresence mode="wait">
          {state === "loading" ? null : state === "placed" ? (
            <motion.div key="placed" {...swapProps} transition={{ duration: DURATION.base, ease: EASE }} className="max-w-xl mx-auto text-center py-16">
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: DURATION.base, ease: EASE, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="mx-auto flex items-center justify-center bg-[#F1BF0A] rounded-full size-16 mb-5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#090909" strokeWidth="2" className="size-7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </motion.div>
              <h2 className="font-anton text-3xl mb-2">ORDER PLACED</h2>
              <p className="text-[#5b5f6b]">
                Thanks for your order — {orderCount} {orderCount === 1 ? "item" : "items"}, ${orderTotal.toFixed(2)} total.
              </p>
              <p className="text-xs text-[#5b5f6b] mt-1 mb-6">This is a demo store — no real payment was processed.</p>
              <PillLink href="/shop" icon={SHOP_ICON} layout="hug" size="narrow" focusRing="dark">
                Continue Shopping
              </PillLink>
            </motion.div>
          ) : state === "empty" ? (
            <motion.div key="empty" {...swapProps} transition={{ duration: DURATION.base, ease: EASE }} className="max-w-xl mx-auto text-center py-16">
              <p className="text-[#5b5f6b] mb-4">Your cart is empty.</p>
              <Link href="/shop" className="underline text-[#183fad]">
                Browse the collection
              </Link>
            </motion.div>
          ) : (
            <motion.div key="review" {...swapProps} transition={{ duration: DURATION.base, ease: EASE }} className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div>
                <h2 className="font-anton text-xl mb-4">REVIEW YOUR ORDER</h2>
                <div className="flex flex-col">
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.selectedColor ?? ""}-${item.selectedSize ?? ""}`}
                      className="flex items-center gap-4 py-4 border-b border-[#e9ecf6]"
                    >
                      <Image src={item.image} alt={item.name} width={64} height={64} className="size-16 rounded-2xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold text-sm">{item.name}</p>
                        {(item.selectedColor || item.selectedSize) && (
                          <p className="text-xs text-[#090909]/60">
                            {item.selectedColor}
                            {item.selectedColor && item.selectedSize ? " · " : ""}
                            {item.selectedSize}
                          </p>
                        )}
                        <p className="text-sm text-[#5b5f6b]">Qty {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#5b5f6b] mt-4">
                  This is a demo checkout — no real payment is processed. Placing an order clears your cart and
                  simulates a completed purchase.
                </p>
              </div>

              <div className="bg-[#4565bc] rounded-4xl p-6 text-white flex flex-col gap-4 h-fit">
                <h2 className="font-anton text-xl">ORDER SUMMARY</h2>

                <OrderTotals />

                <PillButtonElement onClick={handlePlaceOrder} icon={CHECKOUT_ICON} layout="full" focusRing="light" tapFeedback>
                  Place Order
                </PillButtonElement>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}