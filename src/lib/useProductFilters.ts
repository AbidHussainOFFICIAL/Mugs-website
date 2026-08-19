"use client";

import { useMemo, useState } from "react";
import { products as allProducts, type Product, type ProductCategory } from "@/data/products";

export type SortOption = "featured" | "price-asc" | "price-desc";

export const PRICE_CEILING = Math.max(...allProducts.map((p) => p.price));
export const PRICE_FLOOR = Math.min(...allProducts.map((p) => p.price));

interface UseProductFiltersOptions {
  source?: Product[];
  initialCategory?: ProductCategory | "all";
}

export function useProductFilters({ source = allProducts, initialCategory = "all" }: UseProductFiltersOptions = {}) {
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let result = source.filter((p) => (category === "all" ? true : p.category === category));
    result = result.filter((p) => p.price <= maxPrice);
    if (inStockOnly) result = result.filter((p) => p.inStock);

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [source, category, maxPrice, inStockOnly, sort]);

  const activeFilters = useMemo(() => {
    const active: { key: string; label: string; clear: () => void }[] = [];

    if (category !== "all") {
      active.push({
        key: "category",
        label: category.charAt(0).toUpperCase() + category.slice(1),
        clear: () => setCategory("all"),
      });
    }
    if (maxPrice < PRICE_CEILING) {
      active.push({ key: "price", label: `Under $${maxPrice}`, clear: () => setMaxPrice(PRICE_CEILING) });
    }
    if (inStockOnly) {
      active.push({ key: "stock", label: "In Stock Only", clear: () => setInStockOnly(false) });
    }

    return active;
  }, [category, maxPrice, inStockOnly]);

  function clearAll() {
    setCategory("all");
    setMaxPrice(PRICE_CEILING);
    setInStockOnly(false);
  }

  return {
    filtered,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    inStockOnly,
    setInStockOnly,
    sort,
    setSort,
    activeFilters,
    clearAll,
  };
}
