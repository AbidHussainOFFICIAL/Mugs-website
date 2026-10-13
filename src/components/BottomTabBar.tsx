"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartIcon, HeartIcon, HomeIcon, SearchIcon, ShoppingBagIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORY_META } from "@/lib/categories";
import { isActivePath } from "@/lib/nav";

// ---- Page position: has the reader scrolled past the top banner? ----
// The first <header> on a page is its big blue banner (the Hero on the
// landing page, PageHeaderBanner elsewhere). The bar stays out of the way
// while that banner, and the Navbar above it, are still on screen.
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
function getPastBanner() {
  const banner = document.querySelector("header");
  return banner ? banner.getBoundingClientRect().bottom < 0 : window.scrollY > 200;
}
const getServerFalse = () => false;

// ---- Overlays: any dialog/sheet locks scroll with body overflow: hidden ----
function subscribeToBodyStyle(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
  return () => observer.disconnect();
}
const getOverlayOpen = () => document.body.style.overflow === "hidden";

// Pages that dock their own bar to the bottom of the screen on mobile: the
// cart and checkout order bar, and the product page's add-to-cart bar.
function hasOwnBottomBar(pathname: string) {
  if (pathname === "/cart" || pathname === "/checkout") return true;
  if (!pathname.startsWith("/shop/")) return false;
  const segment = pathname.split("/")[2];
  if (!segment) return false;
  return !(segment in CATEGORY_META);
}

const ITEM_BASE =
  "relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F1BF0A]";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F1BF0A] px-1 text-[10px] font-semibold leading-none text-[#090909]">
      {count}
    </span>
  );
}

function TabIcon({ active, children, badge = 0 }: { active: boolean; children: ReactNode; badge?: number }) {
  return (
    <span className={`relative flex h-7 w-12 items-center justify-center rounded-full transition-colors ${active ? "bg-[#F1BF0A] text-[#090909]" : ""}`}>
      {children}
      <Badge count={badge} />
    </span>
  );
}

// Mobile-only bottom tab bar: Home, Shop, Search, Wishlist, Cart. It
// publishes its own height as --dock-h so other bottom-docked pieces (the
// cookie notice, Back to top, the page's own bottom padding) can sit above it.
export default function BottomTabBar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { open: openCartDrawer } = useCartDrawer();

  const pastBanner = useSyncExternalStore(subscribeToScroll, getPastBanner, getServerFalse);
  const overlayOpen = useSyncExternalStore(subscribeToBodyStyle, getOverlayOpen, getServerFalse);
  const shown = pastBanner && !overlayOpen && !hasOwnBottomBar(pathname);

  const barRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const bar = barRef.current;
    const root = document.documentElement;
    if (!bar || !shown) {
      root.style.setProperty("--dock-h", "0px");
      return;
    }
    function publish() {
      // Zero from md up, where the bar is display: none.
      root.style.setProperty("--dock-h", `${bar?.offsetHeight ?? 0}px`);
    }
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.setProperty("--dock-h", "0px");
    };
  }, [shown]);

  const tabs = [
    { href: "/", label: "Home", icon: <HomeIcon className="size-5" /> },
    { href: "/shop", label: "Shop", icon: <ShoppingBagIcon className="size-5" /> },
    { href: "/search", label: "Search", icon: <SearchIcon className="size-5" /> },
  ];

  return (
    <nav
      ref={barRef}
      aria-label="Quick navigation"
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 rounded-t-4xl bg-[#183fad] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-white transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="mx-auto flex max-w-[480px] items-stretch">
        {tabs.map((tab) => {
          const active = isActivePath(pathname, tab.href);
          return (
            <li key={tab.href} className="flex flex-1">
              <Link href={tab.href} aria-current={active ? "page" : undefined} className={`${ITEM_BASE} ${active ? "font-semibold" : ""}`}>
                <TabIcon active={active}>{tab.icon}</TabIcon>
                {tab.label}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <Link
            href="/wishlist"
            aria-current={isActivePath(pathname, "/wishlist") ? "page" : undefined}
            aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
            className={`${ITEM_BASE} ${isActivePath(pathname, "/wishlist") ? "font-semibold" : ""}`}
          >
            <TabIcon active={isActivePath(pathname, "/wishlist")} badge={wishlistCount}>
              <HeartIcon className="size-5" />
            </TabIcon>
            Wishlist
          </Link>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={openCartDrawer} aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`} className={ITEM_BASE}>
            <TabIcon active={false} badge={itemCount}>
              <CartIcon className="size-5" />
            </TabIcon>
            Cart
          </button>
        </li>
      </ul>
    </nav>
  );
}
