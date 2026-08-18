"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-20">
        <h1 className="font-anton text-4xl sm:text-5xl">YOUR CART</h1>

        {items.length === 0 ? (
          <div className="mt-6">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="mt-3 inline-block underline hover:text-[#183fad]">
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4 max-w-2xl">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-4 bg-[#e9ecf6] rounded-2xl p-3">
                <Image src={item.image} alt={item.name} width={72} height={72} className="rounded-xl object-cover size-18 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-[#5b5f6b]">
                    Qty {item.quantity} · ${item.price} each
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="text-sm underline hover:text-[#183fad] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-[#e9ecf6] pt-4 mt-2 max-w-2xl">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg">${total}</span>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
