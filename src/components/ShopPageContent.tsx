"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import DesktopFilterRow from "@/components/DesktopFilterRow";
import MobileFilterSheet from "@/components/MobileFilterSheet";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { useProductFilters, PRICE_CEILING, PRICE_FLOOR } from "@/lib/useProductFilters";
import type { ProductCategory } from "@/data/products";

interface Crumb {
  label: string;
  href?: string;
}

export default function ShopPageContent({
  initialCategory,
  title,
  breadcrumb,
}: {
  initialCategory?: ProductCategory;
  title: string;
  breadcrumb: Crumb[];
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
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

  return (
    <>
      <PageHeaderBanner
        title={title}
        breadcrumb={breadcrumb}
        count={`${filtered.length} ${filtered.length === 1 ? "Mug" : "Mugs"}`}
      />

      <main className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8 mb-20">
        <div className="lg:hidden flex gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setSheetOpen(true)}
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
            onClick={() => setSheetOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 21m0 0L21 16.5m-3.75 4.5V3" />
            </svg>
            Sort
          </motion.button>
        </div>

        <MobileFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} resultCount={filtered.length} {...filterProps} clearAll={clearAll} />

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
