import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ShopPageContent from "@/components/ShopPageContent";
import ProductDetailContent from "@/components/ProductDetailContent";
import { products, type ProductCategory } from "@/data/products";
import { CATEGORY_META } from "@/lib/categories";

const VALID_CATEGORIES = Object.keys(CATEGORY_META) as ProductCategory[];

// This single [slug] route serves two different things at the same URL depth —
// /shop/travel (a category listing) and /shop/the-classic (a product page) —
// since Next.js requires one dynamic segment name per route level. Category
// slugs are checked first; anything else falls through to a product lookup.
//
// Only the slugs generateStaticParams returns are valid; any other URL is a
// 404 rather than being rendered on demand.
export const dynamicParams = false;

// An exact-match check against the real category list, not a property lookup
// on CATEGORY_META — a lookup would also "find" inherited object names such
// as "constructor" or "toString" and treat them as categories.
function isCategory(slug: string): slug is ProductCategory {
  return VALID_CATEGORIES.some((category) => category === slug);
}

export function generateStaticParams() {
  const categoryParams = VALID_CATEGORIES.map((category) => ({ slug: category }));
  const productParams = products.map((product) => ({ slug: product.slug }));
  return [...categoryParams, ...productParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (isCategory(slug)) {
    const categoryMeta = CATEGORY_META[slug];
    return { title: categoryMeta.title, description: categoryMeta.description };
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — $${product.price}. Part of the Mugsy's Mugs limited edition collection.`,
  };
}

export default async function ShopSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (isCategory(slug)) {
    return (
      <PageShell>
        {/* Keyed so moving between categories remounts the listing with that
            category's own filter state, rather than reusing the last one's. */}
        <ShopPageContent key={slug} initialCategory={slug} />
      </PageShell>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Keyed so moving from one product to another (e.g. via "You may also
  // like") starts with that product's own variant, quantity and cart-drawer
  // state instead of carrying over the previous product's.
  return <ProductDetailContent key={product.slug} product={product} />;
}
