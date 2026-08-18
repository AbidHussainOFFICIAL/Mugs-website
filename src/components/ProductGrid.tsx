"use client";

import { useMemo, useState } from "react";
import { products, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const FILTERS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

export default function ProductGrid() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2 mt-6 sm:mt-8">
        {FILTERS.map((filter) => {
          const isActive = active === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border border-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                isActive ? "bg-[#F1BF0A] text-[#090909]" : "bg-transparent text-[#090909] hover:bg-[#F1BF0A]/10"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <ul role="list" className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 xl:grid-cols-4 mt-6 sm:mt-10">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[#5b5f6b]">No products in this category yet.</p>
      )}
    </div>
  );
}
