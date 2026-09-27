import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

const CATEGORIES = ["travel", "camp", "gift"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/company", "/stores", "/shop", "/search"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/shop/${category}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
