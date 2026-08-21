"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import PriceBadge from "@/components/PriceBadge";
import RatingStars from "@/components/RatingStars";
import VariantSelectors from "@/components/VariantSelectors";
import QuantityStepper from "@/components/QuantityStepper";
import AddToCartButton from "@/components/AddToCartButton";
import TrustChip from "@/components/TrustChip";
import Accordion from "@/components/Accordion";
import ReviewsSection from "@/components/ReviewsSection";
import StickyMobileCartBar from "@/components/StickyMobileCartBar";
import ProductGrid from "@/components/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";
import { useReviews } from "@/context/ReviewsContext";
import { products, type Product } from "@/data/products";

const CARE_ACCORDION_ITEMS = [
  {
    title: "Description",
    content:
      "Engineered for everyday adventures — durable, lightweight, and built to move with you wherever the journey leads. Part of a limited run of 2,000 units worldwide.",
  },
  {
    title: "Materials & Care",
    content:
      "18/8 stainless steel, double-walled, powder-coated finish. Hand wash recommended to preserve the exterior coating; top-rack dishwasher safe.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Orders ship within 3–5 business days. Free shipping on orders over $100. Unused items can be returned within 30 days of delivery for a full refund.",
  },
  {
    title: "Specifications",
    content: "Capacity: 12 oz (355 ml). Insulation: Hot 12 hrs · Cold 24 hrs. Weight: 310 g. Dishwasher safe: yes, top rack.",
  },
];

export default function ProductDetailContent({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { getRatingSummary } = useReviews();
  const wishlisted = isWishlisted(product.slug);
  const summary = getRatingSummary(product.slug);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const related = (sameCategory.length > 0 ? sameCategory : products.filter((p) => p.slug !== product.slug)).slice(0, 4);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />

      <main className="max-w-[1400px] w-full mx-auto mt-6 sm:mt-8 mb-20">
        <Breadcrumb
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[55%_1fr]">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="flex flex-col gap-3">
            <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl leading-tight">{product.name.toUpperCase()}</h1>

            {summary.count > 0 ? (
              <a href="#reviews" className="flex items-center gap-1.5 w-fit">
                <RatingStars rating={summary.average} />
                <span className="text-sm text-[#090909]/70">
                  {summary.average.toFixed(1)} · {summary.count} {summary.count === 1 ? "review" : "reviews"}
                </span>
              </a>
            ) : (
              <a href="#reviews" className="text-sm text-[#090909]/70 w-fit">
                No reviews yet
              </a>
            )}

            <PriceBadge price={product.price} originalPrice={product.originalPrice} size="large" className="w-fit mt-1" />

            <p className="text-sm sm:text-base max-w-md mt-1">
              Engineered for everyday adventures. Durable, lightweight, and built to move with you wherever the
              journey leads.
            </p>

            {(product.colors.length > 0 || product.sizes.length > 1) && (
              <div className="mt-2">
                <VariantSelectors
                  colors={product.colors}
                  sizes={product.sizes}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
              </div>
            )}

            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm font-medium">Quantity</span>
              <QuantityStepper quantity={quantity} onChange={setQuantity} />
            </div>

            <div id="add-to-cart-anchor" className="flex gap-3 mt-2">
              <AddToCartButton
                product={product}
                quantity={quantity}
                selectedColor={selectedColor || undefined}
                selectedSize={selectedSize || undefined}
              />
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                className="flex items-center justify-center size-11 rounded-full border border-[#F1BF0A] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={wishlisted ? "#F1BF0A" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={wishlisted ? "#F1BF0A" : "currentColor"}
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              <TrustChip
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h5.61c.484 0 .923.322 1.05.797l1.414 5.303a2.25 2.25 0 0 1-2.17 2.85H16.5m-4.5-8.25v8.25m0 0h-3v-8.25m3 0H9.75"
                    />
                  </svg>
                }
                label="Free shipping $100+"
              />
              <TrustChip
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                }
                label="Lifetime warranty"
              />
              <TrustChip
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                  </svg>
                }
                label="30-day returns"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 max-w-2xl">
          <Accordion items={CARE_ACCORDION_ITEMS} />
        </div>

        <div className="mt-12 sm:mt-16">
          <ReviewsSection productSlug={product.slug} />
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="font-anton text-2xl sm:text-3xl mb-6">YOU MAY ALSO LIKE</h2>
          <ProductGrid products={related} />
        </div>
      </main>

      <StickyMobileCartBar product={product} anchorId="add-to-cart-anchor" />

      <Footer />
    </div>
  );
}
