"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/company", label: "Company" },
  { href: "/stores", label: "Stores" },
];

const menuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE, staggerChildren: STAGGER.tight },
  },
  exit: { height: 0, opacity: 0, transition: { duration: DURATION.fast, ease: EASE } },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.fast } },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav className="flex items-center justify-between max-w-[1400px] w-full mx-auto relative z-20 overflow-hidden">
      <Link
        href="/"
        className="flex items-center gap-1.5 bg-white px-5 rounded-br-4xl relative after:content-[''] after:absolute after:bg-[#183fad] after:w-1/2 after:h-1/2 after:-bottom-1 after:-right-1 after:-z-5 self-stretch w-full max-w-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="40" height="40" rx="6" fill="#F1BF0A" />
          <path
            d="M15.3414 14.7356C15.4039 15.1058 15.726 15.3846 16.1106 15.3846H16.9039C17.375 15.3846 17.75 14.976 17.6875 14.5192C17.5048 13.1635 16.899 11.9135 15.9279 10.9279C15.2356 10.2212 14.7933 9.32692 14.6587 8.35577C14.6058 7.97596 14.2789 7.69231 13.8846 7.69231H13.0962C12.625 7.69231 12.2596 8.10096 12.3125 8.55769C12.5 10.0913 13.1779 11.5048 14.2644 12.6154C14.8414 13.2019 15.2115 13.9375 15.3414 14.7356ZM20.726 14.7356C20.7885 15.1058 21.1106 15.3846 21.4952 15.3846H22.2885C22.7596 15.3846 23.1346 14.976 23.0721 14.5192C22.8894 13.1635 22.2837 11.9135 21.3125 10.9279C20.6202 10.2212 20.1779 9.32692 20.0433 8.35577C19.9904 7.97596 19.6635 7.69231 19.2692 7.69231H18.4808C18.0096 7.69231 17.6394 8.10096 17.6971 8.55769C17.8846 10.0913 18.5625 11.5048 19.649 12.6154C20.226 13.2019 20.5962 13.9375 20.726 14.7356ZM28.4615 16.9231H10.7692C9.91827 16.9231 9.23077 17.6106 9.23077 18.4615V27.6923C9.23077 30.2404 11.2981 32.3077 13.8462 32.3077H23.0769C25.625 32.3077 27.6923 30.2404 27.6923 27.6923H28.4615C31.4327 27.6923 33.8462 25.2788 33.8462 22.3077C33.8462 19.3365 31.4327 16.9231 28.4615 16.9231ZM28.4615 24.6154H27.6923V20H28.4615C29.7356 20 30.7692 21.0337 30.7692 22.3077C30.7692 23.5817 29.7356 24.6154 28.4615 24.6154Z"
            fill="#090909"
          />
        </svg>
        <span className="font-anton select-none">MUGSY&apos;S MUGS</span>
      </Link>

      <div className="flex items-center justify-end min-[480px]:justify-between gap-4 flex-1 bg-[#183fad] text-white p-3.5 rounded-t-4xl">
        <div className="hidden md:block"></div>

        <ul className="hidden md:flex items-center gap-6 py-2.5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A] rounded">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label={`View cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative flex items-center justify-center rounded-full p-2 hover:text-[#F1BF0A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
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
          </Link>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            className="md:hidden cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 0 0-1.06-1.06L12 10.94 6.28 5.22Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </motion.button>
        </div>

        <Link
          href="/shop"
          className="hidden min-[480px]:flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <div className="rounded-full p-1.5 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </div>
          <span className="relative z-10">Explore Collection</span>
        </Link>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#183fad] text-white rounded-3xl shadow-lg overflow-hidden z-30"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    className="block px-6 py-3.5 hover:bg-white/10 hover:text-[#F1BF0A] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={menuItemVariants}>
                <Link
                  href="/shop"
                  className="block px-6 py-3.5 font-semibold text-[#F1BF0A] hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Explore Collection
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
