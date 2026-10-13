"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CartIcon, HeartIcon, HomeIcon, SearchIcon, ShoppingBagIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { isActivePath } from "@/lib/nav";

const ITEM_CLASS =
  "relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F1BF0A]";

// The yellow pill behind the current tab's icon is one shared element (a
// layoutId), so moving between tabs slides it across instead of swapping it.
function TabIcon({ active, children, badge = 0 }: { active: boolean; children: ReactNode; badge?: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className={`relative flex h-7 w-12 items-center justify-center rounded-full ${active ? "text-[#090909]" : ""}`}>
      {active && (
        <motion.span
          layoutId="tab-active-pill"
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
          className="absolute inset-0 rounded-full bg-[#F1BF0A]"
        />
      )}
      <motion.span whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }} className="relative z-10 flex">
        {children}
      </motion.span>
      {badge > 0 && (
        <span className="absolute -right-1.5 -top-1 z-20 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F1BF0A] px-1 text-[10px] font-semibold leading-none text-[#090909]">
          {badge}
        </span>
      )}
    </span>
  );
}

// The mobile tab row of the BottomDock: Home, Shop, Search, Wishlist, Cart.
// Cart goes to the cart page, like the other four go to their pages.
export default function TabBarRow() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const tabs = [
    { href: "/", label: "Home", icon: <HomeIcon className="size-5" />, badge: 0, ariaLabel: undefined },
    { href: "/shop", label: "Shop", icon: <ShoppingBagIcon className="size-5" />, badge: 0, ariaLabel: undefined },
    { href: "/search", label: "Search", icon: <SearchIcon className="size-5" />, badge: 0, ariaLabel: undefined },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: <HeartIcon className="size-5" />,
      badge: wishlistCount,
      ariaLabel: `Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`,
    },
    {
      href: "/cart",
      label: "Cart",
      icon: <CartIcon className="size-5" />,
      badge: itemCount,
      ariaLabel: `Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`,
    },
  ];

  return (
    <nav aria-label="Quick navigation" className="px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
      <ul className="mx-auto flex max-w-[480px] items-stretch">
        {tabs.map((tab) => {
          const active = isActivePath(pathname, tab.href);
          return (
            <li key={tab.href} className="flex flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                aria-label={tab.ariaLabel}
                className={`${ITEM_CLASS} ${active ? "font-semibold" : ""}`}
              >
                <TabIcon active={active} badge={tab.badge}>
                  {tab.icon}
                </TabIcon>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
