import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import GiftCardsContent from "@/components/GiftCardsContent";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Send a Mugsy's Mugs gift card, or check the balance of one you've received.",
};

export default function GiftCardsPage() {
  return (
    <PageShell>
      <PageHeaderBanner
        title="GIFT CARDS"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gift cards" }]}
        description="Can't pick a mug for someone? Let them choose."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <GiftCardsContent />
        </ContentSection>
      </main>
    </PageShell>
  );
}
