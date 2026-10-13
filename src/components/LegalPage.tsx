import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import StatChip from "@/components/StatChip";
import CTABand from "@/components/CTABand";
import LegalNav from "@/components/LegalNav";
import BackToTop from "@/components/BackToTop";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import type { LegalBlock, LegalDocument } from "@/data/legal";
import { LEGAL_LAST_UPDATED, SUPPORT } from "@/lib/policies";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-7 text-[#090909]/80 sm:text-base">{block.text}</p>;

    case "list":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-7 text-[#090909]/80 marker:text-[#183fad] sm:text-base">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div className="rounded-2xl border-l-4 border-[#F1BF0A] bg-[#e9ecf6] p-4 sm:p-5">
          {block.title && <p className="font-anton text-lg">{block.title}</p>}
          <p className="text-sm leading-7 text-[#090909]/80 sm:text-base">{block.text}</p>
        </div>
      );

    case "table":
      return (
        <div role="region" aria-label="Table" tabIndex={0} className="overflow-x-auto rounded-2xl bg-[#e9ecf6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#abb9de]">
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-white">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row" className="px-4 py-3 align-top font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${index}-${cell}`} className="px-4 py-3 align-top text-[#090909]/80">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "steps":
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4 rounded-3xl bg-[#e9ecf6] p-4 sm:p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] font-anton text-lg">{index + 1}</span>
              <div className="min-w-0">
                <p className="font-anton text-xl">{step.title}</p>
                <p className="text-sm leading-7 text-[#090909]/80">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "contact":
      return (
        <div className="rounded-3xl bg-[#abb9de] p-5 text-[#090909]">
          <ul className="flex flex-col gap-1 text-sm sm:text-base">
            <li>
              Email:{" "}
              <a href={`mailto:${SUPPORT.email}`} className="font-semibold underline underline-offset-2 hover:text-[#183fad]">
                {SUPPORT.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${SUPPORT.phone.replace(/[^\d+]/g, "")}`} className="font-semibold underline underline-offset-2 hover:text-[#183fad]">
                {SUPPORT.phone}
              </a>
            </li>
            <li>Hours: {SUPPORT.hours}</li>
          </ul>
        </div>
      );
  }
}

// The shared page for Privacy, Terms and Shipping & Returns: banner with the
// "Last updated" chip, optional stat row, a sticky "On this page" rail beside
// the sections, and a closing contact band.
export default function LegalPage({ doc }: { doc: LegalDocument }) {
  const navSections = doc.sections.map(({ id, title }) => ({ id, title }));

  return (
    <PageShell>
      <PageHeaderBanner
        title={doc.title}
        breadcrumb={[{ label: "Home", href: "/" }, { label: doc.title.charAt(0) + doc.title.slice(1).toLowerCase() }]}
        count={`Last updated ${LEGAL_LAST_UPDATED}`}
        description={doc.intro}
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        {doc.stats && (
          <ContentSection first>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
              {doc.stats.map((stat, index) => (
                <StatChip
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  className={doc.stats && doc.stats.length % 2 === 1 && index === doc.stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}
                />
              ))}
            </div>
          </ContentSection>
        )}

        <ContentSection first={!doc.stats}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
            <LegalNav sections={navSections} />

            <div className="flex min-w-0 max-w-[80ch] flex-col gap-8 sm:gap-10">
              {doc.sections.map((section) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-6">
                  <h2 id={`${section.id}-heading`} className="font-anton text-2xl sm:text-3xl">
                    {section.title.toUpperCase()}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {section.blocks.map((block, index) => (
                      <Block key={index} block={block} />
                    ))}
                  </div>
                </section>
              ))}

              <p className="text-xs text-[#090909]/60">
                Other pages:{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[#183fad]">
                  Privacy
                </Link>
                {" · "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-[#183fad]">
                  Terms
                </Link>
                {" · "}
                <Link href="/shipping-returns" className="underline underline-offset-2 hover:text-[#183fad]">
                  Shipping &amp; Returns
                </Link>
              </p>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <CTABand title="QUESTIONS?" text="If something here isn't clear, ask us.">
            <div className="flex flex-col items-stretch gap-3 min-[480px]:items-end">
              <PillLink href="/contact" icon={<MailIcon className="size-6" />} layout="fluid" focusRing="light">
                Contact us
              </PillLink>
              <Link href="/faq" className="inline-flex items-center justify-center gap-1 text-sm text-white underline underline-offset-2 hover:text-[#F1BF0A] transition-colors">
                Read the FAQ
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </CTABand>
        </ContentSection>
      </main>

      <BackToTop />
    </PageShell>
  );
}
