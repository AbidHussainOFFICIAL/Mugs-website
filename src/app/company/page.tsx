import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn more about the company behind Mugsy's Mugs.",
};

export default function CompanyPage() {
  return (
    <PageShell>
      <PageHeaderBanner title="THE COMPANY" breadcrumb={[{ label: "Home", href: "/" }, { label: "Company" }]} />
      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 flex-1">
        <p className="max-w-2xl text-base sm:text-lg">
          Mugsy&apos;s Mugs, Inc. designs and ships limited edition drinkware from a small studio
          focused on durability over disposability. We work with a handful of manufacturing
          partners to keep every run small, deliberate, and built to last.
        </p>
      </main>
    </PageShell>
  );
}
