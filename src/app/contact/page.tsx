import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeaderBanner from "@/components/PageHeaderBanner";
import ContentSection from "@/components/ContentSection";
import ContactForm from "@/components/ContactForm";
import { ArrowRightIcon, ClockIcon, MailIcon, PhoneIcon, SparklesIcon } from "@/components/icons";
import { parseContactTopic } from "@/lib/contact";
import { SUPPORT } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mugsy's Mugs — questions about an order, a product, wholesale or press.",
};

const SUPPORT_DETAILS = [
  { label: "Email", value: SUPPORT.email, href: `mailto:${SUPPORT.email}`, icon: <MailIcon /> },
  { label: "Phone", value: SUPPORT.phone, href: `tel:${SUPPORT.phone.replace(/[^\d+]/g, "")}`, icon: <PhoneIcon /> },
  { label: "Hours", value: SUPPORT.hours, icon: <ClockIcon /> },
  { label: "Typical reply time", value: SUPPORT.replyTime, icon: <SparklesIcon /> },
];

const QUICK_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Gift cards", href: "/gift-cards" },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { topic } = await searchParams;
  const initialTopic = parseContactTopic(topic);

  return (
    <PageShell>
      <PageHeaderBanner
        title="CONTACT US"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        description="Questions about an order, a mug or working together — we're here."
      />

      <main className="max-w-[1400px] w-full mx-auto flex-1">
        <ContentSection first>
          <div className="grid gap-6 lg:grid-cols-[58fr_42fr] lg:gap-10 lg:items-start">
            <div className="order-2 lg:order-1">
              <ContactForm key={initialTopic} initialTopic={initialTopic} />
            </div>

            <aside aria-label="Support details" className="order-1 lg:order-2 flex flex-col gap-3">
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {SUPPORT_DETAILS.map((detail) => (
                  <li key={detail.label} className="flex items-center gap-3 rounded-2xl bg-[#abb9de] p-3 sm:p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">{detail.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-[#090909]/60">{detail.label}</p>
                      {detail.href ? (
                        <a href={detail.href} className="block break-words text-sm font-semibold hover:underline">
                          {detail.value}
                        </a>
                      ) : (
                        <p className="break-words text-sm font-semibold">{detail.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <nav aria-label="Helpful pages" className="rounded-3xl bg-[#4565bc] p-5 text-white">
                <h2 className="font-anton text-xl">QUICK ANSWERS</h2>
                <ul className="mt-3 flex flex-col">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href} className="border-t border-white/20 first:border-t-0">
                      <Link
                        href={link.href}
                        className="flex items-center justify-between gap-3 py-3 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                      >
                        {link.label}
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909]">
                          <ArrowRightIcon className="size-4" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </ContentSection>
      </main>
    </PageShell>
  );
}
