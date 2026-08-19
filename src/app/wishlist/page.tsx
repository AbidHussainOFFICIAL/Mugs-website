import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistPageContent from "@/components/WishlistPageContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Mugsy's Mugs favorites.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <WishlistPageContent />
      <Footer />
    </div>
  );
}
