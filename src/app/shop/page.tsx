import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop the full limited edition Mugsy's Mugs collection.",
};

export default function ShopPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 flex flex-col">
      <Navbar />
      <ShopPageContent />
      <Footer />
    </div>
  );
}
