import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import { products } from "@/data/products";
import { CATEGORY_META } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on Mugsy's Mugs in one place.",
};

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapGroup {
  title: string;
  links: SitemapLink[];
}

const GROUPS: SitemapGroup[] = [
  {
    title: "SHOP",
    links: [
      { label: "Shop all", href: "/shop" },
      ...Object.entries(CATEGORY_META).map(([category, meta]) => ({
        label: meta.title.charAt(0) + meta.title.slice(1).toLowerCase(),
        href: `/shop/${category}`,
      })),
      { label: "Search", href: "/search" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "YOUR BAG",
    links: [
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Company", href: "/company" },
      { label: "Stores", href: "/stores" },
      { label: "Press kit", href: "/press" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

const LINK_CLASS =
  "block rounded py-1.5 text-sm hover:text-[#183fad] hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]";

export default function SitemapPage() {
  return (
    <PageShell>
      <PageHeaderBanner
        title="SITEMAP"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
        description="Every page on the site, in one place."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title} className="rounded-3xl bg-[#e9ecf6] p-5 sm:p-6">
                <h2 className="font-anton text-2xl">{group.title}</h2>
                <ul className="mt-3 flex flex-col">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="All mugs" className="rounded-3xl bg-[#e9ecf6] p-5 sm:p-6 sm:col-span-2 lg:col-span-3">
              <h2 className="font-anton text-2xl">ALL MUGS</h2>
              <ul className="mt-3 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/shop/${product.slug}`} className={LINK_CLASS}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </ContentSection>
      </main>
    </PageShell>
  );
}
