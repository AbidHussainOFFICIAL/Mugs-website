import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Mugsy's Mugs — limited edition mugs built for everyday adventures.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeaderBanner title="ABOUT US" breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <main className="max-w-[1400px] w-full mx-auto mt-8 sm:mt-10 flex-1">
        <p className="max-w-2xl text-base sm:text-lg">
          Mugsy&apos;s Mugs started with a simple idea: a mug that survives the commute, the campsite,
          and everything in between. Every piece in our collection is produced in a limited run of
          2,000 units, made from durable, lightweight materials built to move with you.
        </p>
      </main>
    </PageShell>
  );
}