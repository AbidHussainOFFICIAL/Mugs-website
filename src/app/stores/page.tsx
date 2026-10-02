import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Stores",
  description: "Find Mugsy's Mugs stockists near you.",
};

export default function StoresPage() {
  return (
    <PageShell>
      <PageHeaderBanner title="FIND A STORE" breadcrumb={[{ label: "Home", href: "/" }, { label: "Stores" }]} />
      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 flex-1">
        <p className="max-w-2xl text-base sm:text-lg">
          We&apos;re currently online-only. Stockist locations will appear here as we partner with
          retail shops — check back soon or shop the full collection online.
        </p>
      </main>
    </PageShell>
  );
}
