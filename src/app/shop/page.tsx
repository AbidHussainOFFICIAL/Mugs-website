import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ShopPageContent from "@/components/ShopPageContent";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop the full limited edition Mugsy's Mugs collection.",
};

export default function ShopPage() {
  return (
    <PageShell>
      <ShopPageContent />
    </PageShell>
  );
}
