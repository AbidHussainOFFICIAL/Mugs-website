// Cart rules and pricing — the single source of truth for every number the
// cart page, drawer, checkout and mobile order bar show. Nothing else in the
// app should hardcode a threshold, rate, limit or promo code.

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FLAT_RATE = 8;
export const TAX_RATE = 0.07;
export const MAX_ITEM_QUANTITY = 10;

// Demo-only: this project has no real backend to validate promo codes
// against, so there is exactly one hardcoded code, defined here and nowhere
// else, rather than a fake validation service.
const DEMO_PROMO_CODE = "MUGSY10";
const DEMO_PROMO_PERCENT = 10;

/** Discount percentage a promo code gives, or 0 if the code isn't valid. */
export function getPromoDiscountPercent(code: string): number {
  return code.trim().toUpperCase() === DEMO_PROMO_CODE ? DEMO_PROMO_PERCENT : 0;
}

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  /** How much more the customer must add, after the discount, to unlock free shipping. */
  freeShippingRemaining: number;
}

/**
 * Every figure is rounded to whole cents before it is used in the next step,
 * so the rows shown on screen always add up to the displayed total. Free
 * shipping is judged on the amount after the promo discount.
 */
export function calculateTotals(subtotal: number, discountPercent: number = 0): OrderTotals {
  const discount = roundToCents((subtotal * discountPercent) / 100);
  const afterDiscount = roundToCents(subtotal - discount);
  const shipping = afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = roundToCents(afterDiscount * TAX_RATE);
  const total = roundToCents(afterDiscount + shipping + tax);
  const freeShippingRemaining = Math.max(0, roundToCents(FREE_SHIPPING_THRESHOLD - afterDiscount));

  return { subtotal, discount, shipping, tax, total, freeShippingRemaining };
}