import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CollectionHeader from "@/components/CollectionHeader";
import ProductGrid from "@/components/ProductGrid";
import CraftStory from "@/components/CraftStory";
import SpecsComparison from "@/components/SpecsComparison";

// The announcement bar above the Navbar is rendered by SiteFrame (the root
// layout's frame), which shows it on this page only.
export default function Home() {
  return (
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
  );
}
