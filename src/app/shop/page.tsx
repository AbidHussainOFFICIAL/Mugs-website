import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CollectionHeader from "@/components/CollectionHeader";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop the full limited edition Mugsy's Mugs collection.",
};

export default function ShopPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-20">
        <CollectionHeader />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
