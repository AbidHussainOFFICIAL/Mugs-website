import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/lib/pricing";
import { COMPANY_NAME, DISPATCH_DAYS, DISPATCH_TIME, EDITION_SIZE_LABEL, RETURN_WINDOW_DAYS } from "@/lib/policies";
import { GIFT_MAX_AMOUNT, GIFT_MIN_AMOUNT } from "@/lib/giftCards";

// The text of the three legal pages, as structured sections so the page can
// build its "On this page" list and anchors from the same data.
//
// This is template wording written to match how the site actually works
// today (what it stores, what it charges, how returns run). It is not legal
// advice: have a lawyer review and adapt it before the store takes real
// orders. Where a rule is a store rule (shipping rate, free-shipping
// threshold, return window) it is read from lib/pricing.ts or
// lib/policies.ts so this text can't contradict the cart.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "contact" };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  slug: "privacy" | "terms" | "shipping-returns";
  title: string;
  description: string;
  /** One line shown under the title in the banner's breadcrumb trail and as the page description. */
  intro: string;
  stats?: { value: string; label: string }[];
  sections: LegalSection[];
}

const money = (amount: number) => `$${amount.toFixed(2)}`;

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  title: "PRIVACY POLICY",
  description: "What Mugsy's Mugs collects, why, and the choices you have.",
  intro: "What we collect, why we collect it, and the choices you have.",
  sections: [
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        { type: "p", text: "We collect only what we need to run the store and answer you." },
        {
          type: "list",
          items: [
            "Details you give us: your name, email address, shipping address and order details when you place an order, and whatever you write when you contact us or leave a review.",
            "Details stored on your device: your cart, your wishlist, reviews you have written, and your cookie choice. These stay in your browser's storage and are used to make the site work between visits.",
            "Basic technical information, such as your browser type and the pages you visit, when you choose to allow analytics.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      blocks: [
        {
          type: "list",
          items: [
            "To process, ship and support your orders.",
            "To reply to your messages.",
            "To keep your cart and wishlist between visits.",
            "To understand how the site is used and improve it, if you allow analytics.",
            "To meet our legal and tax obligations.",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      blocks: [
        { type: "p", text: "We group what the site stores on your device into three kinds. You can change your choice at any time from \"Cookie settings\" in the footer." },
        {
          type: "table",
          headers: ["Kind", "What it does", "Your choice"],
          rows: [
            ["Necessary", "Keeps your cart, wishlist, reviews and cookie choice working.", "Always on"],
            ["Analytics", "Helps us see which pages are used so we can improve them.", "Off unless you accept"],
            ["Marketing", "Would be used to measure and personalise advertising.", "Off unless you accept"],
          ],
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      blocks: [
        { type: "p", text: "We do not sell your personal information. We share it only with the services that help us run the store — for example payment processing and shipping carriers — and only what they need to do their job." },
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        { type: "p", text: "We keep order records for as long as the law requires for tax and accounting. Messages you send us are kept for as long as needed to help you. Anything stored in your browser stays there until you clear it." },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        {
          type: "callout",
          title: "If you live in the EU, UK or California",
          text: "You can ask to see the personal information we hold about you, have it corrected or deleted, object to how we use it, or ask for a copy. Contact us and we'll respond within the time the law requires.",
        },
        { type: "p", text: "Wherever you live, you can clear the data stored in your browser at any time, and you can withdraw a cookie choice from \"Cookie settings\" in the footer." },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        { type: "p", text: "The store is not aimed at children under 13, and we don't knowingly collect their personal information." },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        { type: "p", text: "If we change this policy we'll update the date at the top of the page. Significant changes will be called out here." },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [{ type: "p", text: "Questions about your privacy? Reach us any time:" }, { type: "contact" }],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  slug: "terms",
  title: "TERMS OF SERVICE",
  description: "The terms for using the Mugsy's Mugs site and placing orders.",
  intro: "The ground rules for using the site and placing an order.",
  sections: [
    {
      id: "using-the-site",
      title: "Using the site",
      blocks: [
        { type: "p", text: `By using this site you agree to these terms. The site is operated by ${COMPANY_NAME} Please don't misuse it — for example by interfering with how it works or using it for anything unlawful.` },
      ],
    },
    {
      id: "orders-and-pricing",
      title: "Orders and pricing",
      blocks: [
        {
          type: "list",
          items: [
            "Prices are shown in US dollars. Tax and shipping are added at checkout.",
            "An order is accepted when we confirm it by email. We may decline or cancel an order, for example if an item is unavailable or a price was listed in error, and we'll refund anything you've paid.",
            "Product photos are as accurate as we can make them, but colors can look different on different screens.",
          ],
        },
      ],
    },
    {
      id: "limited-edition",
      title: "Limited edition availability",
      blocks: [
        {
          type: "callout",
          title: "When it's gone, it's gone",
          text: `Each design is made in a limited run — never more than ${EDITION_SIZE_LABEL} units worldwide. Stock is first come, first served, and a sold-out design may not be made again.`,
        },
      ],
    },
    {
      id: "gift-cards-and-promo-codes",
      title: "Gift cards and promo codes",
      blocks: [
        {
          type: "callout",
          title: "The short version",
          text: `Gift cards are sold in amounts from $${GIFT_MIN_AMOUNT} to $${GIFT_MAX_AMOUNT} and are not refundable for cash. A promo code applies one discount per order, and free shipping is judged after the discount.`,
        },
        { type: "p", text: "Promo codes have no cash value, can't be combined with one another, and we may withdraw them at any time." },
      ],
    },
    {
      id: "shipping-and-returns",
      title: "Shipping and returns",
      blocks: [
        { type: "p", text: "Shipping rates, delivery times and how returns work are set out on the Shipping & Returns page, which forms part of these terms." },
      ],
    },
    {
      id: "warranty",
      title: "Warranty",
      blocks: [
        { type: "p", text: "Every mug carries a lifetime warranty against defects in materials and workmanship. It doesn't cover normal wear, damage from misuse, or accidents." },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        { type: "p", text: "The designs, photos, text, logos and other content on this site belong to us or our licensors. You may not copy or reuse them without permission, except for the press materials we publish for that purpose." },
      ],
    },
    {
      id: "liability",
      title: "Limit of liability",
      blocks: [
        { type: "p", text: "To the fullest extent the law allows, we aren't liable for indirect or consequential losses arising from your use of the site or our products. Nothing in these terms limits any rights you have by law that can't be limited." },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        { type: "p", text: "We may update these terms from time to time. The date at the top of the page shows when they last changed, and continuing to use the site means you accept the updated terms." },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        { type: "p", text: `These terms are governed by the laws of the jurisdiction in which ${COMPANY_NAME} is registered.` },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [{ type: "p", text: "Questions about these terms? Reach us any time:" }, { type: "contact" }],
    },
  ],
};

export const SHIPPING_RETURNS: LegalDocument = {
  slug: "shipping-returns",
  title: "SHIPPING & RETURNS",
  description: "Shipping rates, delivery times, and how returns and refunds work.",
  intro: "How we ship, and how to send something back.",
  stats: [
    { value: `$${FREE_SHIPPING_THRESHOLD}+`, label: "Free shipping" },
    { value: `${DISPATCH_DAYS} days`, label: "Business days to ship" },
    { value: `${RETURN_WINDOW_DAYS} days`, label: "Return window" },
  ],
  sections: [
    {
      id: "shipping-rates",
      title: "Shipping rates",
      blocks: [
        {
          type: "table",
          headers: ["Order total", "Shipping"],
          rows: [
            [`Under $${FREE_SHIPPING_THRESHOLD}`, `${money(SHIPPING_FLAT_RATE)} flat rate`],
            [`$${FREE_SHIPPING_THRESHOLD} and over`, "Free"],
          ],
        },
        { type: "p", text: "The free-shipping threshold is judged on your order total after any promo code discount." },
      ],
    },
    {
      id: "where-we-ship",
      title: "Where we ship",
      blocks: [
        { type: "p", text: "We currently ship to addresses in the United States. International shipping isn't available yet." },
      ],
    },
    {
      id: "processing-times",
      title: "Processing times",
      blocks: [
        { type: "p", text: `Orders are dispatched within ${DISPATCH_TIME}. Delivery time after that depends on the carrier and your location.` },
      ],
    },
    {
      id: "tracking",
      title: "Tracking your order",
      blocks: [
        { type: "p", text: "We email a tracking link as soon as your order ships. If you haven't received one after the dispatch window, contact us with your order number." },
      ],
    },
    {
      id: "returns",
      title: "How to return an item",
      blocks: [
        {
          type: "callout",
          title: `${RETURN_WINDOW_DAYS}-day returns`,
          text: `Unused items in their original condition can be returned within ${RETURN_WINDOW_DAYS} days of delivery for a full refund.`,
        },
        {
          type: "steps",
          items: [
            { title: "Contact us", text: "Send your order number and the item you'd like to return." },
            { title: "Pack it up", text: "Place the item, unused and in its original packaging, in a sturdy box." },
            { title: "Ship it back", text: "Use the return instructions we send you and keep your tracking number." },
            { title: "Get your refund", text: "We refund your original payment method once we've received and checked the item." },
          ],
        },
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      blocks: [
        { type: "p", text: "Refunds go back to the payment method you used. Original shipping charges aren't refunded unless the return is because we made a mistake." },
      ],
    },
    {
      id: "damaged-or-wrong-items",
      title: "Damaged or incorrect items",
      blocks: [
        { type: "p", text: "If something arrives damaged or isn't what you ordered, contact us right away with your order number and a photo. We'll replace it or refund it, and cover the return shipping." },
      ],
    },
    {
      id: "exclusions",
      title: "What can't be returned",
      blocks: [
        {
          type: "list",
          items: [
            "Gift cards.",
            "Items that have been used, damaged after delivery, or personalised.",
            "Anything marked final sale on its product page.",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Need help?",
      blocks: [{ type: "p", text: "We're happy to help with a shipment or a return:" }, { type: "contact" }],
    },
  ],
};

/** Every legal page, used by the "Related" cards at the foot of each one. */
export const LEGAL_DOCUMENTS: LegalDocument[] = [PRIVACY_POLICY, TERMS_OF_SERVICE, SHIPPING_RETURNS];
