"use client";

import type { ProductCategory } from "@/data/products";
import type { SortOption } from "@/lib/useProductFilters";
import FilterDropdown from "@/components/FilterDropdown";
import SortDropdown from "@/components/SortDropdown";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

export interface DesktopFilterRowProps {
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
}

export default function DesktopFilterRow({
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
}: DesktopFilterRowProps) {
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label ?? "Category";

  return (
    <div className="hidden lg:flex items-center gap-3">
      <FilterDropdown label={categoryLabel} active={category !== "all"}>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                category === c.value ? "bg-[#F1BF0A]/20 font-medium" : "hover:bg-[#e9ecf6]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown label={maxPrice < priceCeiling ? `Under $${maxPrice}` : "Price"} active={maxPrice < priceCeiling}>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[#5b5f6b]">Up to ${maxPrice}</span>
          <input
            type="range"
            min={priceFloor}
            max={priceCeiling}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#183fad]"
            aria-label="Maximum price"
          />
        </label>
      </FilterDropdown>

      <FilterDropdown label="Availability" active={inStockOnly}>
        <button type="button" role="switch" aria-checked={inStockOnly} onClick={() => setInStockOnly(!inStockOnly)} className="flex items-center gap-3">
          <span className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${inStockOnly ? "bg-[#F1BF0A]" : "bg-[#e9ecf6]"}`}>
            <span className={`inline-block size-4 transform rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-1"}`} />
          </span>
          <span className="text-sm font-medium">In Stock Only</span>
        </button>
      </FilterDropdown>

      <SortDropdown value={sort} onChange={setSort} />
    </div>
  );
}
