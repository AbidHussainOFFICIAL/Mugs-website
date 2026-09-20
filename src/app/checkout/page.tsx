"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handlePlaceOrder() {
    setOrderTotal(subtotal);
    setOrderCount(items.reduce((sum, item) => sum + item.quantity, 0));
    clearCart();
    setPlaced(true);
  }

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />

      <PageHeaderBanner
        title="CHECKOUT"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 mb-20">
        {placed ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="mx-auto flex items-center justify-center bg-[#F1BF0A] rounded-full size-16 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#090909" strokeWidth="2" className="size-7" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-anton text-3xl mb-2">ORDER PLACED</h1>
            <p className="text-[#5b5f6b]">
              Thanks for your order — {orderCount} {orderCount === 1 ? "item" : "items"}, ${orderTotal.toFixed(2)} total.
            </p>
            <p className="text-xs text-[#5b5f6b] mt-1 mb-6">This is a demo store — no real payment was processed.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0"
            >
              <div className="rounded-full p-1.5 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </div>
              <span className="relative z-10">Continue Shopping</span>
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <p className="text-[#5b5f6b] mb-4">Your cart is empty.</p>
            <Link href="/shop" className="underline text-[#183fad]">
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
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
              <h2 className="font-anton text-xl">ORDER TOTAL</h2>
              <div className="flex items-center justify-between">
                <span className="font-anton text-lg">Total</span>
                <span className="font-anton text-xl text-[#F1BF0A]">${subtotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex items-center justify-center gap-2 bg-[#F1BF0A] rounded-full py-3 text-[#090909] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}