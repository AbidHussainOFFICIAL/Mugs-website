"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

// Its own full-width section on the Cart page now, a peer of "You Might
// Also Need" rather than something nested inside the product-list column —
// so it uses the same top margin as that section for a consistent rhythm.
//
// This stays a horizontal-scroll shelf, not a wrapping grid, so it can't
// simply reuse ProductGrid — but it gets the same per-card enter/exit and
// reflow animation ProductGrid's cards have, so un-hearting a card from
// right here no longer just makes it vanish.
export default function SavedForLaterShelf() {
  const { items } = useWishlist();
  const shouldReduceMotion = useReducedMotion();

  const sectionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        exit: { opacity: 0, y: 16, transition: { duration: DURATION.fast, ease: EASE } },
      };

  return (
    // The outer AnimatePresence is what lets the whole section (heading
    // included) fade out when the last card is removed, instead of the
    // section hard-cutting away the instant the list empties.
    <AnimatePresence>
      {items.length > 0 && (
        // min-w-0 kept on both the wrapper and the ul even though this
        // section is no longer inside the two-column cart grid it was
        // originally fixed for: it's what stops this horizontally-
        // scrolling shelf from ever being able to drag a flex/grid
        // ancestor wider than intended (see the project's documented
        // history of exactly that bug), and it costs nothing to keep in a
        // plain block container.
        <motion.div
          key="saved-for-later"
          {...sectionProps}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="mt-12 sm:mt-16 min-w-0"
        >
          <h2 className="font-anton text-2xl sm:text-3xl mb-6">SAVED FOR LATER</h2>
          <ul role="list" className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 min-w-0">
            {/* initial={false}: cards already in the shelf when the section
                itself mounts don't each replay an entrance — the section's
                own entrance above covers that. Only a card added afterwards
                (e.g. hearting something in "You Might Also Need") animates in. */}
            <AnimatePresence initial={false}>
              {items.map((product) => (
                // rounded-3xl overflow-hidden here for the same reason
                // ProductGrid's <li> has it everywhere else: ProductCard's
                // own top-left corner is square by design (see PriceBadge's
                // default variant, built to blend into an adjacent button
                // cluster) — every other place this card appears clips it
                // round at the wrapper level.
                //
                // Default (sync) presence mode rather than ProductGrid's
                // popLayout: a removed card holds its slot for the length of
                // its short fade, then the cards after it glide left via
                // layout="position". popLayout would pull it out of flow
                // immediately, which inside a horizontally scrolling
                // container needs extra positioning care to look right.
                <motion.li
                  key={product.slug}
                  layout={shouldReduceMotion ? false : "position"}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9, transition: { duration: DURATION.fast, ease: EASE } }}
                  transition={{ duration: DURATION.base, ease: EASE }}
                  className="w-40 sm:w-48 shrink-0 rounded-3xl overflow-hidden"
                >
                  <ProductCard product={product} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}