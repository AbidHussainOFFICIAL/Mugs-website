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

export function generateStaticParams() {
  const categoryParams = VALID_CATEGORIES.map((category) => ({ slug: category }));
  const productParams = products.map((product) => ({ slug: product.slug }));
  return [...categoryParams, ...productParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const categoryMeta = CATEGORY_META[slug as ProductCategory];
  if (categoryMeta) {
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

  const category = slug as ProductCategory;
  const categoryMeta = CATEGORY_META[category];

  if (categoryMeta) {
    return (
      <PageShell>
        <ShopPageContent initialCategory={category} />
      </PageShell>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductDetailContent product={product} />;
}
