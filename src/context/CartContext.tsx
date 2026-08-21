"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartVariant {
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product, quantity?: number, variant?: CartVariant) => void;
  removeItem: (slug: string, selectedColor?: string, selectedSize?: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number = 1, variant?: CartVariant) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.slug === product.slug &&
          item.selectedColor === variant?.selectedColor &&
          item.selectedSize === variant?.selectedSize
      );
      if (existing) {
        return prev.map((item) => (item === existing ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [
        ...prev,
        { ...product, quantity, selectedColor: variant?.selectedColor, selectedSize: variant?.selectedSize },
      ];
    });
  }, []);

  // Keyed by slug + variant, not slug alone — two lines of the same product
  // in different colors/sizes are distinct cart entries and must be
  // removable independently.
  const removeItem = useCallback((slug: string, selectedColor?: string, selectedSize?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.slug === slug && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, itemCount, addItem, removeItem }),
    [items, itemCount, addItem, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
