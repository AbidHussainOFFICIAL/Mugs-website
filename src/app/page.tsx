import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CollectionHeader from "@/components/CollectionHeader";
import ProductGrid from "@/components/ProductGrid";
import CraftStory from "@/components/CraftStory";
import SpecsComparison from "@/components/SpecsComparison";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />

      <div className="min-h-dvh w-full overflow-x-hidden text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4">
        <Navbar />
        <Hero />
        <TrustStrip />

        <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 overflow-hidden">
          <CollectionHeader />
          <ProductGrid />
        </main>

        <CraftStory />
        <SpecsComparison />

        <Footer />
      </div>
    </>
  );
}
