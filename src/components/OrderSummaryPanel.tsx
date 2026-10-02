"use client";

import { motion, useReducedMotion } from "framer-motion";
import OrderTotals from "@/components/OrderTotals";
import TrustChip from "@/components/TrustChip";
import { PillLink } from "@/components/PillButton";
import { fadeRise, VIEWPORT } from "@/lib/motion";

const CHECKOUT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

export default function OrderSummaryPanel() {
  const shouldReduceMotion = useReducedMotion();

  // The same fadeRise + whileInView treatment TrustStrip, CraftStory and
  // CollectionHeader already use — no new variant, no new duration, just
  // this panel finally getting the entrance every other comparably-weighted
  // section on the site already has. On the desktop sticky sidebar this
  // triggers once, on scroll, like those other sections. Inside the mobile
  // order sheet (StickyMobileOrderBar), the sheet itself remounts this
  // component fresh each time it opens, so the entrance replays each time —
  // a brief compound reveal (sheet slides up, then this fades/rises in
  // immediately after) rather than a redundant repeat of the same motion.
  const entranceProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT, variants: fadeRise };

  return (
    <motion.div {...entranceProps} className="bg-[#4565bc] rounded-4xl p-6 text-white flex flex-col gap-4">
      <h2 className="font-anton text-xl">ORDER SUMMARY</h2>

      <OrderTotals />

      <PillLink href="/checkout" icon={CHECKOUT_ICON} layout="full" focusRing="light" tapFeedback>
        Checkout
      </PillLink>

      <div className="grid grid-cols-3 gap-2">
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h5.61c.484 0 .923.322 1.05.797l1.414 5.303a2.25 2.25 0 0 1-2.17 2.85H16.5m-4.5-8.25v8.25m0 0h-3v-8.25m3 0H9.75"
              />
            </svg>
          }
          label="Free shipping $100+"
        />
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          }
          label="Lifetime warranty"
        />
        <TrustChip
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          }
          label="30-day returns"
        />
      </div>
    </motion.div>
  );
}