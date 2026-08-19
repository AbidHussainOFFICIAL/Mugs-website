import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ShopPageContent from "@/components/ShopPageContent";
import { products, type ProductCategory } from "@/data/products";

const CATEGORY_META: Record<ProductCategory, { title: string; description: string }> = {
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
      <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
        <Navbar />
        <ShopPageContent
          initialCategory={category}
          title={categoryMeta.title}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: categoryMeta.title }]}
        />
        <Footer />
      </div>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-20 grid gap-8 sm:grid-cols-2 items-start">
        <div className="bg-[#e9ecf6] rounded-3xl p-4">
          <Image src={product.image} alt={product.name} width={600} height={600} className="w-full h-auto rounded-2xl object-cover" priority />
        </div>
        <div>
          <h1 className="font-anton text-4xl sm:text-5xl">{product.name.toUpperCase()}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="line-through text-[#b7bac5] text-lg">${product.originalPrice}</span>
            <span className="font-semibold text-2xl">${product.price}</span>
          </div>
          <p className="mt-4 max-w-md">
            Engineered for everyday adventures. Durable, lightweight, and built to move with you
            wherever the journey leads. Part of a limited run of 2,000 units worldwide.
          </p>
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
