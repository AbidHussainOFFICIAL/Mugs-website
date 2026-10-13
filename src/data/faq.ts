import { FREE_SHIPPING_THRESHOLD, MAX_ITEM_QUANTITY, SHIPPING_FLAT_RATE } from "@/lib/pricing";
import { DISPATCH_TIME, EDITION_SIZE_LABEL, RETURN_WINDOW_DAYS } from "@/lib/policies";
import { GIFT_MAX_AMOUNT, GIFT_MIN_AMOUNT } from "@/lib/giftCards";

// Questions and answers for the FAQ page. Every number that is also a store
// rule is read from lib/pricing.ts, lib/policies.ts or lib/giftCards.ts, so
// an answer can't drift from what the cart and checkout actually do.
//
// Placeholder copy: edit freely. Keep each `id` stable once published —
// it is the question's deep link (/faq#how-much-is-shipping).

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "orders",
    label: "Orders",
    items: [
      {
        id: "how-do-i-place-an-order",
        question: "How do I place an order?",
        answer:
          "Add any mug to your cart, then head to checkout from the cart drawer or the cart page. Your cart is saved on this device, so it will still be there if you come back later.",
      },
      {
        id: "can-i-change-or-cancel-an-order",
        question: "Can I change or cancel an order?",
        answer:
          "Orders move into dispatch quickly. Contact us as soon as you can with your order number and we'll do our best to make the change before it ships.",
      },
      {
        id: "how-do-i-use-a-promo-code",
        question: "How do I use a promo code?",
        answer:
          "Enter it in the promo code field on the cart page. One code can be applied per order, and free shipping is judged on the total after the discount.",
      },
      {
        id: "is-there-a-limit-per-item",
        question: "Is there a limit per item?",
        answer: `Yes — up to ${MAX_ITEM_QUANTITY} of the same mug, in the same color and size, per order.`,
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    items: [
      {
        id: "how-much-is-shipping",
        question: "How much is shipping?",
        answer: `Shipping is free on orders over $${FREE_SHIPPING_THRESHOLD}, calculated after any discount. Below that it's a flat $${SHIPPING_FLAT_RATE.toFixed(2)}.`,
      },
      {
        id: "how-long-until-my-order-ships",
        question: "How long until my order ships?",
        answer: `Orders are dispatched within ${DISPATCH_TIME}. Delivery time after that depends on the carrier and where you are.`,
      },
      {
        id: "can-i-track-my-order",
        question: "Can I track my order?",
        answer: "Yes. A tracking link is emailed as soon as your order ships.",
      },
      {
        id: "where-do-you-ship",
        question: "Where do you ship?",
        answer: "Our shipping regions and rates are listed on the Shipping & Returns page, which is always the most current source.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    items: [
      {
        id: "what-is-your-return-policy",
        question: "What is your return policy?",
        answer: `Unused items in their original condition can be returned within ${RETURN_WINDOW_DAYS} days of delivery for a full refund.`,
      },
      {
        id: "how-do-i-start-a-return",
        question: "How do I start a return?",
        answer: "Contact us with your order number and we'll send you return instructions. The Shipping & Returns page walks through each step.",
      },
      {
        id: "when-will-i-get-my-refund",
        question: "When will I get my refund?",
        answer: "Refunds go back to your original payment method once we've received and checked the returned item.",
      },
      {
        id: "what-if-my-mug-arrives-damaged",
        question: "What if my mug arrives damaged?",
        answer: "Tell us right away with your order number and a photo, and we'll replace it or refund it.",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    items: [
      {
        id: "what-are-the-mugs-made-from",
        question: "What are the mugs made from?",
        answer: "18/8 stainless steel, double-walled, with a powder-coated finish that resists chips and scratches.",
      },
      {
        id: "how-long-do-drinks-stay-hot-or-cold",
        question: "How long do drinks stay hot or cold?",
        answer: "Up to 12 hours hot and 24 hours cold.",
      },
      {
        id: "how-do-i-clean-my-mug",
        question: "How do I clean my mug?",
        answer: "Hand washing is recommended to protect the exterior coating. They're also top-rack dishwasher safe.",
      },
      {
        id: "why-only-a-limited-run",
        question: "Why is each design a limited run?",
        answer: `Every design is made in small batches — never more than ${EDITION_SIZE_LABEL} units worldwide — so each one stays special. When a design sells out, that's it.`,
      },
      {
        id: "is-there-a-warranty",
        question: "Is there a warranty?",
        answer: "Every mug comes with a lifetime warranty against defects in materials and workmanship.",
      },
    ],
  },
  {
    id: "gift-cards",
    label: "Gift Cards",
    items: [
      {
        id: "how-do-gift-cards-work",
        question: "How do gift cards work?",
        answer: `Choose an amount from $${GIFT_MIN_AMOUNT} to $${GIFT_MAX_AMOUNT}, add a recipient and an optional message, and we'll email the gift card to them.`,
      },
      {
        id: "can-i-schedule-a-gift-card",
        question: "Can I schedule a gift card for later?",
        answer: "Yes. Pick \"Schedule\" when you buy it and choose the day you'd like it to arrive.",
      },
      {
        id: "how-do-i-check-a-balance",
        question: "How do I check a balance?",
        answer: "Open the Redeem tab on the Gift cards page and enter the code from the email.",
      },
      {
        id: "do-gift-cards-expire",
        question: "Do gift cards expire?",
        answer: "Gift card terms, including expiry, are set out in our Terms of Service.",
      },
    ],
  },
];

/** Finds which category a question id belongs to, or null if the id isn't a question. */
export function findFaqCategoryId(itemId: string): string | null {
  const category = FAQ_CATEGORIES.find((c) => c.items.some((item) => item.id === itemId));
  return category ? category.id : null;
}
