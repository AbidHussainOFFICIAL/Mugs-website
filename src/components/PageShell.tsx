import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Full literal class names, not built from a template string, so Tailwind
// can see them when it scans the source.
const OVERFLOW_X = {
  hidden: "overflow-x-hidden",
  clip: "overflow-x-clip",
} as const;

// The wrapper every page shares: Navbar, the page's own content, Footer,
// in a full-height flex column so a page with little content still keeps
// its Footer at the bottom of the screen (the page's own <main> takes
// `flex-1` to absorb the leftover space).
//
// Spacing above the Footer comes from the Footer's own top margin alone.
// Pages used to also give their <main> a bottom margin, so the two stacked
// (80px + 80px on desktop) and the gap before the Footer read as a hole —
// most noticeably under "You Might Also Need" on the Cart page. Keep <main>
// free of a bottom margin so this stays the single source of that space.
//
// On mobile the bottom tab bar can be showing; it publishes its height as
// the CSS variable --dock-h (0px whenever it is hidden), and the wrapper's
// bottom padding uses it so the bar never covers the Footer's last line.
//
// `reserveBottomBar` is for a page with a fixed bar docked to the bottom of
// the screen on mobile (the product page's sticky add-to-cart bar): it adds
// bottom padding on those screens so the bar can't sit on top of the
// Footer's last line when scrolled to the very end.
//
// `overflowX="clip"` is for a page that has a `position: sticky` element
// inside it (the Cart's Order Summary): `hidden` turns this wrapper into a
// scroll container, which stops sticky from working; `clip` cuts off
// horizontal overflow without doing that.
export default function PageShell({
  children,
  overflowX = "hidden",
  reserveBottomBar = false,
}: {
  children: ReactNode;
  overflowX?: keyof typeof OVERFLOW_X;
  reserveBottomBar?: boolean;
}) {
  return (
    <div
      className={`min-h-dvh w-full ${OVERFLOW_X[overflowX]} text-base font-normal text-[#090909] px-4 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 flex flex-col ${
        reserveBottomBar ? "pb-24 lg:pb-0" : "pb-[var(--dock-h,0px)]"
      }`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

