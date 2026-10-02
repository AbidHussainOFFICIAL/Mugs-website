import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import WishlistPageContent from "@/components/WishlistPageContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Mugsy's Mugs favorites.",
};

export default function WishlistPage() {
  return (
    <PageShell>
      <WishlistPageContent />
    </PageShell>
  );
}
