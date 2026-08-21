"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductCategory } from "@/data/products";
import type { SortOption } from "@/lib/useProductFilters";
import { DURATION } from "@/lib/motion";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

type DropdownKey = "category" | "price" | "stock" | "sort";

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

const TriggerButton = forwardRef<
  HTMLButtonElement,
  { label: string; active: boolean; isOpen: boolean; onClick: () => void }
>(({ label, active, isOpen, onClick }, ref) => (
  <motion.button
    ref={ref}
    type="button"
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    aria-haspopup="true"
    aria-expanded={isOpen}
    className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
      active ? "bg-[#F1BF0A] border-[#F1BF0A]" : "border-[#F1BF0A] bg-transparent hover:bg-[#F1BF0A]/10"
    }`}
  >
    <span>{label}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </motion.button>
));
TriggerButton.displayName = "TriggerButton";

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
  // A single piece of state — at most one panel key can be truthy at once —
  // so it is structurally impossible for two dropdown panels to be mounted
  // (and therefore visible/animating) at the same time.
  const [open, setOpen] = useState<DropdownKey | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<DropdownKey, HTMLButtonElement | null>>>({});

  // The slider's own displayed position updates instantly on every drag tick
  // (via localMaxPrice) for a responsive feel, but the value actually passed
  // to setMaxPrice — which cascades into re-filtering and re-animating the
  // whole product grid — is debounced. Without this, dragging the slider
  // fires a fresh grid re-filter/re-animation on every pixel of movement,
  // and those overlapping, half-finished animations are what looked like a
  // "flash" during rearrangement.
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (localMaxPrice === maxPrice) return;
    const timeout = setTimeout(() => setMaxPrice(localMaxPrice), 200);
    return () => clearTimeout(timeout);
  }, [localMaxPrice, maxPrice, setMaxPrice]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function toggle(key: DropdownKey) {
    setOpen((current) => {
      const next = current === key ? null : key;
      if (next) {
        const trigger = triggerRefs.current[next];
        if (trigger && rowRef.current) {
          const rowRect = rowRef.current.getBoundingClientRect();
          const triggerRect = trigger.getBoundingClientRect();
          setPanelLeft(triggerRect.left - rowRect.left);
        }
      }
      return next;
    });
  }

  function close() {
    setOpen(null);
  }

  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label ?? "Category";
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <div ref={rowRef} className="hidden lg:flex items-center gap-3 relative">
      <TriggerButton
        ref={(el) => {
          triggerRefs.current.category = el;
        }}
        label={categoryLabel}
        active={category !== "all"}
        isOpen={open === "category"}
        onClick={() => toggle("category")}
      />
      <TriggerButton
        ref={(el) => {
          triggerRefs.current.price = el;
        }}
        label={localMaxPrice < priceCeiling ? `Under $${localMaxPrice}` : "Price"}
        active={localMaxPrice < priceCeiling}
        isOpen={open === "price"}
        onClick={() => toggle("price")}
      />
      <TriggerButton
        ref={(el) => {
          triggerRefs.current.stock = el;
        }}
        label="Availability"
        active={inStockOnly}
        isOpen={open === "stock"}
        onClick={() => toggle("stock")}
      />
      <TriggerButton
        ref={(el) => {
          triggerRefs.current.sort = el;
        }}
        label={sortLabel}
        active={false}
        isOpen={open === "sort"}
        onClick={() => toggle("sort")}
      />

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: DURATION.fast }}
            style={{ transformOrigin: "top left", left: panelLeft }}
            className="absolute top-full z-30 mt-2 w-64 rounded-2xl bg-white shadow-lg border border-[#183fad]/10 p-4"
          >
            {open === "category" && (
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      setCategory(c.value);
                      close();
                    }}
                    className={`text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      category === c.value ? "bg-[#F1BF0A]/20 font-medium" : "hover:bg-[#e9ecf6]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {open === "price" && (
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
            )}

            {open === "stock" && (
              <button
                type="button"
                role="switch"
                aria-checked={inStockOnly}
                onClick={() => setInStockOnly(!inStockOnly)}
                className="flex items-center gap-3"
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
              </button>
            )}

            {open === "sort" && (
              <div className="flex flex-col gap-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={sort === option.value}
                    onClick={() => {
                      setSort(option.value);
                      close();
                    }}
                    className={`text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      sort === option.value ? "bg-[#F1BF0A]/20 font-medium" : "hover:bg-[#e9ecf6]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
