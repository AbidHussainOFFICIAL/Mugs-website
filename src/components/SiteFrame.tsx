"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// The frame every page lives in. The Navbar and the Footer are rendered here,
// once, by the root layout, so they stay mounted while the person moves
// between pages: only the page's own content swaps between them. That is what
// keeps the header and the banner under it looking like one piece, and what
// lets the Navbar's active-link pill slide from one link to the next.
//
// It is a full-height flex column, so a page with little content still keeps
// its Footer at the bottom of the screen (the page's own <main> takes `flex-1`
// to absorb the leftover space). Spacing above the Footer comes from the
// Footer's own top margin alone, so keep a page's <main> free of a bottom
// margin.
//
// `overflow-x-clip` cuts off horizontal overflow without making this a scroll
// container, so `position: sticky` elements inside a page (the Cart's Order
// Summary, the FAQ rail, the gift card preview) keep working.
//
// The announcement bar belongs to the landing page only, and sits above the
// padded frame so it spans the full width of the screen.
export default function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && <AnnouncementBar />}
      <div className="flex min-h-dvh w-full flex-col overflow-x-clip px-4 pt-3 text-base font-normal text-[#090909] sm:px-5 sm:pt-4 lg:px-6 xl:px-8">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
