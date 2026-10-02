import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SearchPageContent from "@/components/SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Mugsy's Mugs collection.",
};

export default function SearchPage() {
  return (
    <PageShell>
      <SearchPageContent />
    </PageShell>
  );
}
