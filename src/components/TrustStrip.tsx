"use client";

import { motion } from "framer-motion";
import { fadeRise, staggerContainer, VIEWPORT } from "@/lib/motion";

const TRUST_ITEMS = [
  {
    label: "Insulated 12hrs",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
  {
    label: "Lifetime Warranty",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    ),
  },
  {
    label: "Free Returns",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />,
  },
  {
    label: "2,000 Units Only",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 0 0 3.182 0l4.318-4.318a2.25 2.25 0 0 0 0-3.182l-9.581-9.581A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <div className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer()}
        className="bg-[#e9ecf6] rounded-4xl px-4 sm:px-8 py-5 sm:py-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-4"
      >
        {TRUST_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            variants={fadeRise}
            className={`flex items-center gap-2.5 w-1/2 sm:w-auto justify-center sm:justify-start px-2 ${
              i > 0 ? "sm:border-l sm:border-[#183fad]/15 sm:pl-6" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#183fad] shrink-0"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            <span className="text-xs sm:text-sm uppercase tracking-wide font-medium text-center sm:text-left">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}