"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { products, type Product } from "@/data/products";
import { getPromoDiscountPercent, MAX_ITEM_QUANTITY } from "@/lib/pricing";
import { usePersistentState } from "@/lib/usePersistentState";

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartVariant {
  selectedColor?: string;
  selectedSize?: string;
}

/**
 * What actually gets saved: which product, which variant, how many. Name,
 * price, image and stock are looked up from the catalog whenever the cart is
 * read, so a saved cart can never show a stale price.
 */
interface CartLine extends CartVariant {
  slug: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  promoCode: string | null;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  /** The applied promo code, or null when none is applied. */
  promoCode: string | null;
  discountPercent: number;
  /** False until the saved cart has loaded — lets screens avoid flashing an empty cart. */
  isReady: boolean;
  /** Adds a product. With no variant given, the product's first color and size are used, so the same mug always lands on the same cart line. */
  addItem: (product: Product, quantity?: number, variant?: CartVariant) => void;
  removeItem: (slug: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (slug: string, selectedColor: string | undefined, selectedSize: string | undefined, quantity: number) => void;
  clearCart: () => void;
  /** Returns true if the code was valid and is now applied. */
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "mugsys-cart";
const EMPTY_CART: CartState = { lines: [], promoCode: null };

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.slug === "string" &&
    typeof line.quantity === "number" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    (line.selectedColor === undefined || typeof line.selectedColor === "string") &&
    (line.selectedSize === undefined || typeof line.selectedSize === "string")
  );
}

function isCartState(value: unknown): value is CartState {
  if (typeof value !== "object" || value === null) return false;
  const { lines, promoCode } = value as Record<string, unknown>;
  return Array.isArray(lines) && lines.every(isCartLine) && (promoCode === null || typeof promoCode === "string");
}

function isSameLine(line: CartLine, slug: string, selectedColor?: string, selectedSize?: string) {
  return line.slug === slug && line.selectedColor === selectedColor && line.selectedSize === selectedSize;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart, isReady] = usePersistentState(STORAGE_KEY, EMPTY_CART, isCartState);

  const items = useMemo<CartItem[]>(
    () =>
      cart.lines.flatMap((line) => {
        const product = products.find((p) => p.slug === line.slug);
        return product ? [{ ...product, ...line }] : [];
      }),
    [cart.lines]
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const discountPercent = cart.promoCode ? getPromoDiscountPercent(cart.promoCode) : 0;
  const promoCode = discountPercent > 0 ? cart.promoCode : null;

  const addItem = useCallback(
    (product: Product, quantity: number = 1, variant?: CartVariant) => {
      const selectedColor = variant?.selectedColor ?? product.colors[0]?.name;
      const selectedSize = variant?.selectedSize ?? product.sizes[0];

      setCart((prev) => {
        const existing = prev.lines.find((line) => isSameLine(line, product.slug, selectedColor, selectedSize));
        const lines = existing
          ? prev.lines.map((line) =>
              line === existing ? { ...line, quantity: Math.min(MAX_ITEM_QUANTITY, line.quantity + quantity) } : line
            )
          : [
              ...prev.lines,
              { slug: product.slug, quantity: Math.min(MAX_ITEM_QUANTITY, quantity), selectedColor, selectedSize },
            ];
        return { ...prev, lines };
      });
    },
    [setCart]
  );

  const removeItem = useCallback(
    (slug: string, selectedColor?: string, selectedSize?: string) => {
      setCart((prev) => ({
        ...prev,
        lines: prev.lines.filter((line) => !isSameLine(line, slug, selectedColor, selectedSize)),
      }));
    },
    [setCart]
  );

  const updateQuantity = useCallback(
    (slug: string, selectedColor: string | undefined, selectedSize: string | undefined, quantity: number) => {
      setCart((prev) => ({
        ...prev,
        lines: prev.lines.map((line) =>
          isSameLine(line, slug, selectedColor, selectedSize)
            ? { ...line, quantity: Math.min(MAX_ITEM_QUANTITY, Math.max(1, quantity)) }
            : line
        ),
      }));
    },
    [setCart]
  );

  const clearCart = useCallback(() => {
    setCart(EMPTY_CART);
  }, [setCart]);

  const applyPromo = useCallback(
    (code: string) => {
      if (getPromoDiscountPercent(code) === 0) return false;
      setCart((prev) => ({ ...prev, promoCode: code.trim().toUpperCase() }));
      return true;
    },
    [setCart]
  );

  const removePromo = useCallback(() => {
    setCart((prev) => ({ ...prev, promoCode: null }));
  }, [setCart]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      promoCode,
      discountPercent,
      isReady,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyPromo,
      removePromo,
    }),
    [items, itemCount, subtotal, promoCode, discountPercent, isReady, addItem, removeItem, updateQuantity, clearCart, applyPromo, removePromo]
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
