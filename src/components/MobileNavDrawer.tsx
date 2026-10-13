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

function LinkGroup({ title, links, pathname, onClose }: { title: string; links: NavLink[]; pathname: string; onClose: () => void }) {
  return (
    <div className="min-w-0">
      <p className="px-2 pb-2 text-xs uppercase tracking-wide text-white/60">{title}</p>
      <ul className="flex flex-col gap-1">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`block break-words rounded-2xl px-2 py-3 text-lg leading-snug transition-colors hover:bg-white/10 hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F1BF0A] ${
                  active ? "font-semibold text-[#F1BF0A]" : "font-medium"
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
      <nav aria-label="Main" className="grid flex-1 grid-cols-2 content-start gap-x-4 px-4 pt-2">
        <LinkGroup title="Menu" links={NAV_LINKS} pathname={pathname} onClose={onClose} />
        <LinkGroup title="Help" links={HELP_LINKS} pathname={pathname} onClose={onClose} />
      </nav>

      <div className="shrink-0 p-4">
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
