"use client";

import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import CartLineItem from "@/components/CartLineItem";
import EmptyState from "@/components/EmptyState";
import PromoCodeInput from "@/components/PromoCodeInput";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";
import StickyMobileOrderBar from "@/components/StickyMobileOrderBar";
import SavedForLaterShelf from "@/components/SavedForLaterShelf";
import ProductGrid from "@/components/ProductGrid";
import { useCart, type CartItem } from "@/context/CartContext";
import { products } from "@/data/products";
import { DURATION, EASE } from "@/lib/motion";

const CROSS_SELL_ANCHOR_ID = "you-might-also-need";

// Opacity only, on purpose: the pieces inside each state (the Order
// Summary panel, the cross-sell cards, the empty state) already run their
// own rise-and-fade entrances, so also translating the whole state here
// would stack a second vertical movement on top of theirs. A plain
// crossfade also needs no separate reduced-motion variant.
// Quick out, gentler in: with mode="wait" the outgoing state has to finish
// before the next one starts, so a slow exit would just read as a delay.
const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

// Shown only for the brief window before the saved cart has loaded from
// localStorage. Mirrors the shape of the real has-items layout below it
// (promo input, a few line items, the desktop summary panel) so there's no
// layout jump once the real content swaps in — not a generic spinner, and
// not the old product-card-shaped SkeletonCard/SkeletonGrid (deleted
// earlier as dead code), since a cart line item's shape is different from
// a product card's.
function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px] animate-pulse" aria-hidden="true">
      <div className="min-w-0">
        <div className="h-11 bg-[#e9ecf6] rounded-full mb-6" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-3 py-4 border-b border-[#e9ecf6]">
            <div className="size-24 sm:size-28 rounded-2xl bg-[#e9ecf6] shrink-0" />
            <div className="flex-1 flex flex-col gap-2 py-1">
              <div className="h-4 w-2/3 max-w-40 bg-[#e9ecf6] rounded" />
              <div className="h-3 w-1/3 max-w-24 bg-[#e9ecf6] rounded" />
              <div className="h-8 w-28 bg-[#e9ecf6] rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="h-96 bg-[#e9ecf6] rounded-4xl" />
      </div>
    </div>
  );
}

export default function CartPageContent() {
  const { items, itemCount, isReady, updateQuantity, removeItem } = useCart();

  function handleQuantityChange(item: CartItem, quantity: number) {
    updateQuantity(item.slug, item.selectedColor, item.selectedSize, quantity);
  }

  function handleRemove(item: CartItem) {
    removeItem(item.slug, item.selectedColor, item.selectedSize);
  }

  const cartSlugs = new Set(items.map((item) => item.slug));
  const crossSell = products.filter((p) => !cartSlugs.has(p.slug)).slice(0, 4);
  const hasItems = items.length > 0;

  return (
    <PageShell overflowX="clip">
      <PageHeaderBanner
        title="YOUR CART"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        count={isReady ? `${itemCount} ${itemCount === 1 ? "Item" : "Items"}` : undefined}
      />

      {/* flex-1 is unconditional: it makes this <main> grow to fill the
          viewport when its content is short, so the Footer sits right
          after it instead of leaving blank space below the Footer — and it
          has no effect at all once real content already exceeds the
          viewport, which any cart with items and a cross-sell grid almost
          always does. No bottom margin here: that's what previously
          stacked with the Footer's own top margin and read as a hole,
          most visibly under "You Might Also Need" — the Footer's own
          spacing is the only source of that gap now. */}
      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 flex-1">
        {/* initial={false}: whichever state is showing on the very first
            render skips its own entrance. That matters most for the
            skeleton — it's part of the server-rendered HTML, and starting
            it at opacity 0 would leave it invisible until JS loads, which
            is exactly the window it exists to cover. */}
        <AnimatePresence mode="wait" initial={false}>
          {!isReady ? (
            <motion.div key="skeleton" {...crossfade}>
              <CartSkeleton />
            </motion.div>
          ) : !hasItems ? (
            <motion.div key="empty" {...crossfade}>
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
            </motion.div>
          ) : (
            <motion.div key="full" {...crossfade}>
              {/* pb-20 lg:pb-0 lives here, scoped to just the region the
                  fixed mobile order bar actually covers while it's
                  visible (the item list and Saved For Later) — the bar
                  hides itself once "You Might Also Need" scrolls into
                  view, so that section and everything after it no longer
                  need clearance padding they were never at risk from. */}
              <div className="pb-20 lg:pb-0">
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                  <div className="min-w-0">
                    <div className="mb-6">
                      <PromoCodeInput />
                    </div>

                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartLineItem
                          key={`${item.slug}-${item.selectedColor ?? ""}-${item.selectedSize ?? ""}`}
                          item={item}
                          size="full"
                          onQuantityChange={(q) => handleQuantityChange(item, q)}
                          onRemove={() => handleRemove(item)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="hidden lg:block">
                    <div className="sticky top-4">
                      <OrderSummaryPanel />
                    </div>
                  </div>
                </div>

                <SavedForLaterShelf />
              </div>

              {crossSell.length > 0 && (
                <div id={CROSS_SELL_ANCHOR_ID} className="mt-12 sm:mt-16">
                  <h2 className="font-anton text-2xl sm:text-3xl mb-6">YOU MIGHT ALSO NEED</h2>
                  <ProductGrid products={crossSell} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {hasItems && <StickyMobileOrderBar anchorId={CROSS_SELL_ANCHOR_ID} />}
    </PageShell>
  );
}