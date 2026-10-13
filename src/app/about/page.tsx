import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import FeatureCard from "@/components/FeatureCard";
import StatChip from "@/components/StatChip";
import CTABand from "@/components/CTABand";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, ArrowUpIcon, BoltIcon, ShieldIcon } from "@/components/icons";
import { products } from "@/data/products";
import { MILESTONES } from "@/data/story";
import { EDITION_SIZE_LABEL } from "@/lib/policies";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Mugsy's Mugs — limited edition mugs built for everyday adventures.",
};

const VALUES = [
  {
    title: "DURABLE",
    icon: <ShieldIcon />,
    text: "Powder-coated 18/8 stainless steel that shrugs off chips, scratches and everyday drops.",
  },
  {
    title: "LIGHTWEIGHT",
    icon: <ArrowUpIcon />,
    text: "Double-walled without the bulk, so it rides along in a bag or a cup holder without a second thought.",
  },
  {
    title: "BUILT TO MOVE",
    icon: <BoltIcon />,
    text: "Made for the commute, the trailhead and everything in between — wherever the journey leads.",
  },
];

const CRAFT_FACTS = [
  { figure: "12 hrs", label: "Hot" },
  { figure: "24 hrs", label: "Cold" },
  { figure: "18/8", label: "Stainless steel" },
];

export default function AboutPage() {
  const featured = products[0];

  return (
    <PageShell>
      <PageHeaderBanner
        title="OUR STORY"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        description="A mug that survives the commute, the campsite and everything in between."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[55fr_45fr] md:gap-10 md:items-center">
            <div className="order-2 md:order-1 flex flex-col gap-4">
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl">A MUG THAT KEEPS UP</h2>
              <p className="text-sm sm:text-base leading-7 text-[#090909]/80">
                Mugsy&apos;s Mugs started with a simple idea: a mug that survives the commute, the campsite, and
                everything in between. Every piece in our collection is produced in a limited run of{" "}
                {EDITION_SIZE_LABEL} units, made from durable, lightweight materials built to move with you.
              </p>
              <p className="text-sm sm:text-base leading-7 text-[#090909]/80">
                We make fewer things and make them better. Each design is finished in small batches, so when one is
                gone, it&apos;s gone — and the ones that stay with you are the ones that were built to.
              </p>
            </div>

            <div className="order-1 md:order-2 relative overflow-hidden rounded-3xl bg-[#e9ecf6] aspect-[5/4] sm:aspect-[4/3] md:aspect-square">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 rounded-tr-3xl bg-white pr-2 pt-2">
                <div className="rounded-2xl bg-[#abb9de] px-4 py-2 text-[#090909]">
                  <p className="text-xs">Est.</p>
                  <p className="text-2xl leading-none">2026</p>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <StatChip value={EDITION_SIZE_LABEL} label="units worldwide" />
            <StatChip value={String(products.length)} label="signature designs" />
            <StatChip value="98%" label="customer satisfaction" />
          </div>
        </ContentSection>

        <ContentSection title="WHAT WE STAND FOR">
          <ul className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-3">
            {VALUES.map((value) => (
              <li key={value.title}>
                <FeatureCard icon={value.icon} title={value.title}>
                  {value.text}
                </FeatureCard>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <h2 className="font-anton text-2xl sm:text-3xl">HOW WE GOT HERE</h2>
            <ol className="ml-2 border-l-2 border-[#e9ecf6]">
              {MILESTONES.map((milestone) => (
                <li key={milestone.year} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute left-0 top-1.5 size-4 -translate-x-1/2 rounded-full bg-[#F1BF0A] ring-4 ring-white" aria-hidden="true" />
                  <p className="font-anton text-2xl text-[#183fad]">{milestone.year}</p>
                  <h3 className="mt-1 font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-[#090909]/80">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </ContentSection>

        <ContentSection>
          <div className="rounded-4xl bg-[#4565bc] p-6 text-white sm:p-10">
            <h2 className="font-anton text-3xl sm:text-4xl text-[#F1BF0A]">MADE TO LAST</h2>
            <p className="mt-3 max-w-2xl text-white/90">
              18/8 stainless steel, double-walled for serious heat retention, finished in a powder coat that stands up to
              daily life. Nothing flimsy, nothing disposable.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-4 sm:max-w-xl">
              {CRAFT_FACTS.map((fact) => (
                <li key={fact.label}>
                  <p className="font-anton text-3xl text-[#F1BF0A]">{fact.figure}</p>
                  <p className="text-sm text-white/90">{fact.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </ContentSection>

        <ContentSection>
          <CTABand title="FIND YOUR MUG" text={`${products.length} designs, each in a limited run. See which one is yours.`}>
            <PillLink href="/shop" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
              Explore Collection
            </PillLink>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
