// The site's main navigation, shared by the Navbar, the mobile menu and the
// Footer so a page added here shows up everywhere at once.

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
