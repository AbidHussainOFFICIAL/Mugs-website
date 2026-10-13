import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import TeamCard from "@/components/TeamCard";
import CTABand from "@/components/CTABand";
import { OutlineLink } from "@/components/OutlineButton";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon } from "@/components/icons";
import { MISSION, MISSION_TEXT, TEAM, VISION_TEXT } from "@/data/story";
import { COMPANY_NAME, PRESS_EMAIL } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn more about the company behind Mugsy's Mugs.",
};

export default function CompanyPage() {
  return (
    <PageShell>
      <PageHeaderBanner
        title="THE COMPANY"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Company" }]}
        description={`${COMPANY_NAME} designs and ships limited edition drinkware from a small studio.`}
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="rounded-4xl bg-[#4565bc] p-6 text-white sm:p-10 lg:p-14">
            <h2 className="max-w-4xl font-anton text-3xl leading-tight text-[#F1BF0A] sm:text-5xl lg:text-6xl">{MISSION}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="font-anton text-xl">MISSION</h3>
                <p className="mt-2 text-white/90">{MISSION_TEXT}</p>
              </div>
              <div>
                <h3 className="font-anton text-xl">VISION</h3>
                <p className="mt-2 text-white/90">{VISION_TEXT}</p>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection title="THE PEOPLE">
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {TEAM.map((member) => (
              <TeamCard key={member.name} name={member.name} role={member.role} />
            ))}
          </ul>
        </ContentSection>

        <ContentSection>
          <div className="flex flex-col gap-5 rounded-4xl bg-[#e9ecf6] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="min-w-0">
              <h2 className="font-anton text-2xl sm:text-3xl">PRESS &amp; MEDIA</h2>
              <p className="mt-2 max-w-xl text-sm text-[#090909]/80 sm:text-base">
                Logos, brand colors, product photos and a short brand description are all in the press kit. For anything
                else, write to{" "}
                <a href={`mailto:${PRESS_EMAIL}`} className="text-[#183fad] underline underline-offset-2">
                  {PRESS_EMAIL}
                </a>
                .
              </p>
            </div>
            <OutlineLink href="/press" fluid className="shrink-0">
              Visit press kit
            </OutlineLink>
          </div>
        </ContentSection>

        <ContentSection>
          <CTABand title="GET IN TOUCH" text="Questions, ideas or a hello — we read everything.">
            <PillLink href="/contact" icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
              Contact us
            </PillLink>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
