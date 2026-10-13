import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import StatChip from "@/components/StatChip";
import CTABand from "@/components/CTABand";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, StorefrontIcon } from "@/components/icons";
import { POP_UPS, STOCKIST_REGIONS } from "@/data/stockists";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { DISPATCH_DAYS, RETURN_WINDOW_DAYS } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Stores",
  description: "Shop Mugsy's Mugs online, or find a stockist near you.",
};

// Dates are calendar days ("2026-11-14"); formatting in UTC keeps the day the
// same for every visitor and for the server render.
function getDateParts(isoDate: string) {
  const date = new Date(isoDate);
  return {
    day: date.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }),
    month: date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
  };
}

export default function StoresPage() {
  return (
    <PageShell>
      <PageHeaderBanner
        title="WHERE TO FIND US"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Stores" }]}
        description="Mostly online — and in a few favourite shops."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid grid-cols-1 gap-6 rounded-4xl bg-[#183fad] p-5 text-white sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="flex flex-col items-stretch gap-4 min-[480px]:items-start">
              <h2 className="font-anton text-3xl text-[#F1BF0A] sm:text-4xl lg:text-5xl">SHOP ONLINE</h2>
              <p className="max-w-md text-white/90">
                The whole collection is a click away and ships straight to your door — no map needed.
              </p>
              <PillLink href="/shop" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
                Explore Collection
              </PillLink>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
              <StatChip value={`$${FREE_SHIPPING_THRESHOLD}+`} label="Free shipping" />
              <StatChip value={`${DISPATCH_DAYS} days`} label="Business days to ship" />
              <StatChip value={`${RETURN_WINDOW_DAYS} days`} label="Easy returns" className="col-span-2 sm:col-span-1" />
            </div>
          </div>
        </ContentSection>

        <ContentSection title="RETAIL PARTNERS">
          <div className="flex flex-col gap-8 sm:gap-10">
            {STOCKIST_REGIONS.map((region) => (
              <div key={region.name}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-anton text-2xl sm:text-3xl">{region.name.toUpperCase()}</h3>
                  <span className="rounded-full bg-[#abb9de] px-3 py-0.5 text-xs">{region.stockists.length}</span>
                </div>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {region.stockists.map((stockist) => (
                    <li key={stockist.name} className="flex items-start gap-3 rounded-3xl bg-[#e9ecf6] p-4 sm:p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">
                        <StorefrontIcon />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-semibold">{stockist.name}</h4>
                        <address className="mt-1 text-sm not-italic">
                          {stockist.addressLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                        <p className="mt-2 text-xs text-[#090909]/60">{stockist.hours}</p>
                        <a href={`tel:${stockist.phone.replace(/[^\d+]/g, "")}`} className="mt-1 inline-block text-sm text-[#183fad] underline underline-offset-2">
                          {stockist.phone}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="COMING UP">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {POP_UPS.map((popUp) => {
              const { day, month } = getDateParts(popUp.date);
              return (
                <li key={popUp.date} className="flex overflow-hidden rounded-3xl bg-[#e9ecf6]">
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center bg-[#F1BF0A] py-3 text-[#090909]">
                    <span className="font-anton text-3xl leading-none">{day}</span>
                    <span className="text-xs uppercase">{month}</span>
                  </div>
                  <div className="min-w-0 p-4">
                    <h4 className="font-semibold">{popUp.title}</h4>
                    <p className="mt-1 text-sm text-[#090909]/70">{popUp.venue}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-xs text-[#090909]/60">Sample listings — real partners and events will appear here as they&apos;re confirmed.</p>
        </ContentSection>

        <ContentSection>
          <CTABand title="BECOME A STOCKIST" text="Run a shop that would suit our mugs? We'd love to hear from you.">
            <PillLink href="/contact?topic=wholesale" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
              Get in touch
            </PillLink>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
