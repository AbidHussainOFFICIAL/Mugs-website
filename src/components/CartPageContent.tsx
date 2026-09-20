"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import CartLineItem from "@/components/CartLineItem";
import EmptyState from "@/components/EmptyState";
import PromoCodeInput from "@/components/PromoCodeInput";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import StickyMobileOrderBar from "@/components/StickyMobileOrderBar";
import SavedForLaterShelf from "@/components/SavedForLaterShelf";
import ProductGrid from "@/components/ProductGrid";
import { useCart, type CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export default function CartPageContent() {
  const { items, itemCount, updateQuantity, removeItem } = useCart();
  const { toggleWishlist } = useWishlist();
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleQuantityChange(item: CartItem, quantity: number) {
    updateQuantity(item.slug, item.selectedColor, item.selectedSize, quantity);
  }

  function handleRemove(item: CartItem) {
    removeItem(item.slug, item.selectedColor, item.selectedSize);
  }

  function handleSaveForLater(item: CartItem) {
    toggleWishlist(item);
    removeItem(item.slug, item.selectedColor, item.selectedSize);
  }

  const cartSlugs = new Set(items.map((item) => item.slug));
  const crossSell = products.filter((p) => !cartSlugs.has(p.slug)).slice(0, 4);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />

      <PageHeaderBanner
        title="YOUR CART"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        count={`${itemCount} ${itemCount === 1 ? "Item" : "Items"}`}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 mb-20">
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
          <>
            <div id="order-summary-anchor" className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div>
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartLineItem
                      key={`${item.slug}-${item.selectedColor ?? ""}-${item.selectedSize ?? ""}`}
                      item={item}
                      size="full"
                      onQuantityChange={(q) => handleQuantityChange(item, q)}
                      onRemove={() => handleRemove(item)}
                      onSaveForLater={() => handleSaveForLater(item)}
                    />
                  ))}
                </AnimatePresence>

                <SavedForLaterShelf />

                <div className="mt-8">
                  <PromoCodeInput onApply={setDiscountPercent} />
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-4">
                  <OrderSummaryPanel subtotal={subtotal} discountPercent={discountPercent} />
                </div>
              </div>
            </div>

            {crossSell.length > 0 && (
              <div className="mt-12 sm:mt-16">
                <h2 className="font-anton text-2xl sm:text-3xl mb-6">YOU MIGHT ALSO NEED</h2>
                <ProductGrid products={crossSell} />
              </div>
            )}
          </>
        )}
      </main>

      {items.length > 0 && (
        <StickyMobileOrderBar subtotal={subtotal} discountPercent={discountPercent} anchorId="order-summary-anchor" />
      )}

      <Footer />
    </div>
  );
}