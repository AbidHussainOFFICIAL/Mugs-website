"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/products";

interface WishlistContextValue {
  items: Product[];
  count: number;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "mugsys-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const hydrated = useRef(false);

  // Load any previously saved wishlist once, on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Malformed storage — ignore and start fresh.
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Persist on every change, but only after the initial load above has run —
  // otherwise this would immediately overwrite saved data with an empty array.
  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = useCallback((slug: string) => items.some((item) => item.slug === slug), [items]);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((item) => item.slug === product.slug)
        ? prev.filter((item) => item.slug !== product.slug)
        : [...prev, product]
    );
  }, []);

  const count = items.length;

  const value = useMemo(
    () => ({ items, count, isWishlisted, toggleWishlist }),
    [items, count, isWishlisted, toggleWishlist]
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
