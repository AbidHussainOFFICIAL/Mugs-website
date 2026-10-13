// The site's main navigation, shared by the Navbar, the mobile menu and the
// Footer so a page added here shows up everywhere at once.

import { CATEGORY_META } from "@/lib/categories";

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/company", label: "Company" },
  { href: "/stores", label: "Stores" },
];

/** Shown in the mobile menu under "Help". */
export const HELP_LINKS: NavLink[] = [
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
];

/** Whether `href` is the page `pathname` is on, or a section containing it ("/shop" for "/shop/the-classic"). */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The pages the phone's bottom tab bar points at: Home, Shop (and its
 * category pages), Search, Wishlist and Cart. On a phone these pages have no
 * Footer; the tab bar is their navigation, and the menu carries the legal
 * links the Footer would have shown.
 */
export function isTabPage(pathname: string) {
  if (pathname === "/" || pathname === "/shop" || pathname === "/search" || pathname === "/wishlist" || pathname === "/cart") return true;
  if (!pathname.startsWith("/shop/")) return false;
  const segment = pathname.split("/")[2];
  return Boolean(segment) && segment in CATEGORY_META;
}

/** The legal and credit links the Footer shows, which the phone menu repeats. */
export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/press", label: "Press kit" },
  { href: "/sitemap", label: "Sitemap" },
];

/** The developer page, linked from the Footer and the sitemap. */
export const DEVELOPER_LINK: NavLink = { href: "/developer", label: "Built by Abid Hussain" };
