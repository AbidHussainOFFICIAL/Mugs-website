"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CookieNotice from "@/components/CookieNotice";
import TabBarRow from "@/components/TabBarRow";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { CATEGORY_META } from "@/lib/categories";
import { useFooterNear } from "@/lib/useFooterNear";
import { DURATION, EASE } from "@/lib/motion";

// ---- Has the reader moved past the page's top banner? ----
// The first <header> on a page is its big blue banner (the Hero on the
// landing page, PageHeaderBanner elsewhere). Nothing docks to the bottom
// while that banner is on screen. A page too short to scroll counts as
// "past it", so the cookie notice can't be stuck hidden forever.
function subscribeToPage(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
function getPastBanner() {
  if (document.documentElement.scrollHeight <= window.innerHeight + 1) return true;
  const banner = document.querySelector("header");
  return banner ? banner.getBoundingClientRect().bottom < 0 : window.scrollY > 200;
}

// ---- Overlays: any dialog or sheet locks page scroll with body overflow: hidden ----
function subscribeToBodyStyle(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
  return () => observer.disconnect();
}
const getOverlayOpen = () => document.body.style.overflow === "hidden";

const getServerFalse = () => false;

// Pages that dock their own bar to the bottom of the screen on mobile: the
// cart and checkout order bar, and the product page's add-to-cart bar. The
// tab row stays away from them.
function hasOwnBottomBar(pathname: string) {
  if (pathname === "/cart" || pathname === "/checkout") return true;
  if (!pathname.startsWith("/shop/")) return false;
  const segment = pathname.split("/")[2];
  if (!segment) return false;
  return !(segment in CATEGORY_META);
}

// The one fixed surface at the bottom of the screen: the cookie notice (until
// a choice is made) stacked on the mobile tab row, sharing a single blue
// shape with rounded top corners so they read as one piece. Each row slides
// in and out by height, and the whole dock publishes its height as the CSS
// variable --dock-h for the pieces that stack above it (Back to top).
export default function BottomDock() {
  const pathname = usePathname();
  const { choice, isHydrated } = useCookieConsent();
  const pastBanner = useSyncExternalStore(subscribeToPage, getPastBanner, getServerFalse);
  const overlayOpen = useSyncExternalStore(subscribeToBodyStyle, getOverlayOpen, getServerFalse);
  const footerNear = useFooterNear();
  const shouldReduceMotion = useReducedMotion();

  const cookieShown = isHydrated && choice === null && pastBanner && !overlayOpen;
  // Hidden before the Footer arrives so the Footer is seen clearly.
  const tabShown = pastBanner && !overlayOpen && !footerNear && !hasOwnBottomBar(pathname);

  const dockRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const root = document.documentElement;
    function publish() {
      root.style.setProperty("--dock-h", `${dock?.offsetHeight ?? 0}px`);
    }
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(dock);
    return () => {
      observer.disconnect();
      root.style.setProperty("--dock-h", "0px");
    };
  }, []);

  const rowMotion = {
    initial: { height: 0 },
    animate: { height: "auto" },
    exit: { height: 0 },
    transition: { duration: shouldReduceMotion ? 0 : DURATION.base, ease: EASE },
  };

  return (
    <div ref={dockRef} className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] sm:px-5 lg:px-6 xl:px-8">
      <div className="pointer-events-auto mx-auto max-w-[1400px] overflow-hidden rounded-t-4xl bg-[#183fad] text-white">
        <AnimatePresence initial={false}>
          {cookieShown && (
            <motion.div key="cookie" {...rowMotion} className="overflow-hidden">
              <CookieNotice divider={tabShown} />
            </motion.div>
          )}
          {tabShown && (
            <motion.div key="tabs" {...rowMotion} className="overflow-hidden md:hidden">
              <TabBarRow />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
