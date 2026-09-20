"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PriceBadge from "@/components/PriceBadge";
import QuantityStepper from "@/components/QuantityStepper";
import type { CartItem } from "@/context/CartContext";
import { products } from "@/data/products";
import { DURATION, EASE } from "@/lib/motion";

export default function CartLineItem({
  item,
  size = "full",
  onQuantityChange,
  onRemove,
  onSaveForLater,
}: {
  item: CartItem;
  size?: "compact" | "full";
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onSaveForLater?: () => void;
}) {
  const liveProduct = products.find((p) => p.slug === item.slug);
  const outOfStock = liveProduct ? !liveProduct.inStock : false;
  const isCompact = size === "compact";

  return (
    <motion.div
      layout
      initial={false}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: DURATION.base, ease: EASE }}
      className={`flex gap-3 ${isCompact ? "py-3" : "py-4"} border-b border-[#e9ecf6] overflow-hidden`}
    >
      <Link
        href={`/shop/${item.slug}`}
        className={`shrink-0 rounded-2xl overflow-hidden ${isCompact ? "size-16" : "size-24 sm:size-28"} ${outOfStock ? "opacity-50" : ""}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={isCompact ? 64 : 112}
          height={isCompact ? 64 : 112}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/shop/${item.slug}`}
              className={`block truncate font-semibold hover:underline ${isCompact ? "text-sm" : "text-base sm:text-lg"}`}
            >
              {item.name}
            </Link>
            {(item.selectedColor || item.selectedSize) && (
              <p className="text-xs text-[#090909]/60">
                {item.selectedColor}
                {item.selectedColor && item.selectedSize ? " · " : ""}
                {item.selectedSize}
              </p>
            )}
          </div>

          {isCompact && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${item.name} from cart`}
              className="shrink-0 p-1 text-[#090909]/40 hover:text-[#090909]/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {outOfStock ? (
          <span className="inline-flex w-fit items-center rounded-full bg-[#e9ecf6] px-2.5 py-1 text-xs font-medium text-[#5b5f6b]">
            Out of stock
          </span>
        ) : isCompact ? (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="line-through text-[#b7bac5] text-xs">${item.originalPrice}</span>
            <span className="font-semibold">${item.price}</span>
          </div>
        ) : (
          <PriceBadge price={item.price} originalPrice={item.originalPrice} className="w-fit" />
        )}

        <div className="flex items-center justify-between gap-3 mt-0.5">
          {!outOfStock && <QuantityStepper quantity={item.quantity} onChange={onQuantityChange} size={isCompact ? "sm" : "lg"} />}

          {!isCompact && (
            <div className="flex items-center gap-3 ml-auto">
              {onSaveForLater && (
                <button
                  type="button"
                  onClick={onSaveForLater}
                  className="flex items-center gap-1.5 text-sm text-[#183fad] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Save for later
                </button>
              )}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                aria-label={`Remove ${item.name} from cart`}
                className="flex items-center justify-center size-8 rounded-full bg-[#e9ecf6] text-[#5b5f6b] hover:bg-[#dde2ef] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}