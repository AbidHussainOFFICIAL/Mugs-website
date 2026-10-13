"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpIcon } from "@/components/icons";
import { useFooterNear } from "@/lib/useFooterNear";

const SHOW_AFTER_PX = 800;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolledFar = () => window.scrollY > SHOW_AFTER_PX;
const getServerFalse = () => false;

// A round yellow "back to top" button for long pages. Appears after the
// reader has scrolled a while, stacks above the mobile tab bar via the
// --dock-h variable the tab bar publishes, and steps aside once the Footer
// is on screen so it never sits on top of it.
export default function BackToTop() {
  const scrolledFar = useSyncExternalStore(subscribeToScroll, getScrolledFar, getServerFalse);
  const footerNear = useFooterNear();

  if (!scrolledFar || footerNear) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      className="fixed right-4 bottom-[calc(var(--dock-h,0px)+1rem)] z-30 flex size-11 items-center justify-center rounded-full bg-[#F1BF0A] text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] sm:right-6"
    >
      <ArrowUpIcon className="size-5" />
    </button>
  );
}
