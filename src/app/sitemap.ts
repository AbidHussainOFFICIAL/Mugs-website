import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const siteUrl = "https://www.mugsysmugs.com";
const CATEGORIES = ["travel", "camp", "gift"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/company", "/stores", "/shop", "/cart", "/search"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${siteUrl}/shop/${category}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
