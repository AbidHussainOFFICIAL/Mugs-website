"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import SearchInput from "@/components/SearchInput";
import DesktopFilterRow from "@/components/DesktopFilterRow";
import MobileFilterSheet from "@/components/MobileFilterSheet";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { products as allProducts } from "@/data/products";
import { useProductFilters, PRICE_CEILING, PRICE_FLOOR } from "@/lib/useProductFilters";

function matchesQuery(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export default function SearchPageContent() {
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const searchResults = useMemo(() => matchesQuery(query), [query]);

  const {
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
  } = useProductFilters({ source: searchResults });

  const filterProps = {
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    priceCeiling: PRICE_CEILING,
    priceFloor: PRICE_FLOOR,
    inStockOnly,
    setInStockOnly,
    sort,
    setSort,
  };

  const hasQuery = query.trim().length > 0;

  return (
    <>
      <PageHeaderBanner
        title="SEARCH"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Search" }]}
        count={hasQuery ? `${filtered.length} ${filtered.length === 1 ? "Result" : "Results"}` : undefined}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8 mb-20">
        <SearchInput value={query} onChange={setQuery} autoFocus placeholder="Search mugs by name or category..." />

        {hasQuery && (
          <>
            <div className="lg:hidden flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
              >
                Sort
              </button>
            </div>

            <MobileFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} resultCount={filtered.length} {...filterProps} clearAll={clearAll} />

            <div className="mt-6">
              <DesktopFilterRow {...filterProps} />
            </div>

            <ActiveFilterChips filters={activeFilters} onClearAll={clearAll} />

            <ProductGrid
              products={filtered}
              desktopColumns={5}
              emptyState={
                <EmptyState
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#090909" className="size-7" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  }
                  title={`No mugs match "${query}"`}
                  description="Try a different search term or browse the full collection."
                  ctaLabel="Browse Shop"
                  ctaHref="/shop"
                />
              }
            />

            {filtered.length > 0 && (
              <p className="mt-10 text-center text-sm text-[#5b5f6b]">
                Didn&apos;t find what you&apos;re looking for?{" "}
                <Link href="/shop" className="text-[#183fad] underline underline-offset-2">
                  Browse the full shop
                </Link>
              </p>
            )}
          </>
        )}
      </main>
    </>
  );
}
