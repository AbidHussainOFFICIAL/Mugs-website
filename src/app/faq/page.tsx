import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import FaqContent from "@/components/FaqContent";
import CTABand from "@/components/CTABand";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about orders, shipping, returns, our mugs and gift cards.",
};

export default function FaqPage() {
  return (
    // overflowX="clip": the category rail on this page is position: sticky,
    // which the default overflow-x-hidden wrapper would stop from working.
    <PageShell overflowX="clip">
      <PageHeaderBanner
        title="FAQ"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        description="Quick answers to the questions we hear most."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <FaqContent />
        </ContentSection>

        <ContentSection>
          <CTABand title="STILL NEED HELP?" text="Send us a message and we'll get back to you.">
            <div className="flex flex-col items-stretch gap-3">
              <PillLink href="/contact" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
                Contact us
              </PillLink>
              <Link href="/shipping-returns" className="text-center text-sm text-white underline underline-offset-2 transition-colors hover:text-[#F1BF0A]">
                Shipping &amp; Returns
              </Link>
            </div>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
