"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "@/data/social";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { DEVELOPER_LINK, HELP_LINKS, LEGAL_LINKS, NAV_LINKS, isActivePath, type NavLink } from "@/lib/nav";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

const SMALL_LINK_CLASS =
  "rounded text-xs text-white/70 transition-colors hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]";

// One group of links in its own rounded panel, so the links sit on something
// instead of floating on the blue. The current page is a solid yellow chip.
function LinkGroup({ title, links, pathname, onClose }: { title: string; links: NavLink[]; pathname: string; onClose: () => void }) {
  return (
    <div className="min-w-0 rounded-3xl bg-white/10 p-2">
      <p className="px-3 pb-1 pt-2 font-anton text-sm tracking-wide text-[#F1BF0A]">{title.toUpperCase()}</p>
      <ul className="flex flex-col gap-1">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`block break-words rounded-2xl px-3 py-2.5 text-base leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F1BF0A] ${
                  active ? "bg-[#F1BF0A] font-semibold text-[#090909]" : "font-medium hover:bg-white/10 active:bg-white/20"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DrawerPanel({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useOverlay<HTMLDivElement>(true, onClose);
  const { openPreferences } = useCookieConsent();

  const panelProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      {...panelProps}
      transition={{ duration: DURATION.base, ease: EASE }}
      className="fixed inset-0 z-[71] flex h-dvh w-full flex-col overflow-y-auto bg-[#183fad] text-white"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 p-4">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
        >
          <LogoMark className="size-8" />
          <span className="font-anton text-lg">MUGSY&apos;S MUGS</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      {/* Two groups side by side so every link is on screen at once. */}
      <nav aria-label="Main" className="grid flex-1 grid-cols-2 content-start gap-3 px-4 pt-2">
        <LinkGroup title="Menu" links={NAV_LINKS} pathname={pathname} onClose={onClose} />
        <LinkGroup title="Help" links={HELP_LINKS} pathname={pathname} onClose={onClose} />
      </nav>

      <div className="shrink-0 p-4">
        {/* The Footer's legal links: phone pages that use the tab bar have no Footer. */}
        <ul className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {[...LEGAL_LINKS, DEVELOPER_LINK].map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className={SMALL_LINK_CLASS}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                onClose();
                openPreferences();
              }}
              className={SMALL_LINK_CLASS}
            >
              Cookie settings
            </button>
          </li>
        </ul>
        <PillLink href="/shop" onClick={onClose} icon={<ArrowRightIcon className="size-6" />} layout="fluid" focusRing="light">
          Explore Collection
        </PillLink>
        <ul className="mt-5 flex justify-center gap-x-6">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
              >
                <span className="sr-only">{social.name}</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d={social.path} clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// The mobile menu: a full-page panel sliding in from the right, in the same
// blue as the Navbar, with the links in two groups (Menu | Help) in one row. Rendered by the Navbar
// outside its own <nav>, whose stacking context would otherwise cap its
// z-index below the page's sticky bars.
export default function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <DrawerPanel key="mobile-menu" onClose={onClose} />}</AnimatePresence>;
}
