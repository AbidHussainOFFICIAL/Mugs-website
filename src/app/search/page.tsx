import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchPageContent from "@/components/SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Mugsy's Mugs collection.",
};

export default function SearchPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <SearchPageContent />
      <Footer />
    </div>
  );
}
