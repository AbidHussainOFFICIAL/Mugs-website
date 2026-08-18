import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid() {
  return (
    <ul role="list" className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 md:grid-cols-3 xl:grid-cols-4 mt-6 sm:mt-10">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </ul>
  );
}
