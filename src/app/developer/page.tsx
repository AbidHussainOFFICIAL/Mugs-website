import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import StatChip from "@/components/StatChip";
import CTABand from "@/components/CTABand";
import { OutlineLink } from "@/components/OutlineButton";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import {
  DEVELOPER,
  DEVELOPER_EDUCATION,
  DEVELOPER_EXPERIENCE,
  DEVELOPER_PROJECTS,
  DEVELOPER_SKILLS,
} from "@/data/developer";
import { SITE_URL } from "@/lib/site";

const PAGE_TITLE = `${DEVELOPER.name} — ${DEVELOPER.role} in ${DEVELOPER.location.city}, ${DEVELOPER.location.country}`;
const PAGE_DESCRIPTION = `${DEVELOPER.name} is a full-stack developer in ${DEVELOPER.location.city}, ${DEVELOPER.location.country}. Next.js, React, TypeScript, Node.js and MongoDB: portfolio, projects, skills and contact.`;
const PAGE_URL = `${SITE_URL}/developer`;

export const metadata: Metadata = {
  // `absolute` skips the site's "%s | Mugsy's Mugs" template, so the person's
  // name leads the title in search results.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/developer" },
  authors: [{ name: DEVELOPER.name, url: PAGE_URL }],
  keywords: [
    DEVELOPER.name,
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "MERN stack developer",
    `web developer ${DEVELOPER.location.city}`,
  ],
  openGraph: {
    type: "profile",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Mugsy's Mugs",
    firstName: "Abid",
    lastName: "Hussain",
    username: DEVELOPER.handle,
  },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: PAGE_DESCRIPTION },
};

// Structured data for search engines: who this is, where else they exist
// online (sameAs), and that this page is their profile page.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${PAGE_URL}#person`,
      name: DEVELOPER.name,
      alternateName: DEVELOPER.handle,
      jobTitle: DEVELOPER.role,
      description: DEVELOPER.summary,
      url: PAGE_URL,
      email: `mailto:${DEVELOPER.email}`,
      sameAs: [DEVELOPER.github, DEVELOPER.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: DEVELOPER.location.city,
        addressCountry: DEVELOPER.location.countryCode,
      },
      knowsAbout: DEVELOPER_SKILLS.flatMap((group) => [...group.items]),
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Saylani Mass IT Training Program (SMIT)" },
        { "@type": "EducationalOrganization", name: "Memon Industrial & Technical Institute (MITI)" },
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${PAGE_URL}#profile`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      mainEntity: { "@id": `${PAGE_URL}#person` },
      isPartOf: { "@type": "WebSite", name: "Mugsy's Mugs", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Developer", item: PAGE_URL },
      ],
    },
  ],
};

const EXTERNAL_LINK_CLASS =
  "inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#183fad] underline underline-offset-2 hover:text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]";

// The profile links under the bio: full-width tap rows on a phone, a wrapped
// row of plain links from sm up.
const PROFILE_LINK_CLASS =
  "flex min-h-11 w-full min-w-0 items-center justify-between gap-3 rounded-full border border-[#F1BF0A] bg-white px-4 text-sm font-semibold transition-colors hover:bg-[#F1BF0A]/10 active:bg-[#F1BF0A]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] sm:w-auto sm:min-h-0 sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:text-[#183fad] sm:underline sm:underline-offset-2 sm:hover:bg-transparent sm:hover:text-[#090909]";

