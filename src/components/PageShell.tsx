import type { ReactNode } from "react";

// The wrapper around a page's own content. The Navbar and the Footer are not
// part of it: SiteFrame renders them once in the root layout, so they stay put
// between pages and the content swaps with no fade of its own (a fade made the
// banner under the header flash white on every navigation).
//
// It is a flex column that takes the leftover height, so the page's own <main>
// can use `flex-1` to push the Footer to the bottom of a short page.
export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
