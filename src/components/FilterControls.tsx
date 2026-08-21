"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ProductCategory } from "@/data/products";
import type { SortOption } from "@/lib/useProductFilters";
import SortDropdown from "@/components/SortDropdown";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

export interface FilterControlsProps {
  category: ProductCategory | "all";
  setCategory: (value: ProductCategory | "all") => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  priceCeiling: number;
  priceFloor: number;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  clearAll: () => void;
}

export default function FilterControls({
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  priceCeiling,
  priceFloor,
  inStockOnly,
  setInStockOnly,
  sort,
  setSort,
  clearAll,
}: FilterControlsProps) {
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (localMaxPrice === maxPrice) return;
    const timeout = setTimeout(() => setMaxPrice(localMaxPrice), 200);
    return () => clearTimeout(timeout);
  }, [localMaxPrice, maxPrice, setMaxPrice]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-anton text-sm tracking-wide mb-2">SORT</h3>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div>
        <h3 className="font-anton text-sm tracking-wide mb-2">CATEGORY</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = category === c.value;
            return (
              <motion.button
                key={c.value}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setCategory(c.value)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border border-[#F1BF0A] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                  isActive ? "bg-[#F1BF0A] text-[#090909]" : "bg-transparent text-[#090909] hover:bg-[#F1BF0A]/10"
                }`}
              >
                {c.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-anton text-sm tracking-wide mb-2">PRICE</h3>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[#5b5f6b]">Up to ${localMaxPrice}</span>
          <input
            type="range"
            min={priceFloor}
            max={priceCeiling}
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
            className="w-full accent-[#183fad]"
            aria-label="Maximum price"
          />
        </label>
      </div>

      <div>
        <h3 className="font-anton text-sm tracking-wide mb-2">AVAILABILITY</h3>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          role="switch"
          aria-checked={inStockOnly}
          onClick={() => setInStockOnly(!inStockOnly)}
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded-full"
        >
          <span
            className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${
              inStockOnly ? "bg-[#F1BF0A]" : "bg-[#e9ecf6]"
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                inStockOnly ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </span>
          <span className="text-sm font-medium">In Stock Only</span>
        </motion.button>
      </div>

      <button
        type="button"
        onClick={clearAll}
        className="text-sm text-[#183fad] underline underline-offset-2 self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
      >
        Clear all
      </button>
    </div>
  );
}
