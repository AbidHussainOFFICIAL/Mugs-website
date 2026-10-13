"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import { PillLink } from "@/components/PillButton";
import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "@/data/social";
import { HELP_LINKS, NAV_LINKS, isActivePath, type NavLink } from "@/lib/nav";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

function LinkGroup({ title, links, pathname, onClose }: { title?: string; links: NavLink[]; pathname: string; onClose: () => void }) {
  return (
    <div>
      {title && <p className="px-6 pb-1 pt-4 text-xs uppercase tracking-wide text-white/60">{title}</p>}
      <ul className="flex flex-col">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`block px-6 py-3 transition-colors hover:bg-white/10 hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F1BF0A] ${
                  active ? "font-semibold text-[#F1BF0A]" : ""
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

  const panelProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.base }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-[#090909]/60"
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        {...panelProps}
        transition={{ duration: DURATION.base, ease: EASE }}
        className="fixed bottom-0 right-0 top-0 z-[71] flex w-full max-w-[360px] flex-col overflow-y-auto rounded-l-4xl bg-[#183fad] text-white"
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

        <nav aria-label="Main" className="flex-1">
          <LinkGroup links={NAV_LINKS} pathname={pathname} onClose={onClose} />
          <LinkGroup title="Help" links={HELP_LINKS} pathname={pathname} onClose={onClose} />
        </nav>

        <div className="shrink-0 p-4">
          <PillLink href="/shop" onClick={onClose} icon={<ArrowRightIcon className="size-6" />} layout="full" focusRing="light">
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
    </>
  );
}

// The mobile menu: a full-height panel from the right, in the same blue as
// the Navbar, replacing the old inline dropdown. Rendered by the Navbar
// outside its own <nav>, whose stacking context would otherwise cap its
// z-index below the page's sticky bars.
export default function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <DrawerPanel key="mobile-menu" onClose={onClose} />}</AnimatePresence>;
}
