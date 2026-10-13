// Store facts that more than one page states — the contact details, the
// return window, how long dispatch takes. The Shipping & Returns page, the
// FAQ, the Contact page and the Gift cards page all read from here, so a
// change is made once and can't leave one page contradicting another.
//
// Money rules (free-shipping threshold, flat shipping rate, tax, promo code)
// live in lib/pricing.ts — that file is what the cart and checkout run on,
// so pages that mention them import from there rather than copying numbers.
//
// Placeholder content: the contact details below are sample values, not a
// real support desk. Replace them before launch.

export const COMPANY_NAME = "Mugsy's Mugs, Inc.";

/** Units in the limited edition run, as a number. */
export const EDITION_SIZE = 2000;
export const EDITION_SIZE_LABEL = EDITION_SIZE.toLocaleString("en-US");

export const RETURN_WINDOW_DAYS = 30;
/** The range of business days before an order ships, for places that show it as a figure ("3–5 days"). */
export const DISPATCH_DAYS = "3–5";
export const DISPATCH_TIME = `${DISPATCH_DAYS} business days`;

export const SUPPORT = {
  email: "support@mugsysmugs.com",
  phone: "(555) 010-0142",
  hours: "Mon–Fri, 9am–5pm PT",
  replyTime: "Within 1 business day",
} as const;

export const PRESS_EMAIL = "press@mugsysmugs.com";

/** Shown on every legal page as "Last updated …". */
export const LEGAL_LAST_UPDATED = "Oct 11, 2026";
