import type { ProductCategory } from "@/data/products";

export const CATEGORY_META: Record<ProductCategory, { title: string; description: string }> = {
  travel: {
    title: "TRAVEL MUGS",
    description: "Insulated, spill-ready mugs built for the daily commute and beyond.",
  },
  camp: {
    title: "CAMP MUGS",
    description: "Rugged mugs made for campsites, trailheads, and mornings outdoors.",
  },
  gift: {
    title: "GIFT MUGS",
    description: "Thoughtful picks for the mug lover in your life.",
  },
};

export const CATEGORY_OPTIONS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Camp", value: "camp" },
  { label: "Gift", value: "gift" },
];

export function getCategoryTitle(category: ProductCategory | "all"): string {
  return category === "all" ? "SHOP ALL" : CATEGORY_META[category].title;
}

export type SortOption = "featured" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];