export default function DeveloperPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        // "<" is escaped so no value in the data could ever close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
      />

      <PageHeaderBanner
        title={DEVELOPER.name.toUpperCase()}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Developer" }]}
        description={`${DEVELOPER.role} in ${DEVELOPER.location.city}, ${DEVELOPER.location.country}: Next.js, React, TypeScript and Node.js.`}
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
            <div className="flex items-center gap-4 md:block">
              <div
                aria-hidden="true"
                className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#183fad] font-anton text-3xl text-[#F1BF0A] sm:size-28 sm:text-5xl md:size-36 md:text-6xl"
              >
                AH
              </div>
              <div className="min-w-0 md:hidden">
                <p className="font-semibold">{DEVELOPER.role}</p>
                <p className="text-sm text-[#090909]/70">
                  {DEVELOPER.location.city}, {DEVELOPER.location.country}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <h2 className="font-anton text-2xl sm:text-4xl lg:text-5xl">ABOUT THE DEVELOPER</h2>
              {DEVELOPER.bio.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[#090909]/80 sm:text-base">
                  {paragraph}
                </p>
              ))}
              <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                <li className="min-w-0">
                  <a href={DEVELOPER.github} target="_blank" rel="me noopener noreferrer" className={PROFILE_LINK_CLASS}>
                    GitHub: {DEVELOPER.handle}
                    <ArrowRightIcon className="size-4 shrink-0 sm:hidden" />
                  </a>
                </li>
                <li className="min-w-0">
                  <a href={DEVELOPER.linkedin} target="_blank" rel="me noopener noreferrer" className={PROFILE_LINK_CLASS}>
                    LinkedIn
                    <ArrowRightIcon className="size-4 shrink-0 sm:hidden" />
                  </a>
                </li>
                <li className="min-w-0">
                  <a href={`mailto:${DEVELOPER.email}`} className={`${PROFILE_LINK_CLASS} break-all`}>
                    {DEVELOPER.email}
                    <MailIcon className="size-4 shrink-0 sm:hidden" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <StatChip value="15 mo" label="Full-stack training" />
            <StatChip value="2026" label="Full-stack internship" />
            <StatChip value="MERN" label="+ Next.js, TypeScript" />
          </div>
        </ContentSection>

        <ContentSection title="SKILLS">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {DEVELOPER_SKILLS.map((group) => (
              <section key={group.group} aria-label={group.group} className="rounded-3xl bg-[#e9ecf6] p-5">
                <h3 className="font-anton text-xl">{group.group.toUpperCase()}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-[#F1BF0A] bg-white px-3 py-1 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </ContentSection>

        <ContentSection title="PROJECTS">
          <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {DEVELOPER_PROJECTS.map((project) => {
              const external = project.href.startsWith("http");
              return (
                <li key={project.name} className="flex min-w-0 flex-col gap-3 rounded-3xl bg-[#e9ecf6] p-5">
                  <div>
                    <h3 className="font-anton text-xl">{project.name.toUpperCase()}</h3>
                    <p className="text-xs text-[#090909]/70">{project.kind}</p>
                  </div>
                  <p className="text-sm leading-6 text-[#090909]/80">{project.text}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-[#abb9de] px-2.5 py-0.5 text-xs text-[#090909]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${EXTERNAL_LINK_CLASS} mt-auto min-h-11 w-fit sm:min-h-0`}
                  >
                    {external ? "Visit live site" : "You're on it now"}
                    <ArrowRightIcon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </ContentSection>

        <ContentSection title="EXPERIENCE & EDUCATION">
          <ol className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {[...DEVELOPER_EXPERIENCE, ...DEVELOPER_EDUCATION].map((entry) => (
              <li key={entry.title} className="min-w-0 rounded-3xl bg-[#e9ecf6] p-5">
                <p className="text-xs text-[#090909]/70">{entry.period}</p>
                <h3 className="mt-1 font-anton text-xl">{entry.title.toUpperCase()}</h3>
                <p className="text-sm font-semibold">{entry.place}</p>
                <p className="mt-2 text-sm leading-6 text-[#090909]/80">{entry.text}</p>
                {entry.credential && <p className="mt-2 break-words text-xs text-[#090909]/60">{entry.credential}</p>}
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection>
          <CTABand title="LET'S BUILD SOMETHING" text={`Have a project in mind? Email ${DEVELOPER.name} or find the work on GitHub.`}>
            <div className="flex flex-col gap-3">
              <PillLink href={`mailto:${DEVELOPER.email}`} icon={<MailIcon className="size-6" />} layout="fluid" focusRing="light">
                Email me
              </PillLink>
              <OutlineLink href={DEVELOPER.github} onDark fluid target="_blank" rel="me noopener noreferrer">
                View GitHub
              </OutlineLink>
            </div>
          </CTABand>
        </ContentSection>
      </main>
    </PageShell>
  );
}
