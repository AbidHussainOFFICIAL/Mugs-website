import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Stores",
  description: "Find Mugsy's Mugs stockists near you.",
};

export default function StoresPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 flex flex-col">
      <Navbar />
      <PageHeaderBanner title="FIND A STORE" breadcrumb={[{ label: "Home", href: "/" }, { label: "Stores" }]} />
      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 mb-20 flex-1">
        <p className="max-w-2xl text-base sm:text-lg">
          We&apos;re currently online-only. Stockist locations will appear here as we partner with
          retail shops — check back soon or shop the full collection online.
        </p>
      </main>
      <Footer />
    </div>
  );
}
