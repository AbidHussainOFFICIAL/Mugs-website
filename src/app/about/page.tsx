import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Mugsy's Mugs — limited edition mugs built for everyday adventures.",
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 mb-20">
        <h1 className="font-anton text-4xl sm:text-5xl">ABOUT US</h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg">
          Mugsy&apos;s Mugs started with a simple idea: a mug that survives the commute, the campsite,
          and everything in between. Every piece in our collection is produced in a limited run of
          2,000 units, made from durable, lightweight materials built to move with you.
        </p>
      </main>
      <Footer />
    </div>
  );
}
