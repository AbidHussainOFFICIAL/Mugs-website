"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products as allProducts, type Product, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

const FILTERS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

interface ProductGridProps {
  /** Pre-filtered list to render. Omit to use the full catalog with the built-in category pills (default — landing page behavior, unchanged). */
  products?: Product[];
  /** Rich empty-state to render instead of the plain text fallback. */
  emptyState?: ReactNode;
  emptyMessage?: string;
  /** Renders a skeleton grid instead of products. */
  loading?: boolean;
  /** Shows the wishlist heart on mobile too (used by the Wishlist page, where removing IS the primary action). */
  showWishlistOnMobile?: boolean;
  /** Hides the add-to-cart button on mobile — used by the Wishlist page so only the heart (remove) icon shows, avoiding two icons crowding/clipping on small screens. */
  showCartOnMobile?: boolean;
  /** Grid columns at the xl breakpoint. Default 4 (unchanged Home page layout); pass 5 on pages with no sidebar eating width. */
  desktopColumns?: 4 | 5;
}

export default function ProductGrid({
  products,
  emptyState,
  emptyMessage = "No products in this category yet.",
  loading = false,
  showWishlistOnMobile = false,
  showCartOnMobile = true,
  desktopColumns = 4,
}: ProductGridProps) {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (products) return products;
    return active === "all" ? allProducts : allProducts.filter((p) => p.category === active);
  }, [products, active]);

  if (loading) {
    return <SkeletonGrid />;
  }

  return (
    <div>
      {!products && (
        <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2 mt-6 sm:mt-8">
          {FILTERS.map((filter) => {
            const isActive = active === filter.value;
            return (
              <motion.button
                key={filter.value}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(filter.value)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border border-[#F1BF0A] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                  isActive ? "bg-[#F1BF0A] text-[#090909]" : "bg-transparent text-[#090909] hover:bg-[#F1BF0A]/10"
                }`}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </div>
      )}

      {filtered.length > 0 ? (
        <ul role="list" className={`grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 ${desktopColumns === 5 ? "xl:grid-cols-5" : "xl:grid-cols-4"} mt-6 sm:mt-10`}>
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.li
                key={product.slug}
                layout={shouldReduceMotion ? false : "position"}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VIEWPORT}
                exit={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 0, scale: 0.9, transition: { duration: DURATION.fast, ease: EASE } }
                }
                transition={{
                  layout: { type: "spring", stiffness: 350, damping: 35, mass: 0.8 },
                  duration: DURATION.base,
                  ease: EASE,
                  delay: shouldReduceMotion ? 0 : Math.min(index, 8) * 0.04,
                }}
                className="col-span-1 flex flex-col rounded-3xl overflow-hidden"
              >
                <ProductCard product={product} showWishlistOnMobile={showWishlistOnMobile} showCartOnMobile={showCartOnMobile} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : emptyState ? (
        emptyState
      ) : (
        <p className="mt-10 text-center text-[#5b5f6b]">{emptyMessage}</p>
      )}
    </div>
  );
}
