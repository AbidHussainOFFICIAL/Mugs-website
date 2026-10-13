"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { ChevronDownIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "@/data/social";
import { DEVELOPER_LINK, LEGAL_LINKS, isTabPage } from "@/lib/nav";
import { DURATION, EASE } from "@/lib/motion";
import { COMPANY_NAME } from "@/lib/policies";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/company", label: "Company" },
  { href: "/stores", label: "Stores" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// The phone layout folds the same pages into two collapsed groups.
const PHONE_COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/gift-cards", label: "Gift cards" },
      { href: "/about", label: "About" },
      { href: "/company", label: "Company" },
      { href: "/stores", label: "Stores" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
      { href: "/press", label: "Press kit" },
    ],
  },
];

const PHONE_LEGAL_LINKS = LEGAL_LINKS.filter((link) => link.href === "/privacy" || link.href === "/terms" || link.href === "/sitemap");

const LINK_CLASS =
  "rounded transition-colors hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]";

// One collapsible group of links on a phone.
function FooterGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <div className="border-b border-white/20">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold ${LINK_CLASS}`}
      >
        {title}
        <ChevronDownIcon className={`size-4 shrink-0 text-[#F1BF0A] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.base, ease: EASE }}
            className="overflow-hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`block py-2.5 pl-2 text-sm text-white/90 ${LINK_CLASS}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Below md the layout is its own compact block (one legal row, two collapsed
// groups, the social icons and the copyright line); from md up it is the
// original centred layout.
//
// On a phone, the pages the tab bar points at (Home, Shop, Search, Wishlist,
// Cart) have no Footer at all: the tab bar is their navigation, and the menu
// carries the legal links. A spacer the height of the tab bar keeps their
// last line clear of it.
export default function Footer() {
  const pathname = usePathname();
  const hiddenOnPhone = isTabPage(pathname);

  return (
    <>
      <footer
        className={`max-w-[1400px] w-full mx-auto bg-[#183fad] text-white px-4 sm:px-6 lg:px-9.5 pb-3 sm:pb-4 mt-10 sm:mt-16 lg:mt-20 pt-3 sm:pt-10 rounded-t-4xl relative z-0 overflow-hidden ${
          hiddenOnPhone ? "max-md:hidden" : ""
        }`}
      >
        {/* Phone */}
        <div className="md:hidden">
          <ul className="mb-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-white/80">
            {PHONE_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`block py-1.5 ${LINK_CLASS}`}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center">
              <CookieSettingsButton />
            </li>
          </ul>

          <div className="border-t border-white/20">
            {PHONE_COLUMNS.map((column) => (
              <FooterGroup key={`${pathname}-${column.title}`} title={column.title} links={column.links} />
            ))}
          </div>

          <ul className="mt-2 flex justify-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full transition-colors hover:text-[#F1BF0A] active:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
                    <path d={social.path} clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-2 text-center text-xs text-white/50">
            © 2026 {COMPANY_NAME} All rights reserved.{" "}
            <Link href={DEVELOPER_LINK.href} className="underline underline-offset-2 hover:text-[#F1BF0A]">
              {DEVELOPER_LINK.label}
            </Link>
          </p>
        </div>

        {/* md and up */}
        <div className="hidden md:block">
          <nav aria-label="Footer" className="-mb-6 flex flex-nowrap justify-center gap-x-6 gap-y-3 text-sm/6">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 border-t border-white/30 pt-4">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm/6 text-white/80">
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
              <li>
                <Link href={DEVELOPER_LINK.href} className={LINK_CLASS}>
                  {DEVELOPER_LINK.label}
                </Link>
              </li>
            </ul>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-x-6 justify-start order-2">
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
              <p className="text-sm/6 text-white/50 text-left order-1 whitespace-nowrap">© 2026 {COMPANY_NAME} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {hiddenOnPhone && <div aria-hidden="true" className="h-[calc(var(--dock-h,0px)+1rem)] shrink-0 md:hidden" />}
    </>
  );
}
