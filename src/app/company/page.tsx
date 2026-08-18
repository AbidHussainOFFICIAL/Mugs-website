import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn more about the company behind Mugsy's Mugs.",
};

export default function CompanyPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-20">
        <h1 className="font-anton text-4xl sm:text-5xl">THE COMPANY</h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg">
          Mugsy&apos;s Mugs, Inc. designs and ships limited edition drinkware from a small studio
          focused on durability over disposability. We work with a handful of manufacturing
          partners to keep every run small, deliberate, and built to last.
        </p>
      </main>
      <Footer />
    </div>
  );
}
