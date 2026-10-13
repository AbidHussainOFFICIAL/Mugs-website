import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import StatChip from "@/components/StatChip";
import CTABand from "@/components/CTABand";
import CopyButton from "@/components/CopyButton";
import { OutlineLink } from "@/components/OutlineButton";
import { PillLink } from "@/components/PillButton";
import { DownloadIcon, MailIcon } from "@/components/icons";
import { products } from "@/data/products";
import { COMPANY_NAME, EDITION_SIZE_LABEL, PRESS_EMAIL } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Logos, colours, a short boilerplate and press contact details for Mugsy's Mugs.",
};

const LOGOS = [
  { file: "mugsys-logo-yellow.svg", name: "Yellow", note: "Default" },
  { file: "mugsys-logo-blue.svg", name: "Blue", note: "On light backgrounds" },
  { file: "mugsys-logo-ink.svg", name: "Ink", note: "On light backgrounds" },
  { file: "mugsys-logo-white.svg", name: "White", note: "On dark or blue backgrounds" },
];

const COLORS = [
  { name: "Blue", hex: "#183fad", text: "text-white" },
  { name: "Mid blue", hex: "#4565bc", text: "text-white" },
  { name: "Yellow", hex: "#F1BF0A", text: "text-[#090909]" },
  { name: "Ice", hex: "#e9ecf6", text: "text-[#090909]" },
  { name: "Soft blue", hex: "#abb9de", text: "text-[#090909]" },
  { name: "Ink", hex: "#090909", text: "text-white" },
];

const BOILERPLATE = `${COMPANY_NAME} makes limited edition mugs built for everyday adventures. Every design is produced in a run of ${EDITION_SIZE_LABEL} units, in durable, lightweight stainless steel made to keep up with the commute, the campsite and everything in between.`;

export default function PressPage() {
  const images = products.slice(0, 3);

  return (
    <PageShell>
      <PageHeaderBanner
        title="PRESS KIT"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Press kit" }]}
        description="Logos, colours and a short description, ready to use."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
            <StatChip value={String(products.length)} label="Designs" />
            <StatChip value={EDITION_SIZE_LABEL} label="Units per design" />
            <StatChip value="18/8" label="Stainless steel" />
            <StatChip value="2026" label="Launched" />
          </div>
        </ContentSection>

        <ContentSection title="ABOUT US">
          <div className="rounded-3xl bg-[#e9ecf6] p-5 sm:p-8">
            <p className="max-w-[70ch] text-sm leading-7 text-[#090909]/80 sm:text-base">{BOILERPLATE}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#090909]/70">
              <CopyButton text={BOILERPLATE} label="boilerplate" />
              Copy this description
            </div>
          </div>
        </ContentSection>

        <ContentSection title="LOGO">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {LOGOS.map((logo) => (
              <li key={logo.file} className="flex flex-col gap-3 rounded-3xl bg-[#e9ecf6] p-4">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#abb9de]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG; next/image adds nothing */}
                  <img src={`/press/${logo.file}`} alt={`${logo.name} logo`} width={96} height={96} className="size-20 sm:size-24" />
                </div>
                <div className="min-w-0">
                  <p className="font-anton text-lg">{logo.name.toUpperCase()}</p>
                  <p className="text-xs text-[#090909]/70">{logo.note}</p>
                </div>
                <a
                  href={`/press/${logo.file}`}
                  download
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline underline-offset-2 hover:text-[#183fad] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
                >
                  <DownloadIcon className="size-4" />
                  SVG
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <OutlineLink href="/press/mugsys-press-kit.zip" download>
              <DownloadIcon className="size-4" />
              Download all logos (.zip)
            </OutlineLink>
          </div>
        </ContentSection>

        <ContentSection title="COLOURS">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {COLORS.map((color) => (
              <li key={color.hex} className="overflow-hidden rounded-3xl bg-[#e9ecf6]">
                <div className={`flex h-24 items-end p-3 ${color.text}`} style={{ backgroundColor: color.hex }}>
                  <span className="font-anton text-lg">{color.name.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="text-sm font-medium">{color.hex}</span>
                  <CopyButton text={color.hex} label={`${color.name} hex code`} />
                </div>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="TYPE">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-3xl bg-[#183fad] p-5 text-white sm:p-8">
              <p className="text-xs text-white/70">Headings</p>
              <p className="mt-2 font-anton text-4xl text-[#F1BF0A] sm:text-5xl">ANTON</p>
            </div>
            <div className="rounded-3xl bg-[#e9ecf6] p-5 sm:p-8">
              <p className="text-xs text-[#090909]/70">Body text</p>
              <p className="mt-2 text-4xl font-semibold sm:text-5xl">Inter</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="PRODUCT PHOTOS">
          <ul className="grid grid-cols-3 gap-2 sm:gap-4">
            {images.map((product) => (
              <li key={product.slug} className="relative aspect-square overflow-hidden rounded-2xl bg-[#e9ecf6] sm:rounded-3xl">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 1400px) 33vw, 450px" className="object-cover" />
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection>
          <CTABand title="PRESS ENQUIRIES" text={`Review units, interviews and images: ${PRESS_EMAIL}`}>
            <PillLink href={`mailto:${PRESS_EMAIL}`} icon={<MailIcon className="size-6" />} layout="hug" focusRing="light" className="justify-center min-[480px]:justify-start">
              Email press team
            </PillLink>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
