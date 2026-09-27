"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { products, type Product } from "@/data/products";
import { usePersistentState } from "@/lib/usePersistentState";

interface WishlistContextValue {
  items: Product[];
  count: number;
  isWishlisted: (slug: string) => boolean;
  /** Saves a product; does nothing if it is already saved (unlike toggleWishlist, it never removes). */
  addToWishlist: (product: Product) => void;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "mugsys-wishlist";
const EMPTY_WISHLIST: string[] = [];

function isSlugList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  // Only slugs are saved; the products themselves are looked up from the
  // catalog, so a saved wishlist can never show stale prices or stock.
  const [slugs, setSlugs] = usePersistentState(STORAGE_KEY, EMPTY_WISHLIST, isSlugList);

  const items = useMemo(
    () =>
      slugs.flatMap((slug) => {
        const product = products.find((p) => p.slug === slug);
        return product ? [product] : [];
      }),
    [slugs]
  );

  const isWishlisted = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const addToWishlist = useCallback(
    (product: Product) => {
      setSlugs((prev) => (prev.includes(product.slug) ? prev : [...prev, product.slug]));
    },
    [setSlugs]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setSlugs((prev) =>
        prev.includes(product.slug) ? prev.filter((slug) => slug !== product.slug) : [...prev, product.slug]
      );
    },
    [setSlugs]
  );

  const count = items.length;

  const value = useMemo(
    () => ({ items, count, isWishlisted, addToWishlist, toggleWishlist }),
    [items, count, isWishlisted, addToWishlist, toggleWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
