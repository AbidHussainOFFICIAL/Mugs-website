"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import { PillLink } from "@/components/PillButton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { NAV_LINKS, isActivePath } from "@/lib/nav";
import { DURATION } from "@/lib/motion";

const EXPLORE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Close the mobile menu when the route changes by any means (a link in it,
  // browser Back/Forward). Adjusting state during render, guarded by a
  // comparison, is React's documented pattern for this.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { open: openCartDrawer } = useCartDrawer();

  return (
    <>
      <nav className="flex items-center justify-between max-w-[1400px] w-full mx-auto relative z-20">
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-white px-3 sm:px-5 rounded-br-4xl relative after:content-[''] after:absolute after:bg-[#183fad] after:w-1/2 after:h-1/2 after:-bottom-1 after:-right-1 after:-z-5 self-stretch w-full max-w-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <LogoMark className="size-8 sm:size-10 shrink-0" />
          <span className="font-anton select-none whitespace-nowrap">
            <span className="sm:hidden">MUGSY&apos;S</span>
            <span className="hidden sm:inline">MUGSY&apos;S MUGS</span>
          </span>
        </Link>

        <div className="flex items-center justify-end min-[480px]:justify-between gap-4 flex-1 bg-[#183fad] text-white p-3.5 rounded-t-4xl">
          <div className="hidden md:block"></div>

          <ul className="hidden md:flex items-center gap-6 py-2.5">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded transition-colors hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A] ${
                      active ? "text-[#F1BF0A] underline decoration-2 underline-offset-8" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-0.5 sm:gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="relative flex items-center justify-center rounded-full p-1.5 sm:p-2 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </Link>

            <Link
              href="/wishlist"
              aria-label={`View wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
              className="relative flex items-center justify-center rounded-full p-1.5 sm:p-2 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-6" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: DURATION.base }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#F1BF0A] text-[#090909] text-[10px] font-semibold leading-none"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart is no longer a Link — it opens the drawer instead of
                navigating away. "View Full Cart" inside the drawer still
                navigates to /cart with a real Link, so the URL itself stays
                directly shareable/bookmarkable. */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative flex items-center justify-center rounded-full p-1.5 sm:p-2 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-6" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: DURATION.base }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#F1BF0A] text-[#090909] text-[10px] font-semibold leading-none"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              className="md:hidden cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 sm:size-9" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>

          {/* Wrapped rather than passed as a class on the pill itself: the pill's
              own base class already includes `flex`, and stacking `hidden` +
              `flex` on the same element depends on unpredictable Tailwind rule
              ordering. A wrapper with `hidden` / `block` sidesteps that. */}
          <div className="hidden min-[480px]:block">
            <PillLink href="/shop" icon={EXPLORE_ICON} layout="hug" focusRing="light">
              Explore Collection
            </PillLink>
          </div>
        </div>
      </nav>
      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
