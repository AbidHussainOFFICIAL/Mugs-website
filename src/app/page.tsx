import AnnouncementBar from "@/components/AnnouncementBar";
import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CollectionHeader from "@/components/CollectionHeader";
import ProductGrid from "@/components/ProductGrid";
import CraftStory from "@/components/CraftStory";
import SpecsComparison from "@/components/SpecsComparison";

export default function Home() {
  return (
    <>
      <AnnouncementBar />

      <PageShell>
        <Hero />
        <TrustStrip />

        <main className="max-w-[1400px] w-full mx-auto mt-12 sm:mt-16 lg:mt-20 overflow-hidden flex-1">
          <CollectionHeader />
          <ProductGrid />
        </main>

        <CraftStory />
        <SpecsComparison />
      </PageShell>
    </>
  );
}
