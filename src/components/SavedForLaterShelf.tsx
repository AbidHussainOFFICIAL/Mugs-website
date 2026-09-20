"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

export default function SavedForLaterShelf() {
  const { items } = useWishlist();

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, ease: EASE }}
      className="mt-8"
    >
      <h2 className="font-anton text-lg mb-4">SAVED FOR LATER</h2>
      <ul role="list" className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {items.map((product) => (
          <li key={product.slug} className="w-40 sm:w-48 shrink-0">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}