import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { SOCIAL_LINKS } from "@/data/social";
import { COMPANY_NAME } from "@/lib/policies";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/company", label: "Company" },
  { href: "/stores", label: "Stores" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/press", label: "Press kit" },
  { href: "/sitemap", label: "Sitemap" },
];

const LINK_CLASS =
  "rounded transition-colors hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]";

export default function Footer() {
  return (
    <footer className="max-w-[1400px] w-full mx-auto bg-[#183fad] text-white px-4 sm:px-6 lg:px-9.5 pb-4 mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-10 rounded-t-4xl relative z-0 overflow-hidden">
      <nav aria-label="Footer" className="-mb-6 flex flex-nowrap justify-center gap-x-3 sm:gap-x-6 gap-y-3 text-xs sm:text-sm/6 overflow-x-auto">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={LINK_CLASS}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 border-t border-white/30 pt-4">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm/6 text-white/80">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton />
          </li>
        </ul>

        <div className="mt-4 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 justify-center md:justify-start md:order-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A] rounded"
              >
                <span className="sr-only">{social.name}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d={social.path} clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-4 sm:mt-8 text-xs sm:text-sm/6 text-white/50 text-center md:text-left md:order-1 md:mt-0 whitespace-nowrap">
            © 2026 {COMPANY_NAME} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
