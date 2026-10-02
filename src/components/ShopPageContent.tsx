"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import DesktopFilterRow from "@/components/DesktopFilterRow";
import MobileFilterSheet from "@/components/MobileFilterSheet";
import MobileSortSheet from "@/components/MobileSortSheet";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { useProductFilters, PRICE_CEILING, PRICE_FLOOR } from "@/lib/useProductFilters";
import { getCategoryTitle } from "@/lib/categories";
import type { ProductCategory } from "@/data/products";

export default function ShopPageContent({ initialCategory }: { initialCategory?: ProductCategory }) {
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
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
  } = useProductFilters({ initialCategory: initialCategory ?? "all" });

  // Passed to DesktopFilterRow, which needs sort alongside the rest.
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

  // Passed to MobileFilterSheet, which is filter-only now — sort has its
  // own sheet (MobileSortSheet) so the two mobile trigger buttons open
  // distinct panels instead of both landing on the same combined sheet.
  const mobileFilterProps = {
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    priceCeiling: PRICE_CEILING,
    priceFloor: PRICE_FLOOR,
    inStockOnly,
    setInStockOnly,
  };

  // The title and breadcrumb always describe the category currently
  // selected in the filter — not just the one the URL loaded with — so
  // switching categories from the pill row updates the heading too.
  const title = getCategoryTitle(category);
  const breadcrumb =
    category === "all"
      ? [{ label: "Home", href: "/" }, { label: "Shop" }]
      : [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: title }];

  return (
    <>
      <PageHeaderBanner
        title={title}
        breadcrumb={breadcrumb}
        count={`${filtered.length} ${filtered.length === 1 ? "Mug" : "Mugs"}`}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8 flex-1">
        <div className="lg:hidden flex gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setFilterSheetOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Filter
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setSortSheetOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 21m0 0L21 16.5m-3.75 4.5V3" />
            </svg>
            Sort
          </motion.button>
        </div>

        <MobileFilterSheet
          open={filterSheetOpen}
          onClose={() => setFilterSheetOpen(false)}
          resultCount={filtered.length}
          {...mobileFilterProps}
          clearAll={clearAll}
        />
        <MobileSortSheet open={sortSheetOpen} onClose={() => setSortSheetOpen(false)} value={sort} onChange={setSort} />

        <DesktopFilterRow {...filterProps} />

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
              title="No mugs match these filters"
              description="Try adjusting or clearing your filters to see more products."
              ctaLabel="Clear Filters"
              onCtaClick={clearAll}
            />
          }
        />
      </main>
    </>
  );
}
