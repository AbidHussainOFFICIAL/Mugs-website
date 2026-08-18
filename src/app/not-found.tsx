import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 flex flex-col">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto mt-16 sm:mt-24 mb-24 flex-1 text-center">
        <h1 className="font-anton text-5xl sm:text-6xl text-[#183fad]">404</h1>
        <p className="mt-4 text-lg">We couldn&apos;t find that page.</p>
        <Link href="/" className="mt-6 inline-block bg-[#F1BF0A] rounded-full py-2.5 px-6 font-semibold hover:bg-[#dcae09] transition-colors">
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
