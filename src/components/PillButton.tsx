"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Created once at module level — motion.create() inside a component body would
// build a brand-new component type on every render and break the animation.
// next/link forwards its ref to the underlying <a> and passes style through,
// which is what motion.create() needs from a wrapped component.
const MotionLink = motion.create(Link);

// The exact recipe for every yellow pill CTA in the app: a white circle
// that expands to fill the pill on hover, on a custom ease curve. Two
// shapes, matching the two ways this button is actually used:
//
// - "hug" — a content-sized button (Shop Now, Explore Collection, Write a
//   Review, Load More, Continue Shopping). The icon sits in normal flex
//   flow; centering it with justify-center works fine because the button
//   never stretches.
//
// - "full" — a full-width button (Checkout, Place Order). Per the locked
//   lesson in this project: in a WIDE button, the icon must be absolutely
//   positioned at the same coordinates as the decorative white circle
//   (top-1/2 -translate-y-1/2 left-1.5 size-9), NOT left in normal flex
//   flow — flex centering drifts the icon+text group away from the circle,
//   since the circle is a separate pseudo-element, not part of the flex
//   layout. This bug hit twice before the rule was locked in; "full" bakes
//   the fix in so it can't recur.
//
// The 1600ms duration and easing curve are fixed — every pill in the app
// uses the same one, so no case here or overriding class should change it.

// Only the parts every pill shares unconditionally live here — anything
// that varies by size (padding, gap, circle size, text size) is looked up
// per-variant below instead of being stacked as extra classes on top of
// this string. Tailwind's generated stylesheet order does not follow
// className string order, so e.g. "py-1.5 ... py-1.25" on the same element
// has an unpredictable winner — full per-size class sets avoid that class
// of bug entirely, rather than relying on override ordering.
const BASE =
  "rounded-full whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#F1BF0A] text-[#090909]";

// size -> [circle position/size, padding + gap, text size]
const SIZES = {
  // The default: every pill except CollectionHeader's desktop button and
  // ReviewsSection's Write a Review button.
  md: { circle: "after:left-1.5 after:h-9 after:w-9", pad: "py-1.5 pl-1.5 pr-4 gap-2", text: "" },
  // CollectionHeader's desktop "Explore Collection" — its own slightly
  // tighter padding, preserved exactly rather than approximated.
  compact: { circle: "after:left-1.5 after:h-9 after:w-9", pad: "py-1.25 pl-1.25 pr-3.5 gap-2", text: "" },
  // ReviewsSection's "Write a Review" — smaller on mobile (including the
  // circle sitting 2px closer to the edge), "md" size from sm: up.
  sm: {
    circle: "after:left-1 sm:after:left-1.5 after:h-7 after:w-7 sm:after:h-9 sm:after:w-9",
    pad: "py-1 pl-1 pr-3 sm:py-1.5 sm:pl-1.5 sm:pr-4 gap-1.5 sm:gap-2",
    text: "text-xs sm:text-sm",
  },
} as const;

type PillSize = keyof typeof SIZES;

type PillButtonBaseProps = {
  icon: ReactNode;
  children: ReactNode;
  layout?: "hug" | "full";
  size?: PillSize;
  /** The pill sits on a dark (blue) background by default, so the focus ring is white; pass "dark" when the pill sits on a light background instead. */
  focusRing?: "light" | "dark";
  className?: string;
  /**
   * "hug" is `display: flex` by default — a block-level box. That's what
   * every existing hug button actually needs: each one sits as an item of
   * a flex row or column (Navbar, CollectionHeader, EmptyState, LoadMore,
   * ReviewsSection), where the ANCESTOR's own flex layout — not this
   * button's own display type — is what makes it hug its content; the
   * button's own block-level box goes along with whatever size that flex
   * item is given. Checkout's "Continue Shopping" is the one hug button
   * that instead sits in a plain, wide, non-flex block wrapper — nothing
   * there constrains a block-level child's width, so it stretched to fill
   * that whole wrapper. Pass `inline` there so the button becomes an
   * inline-level box (`inline-flex`) instead, which never stretches to
   * fill its container regardless of what kind of container it's in.
   * No effect on "full" layout, which is always meant to span its
   * container's width.
   */
  inline?: boolean;
};

function iconWrapperSize(size: PillSize) {
  return size === "sm" ? "size-7 sm:size-9" : "size-9";
}

function PillContent({ icon, children, layout, size = "md" }: Pick<PillButtonBaseProps, "icon" | "children" | "layout" | "size">) {
  if (layout === "full") {
    return (
      <>
        <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 ${iconWrapperSize(size)}`}>
          {icon}
        </span>
        <span className="relative z-10 pl-8">{children}</span>
      </>
    );
  }
  return (
    <>
      <div className={`rounded-full relative z-10 ${size === "sm" ? "p-1 sm:p-1.5" : "p-1.5"}`}>{icon}</div>
      <span className="relative z-10">{children}</span>
    </>
  );
}

// "full" layout's own vertical padding, kept entirely separate from the
// per-size `pad` strings above rather than layered on top of one of them.
// The icon in a "full" button is absolutely positioned (that's the whole
// point of the layout — see the note at the top of this file), so it
// contributes nothing to the button's flex height; only the padding
// around the text line does. Reusing "hug"'s py-1.5 here made these
// buttons (Checkout, Place Order) render visibly shorter than every hug
// button, since those get their height from the icon circle instead.
// py-3 brings a "full" button's total height back in line with a "hug"
// button's ~48px. This never appears alongside a SIZES pad string for the
// same element — layout is chosen first, so there's nothing to conflict.
const FULL_LAYOUT_PADDING = "py-3 pl-1.5 pr-4";

function pillClassName({
  layout,
  size = "md",
  focusRing,
  className,
  inline,
}: Pick<PillButtonBaseProps, "layout" | "size" | "focusRing" | "className" | "inline">) {
  const { circle, pad, text } = SIZES[size];
  // Both branches below include the complete literal class names
  // ("flex", "inline-flex") Tailwind's content scanner needs to see, even
  // though only one is ever used on a given element — building this from
  // pieces (e.g. `${inline ? "inline-" : ""}flex`) would hide the full
  // token from the scanner and silently produce no CSS for it.
  const display = layout === "full" ? "flex" : inline ? "inline-flex" : "flex";
  const justify = layout === "full" ? `${display} items-center justify-center` : `${display} items-center`;
  const padding = layout === "full" ? FULL_LAYOUT_PADDING : pad;
  const ring = focusRing === "dark" ? "focus-visible:outline-[#183fad]" : "focus-visible:outline-white";
  return [BASE, justify, padding, circle, text, ring, className].filter(Boolean).join(" ");
}

export function PillLink({
  href,
  icon,
  children,
  layout = "hug",
  size = "md",
  focusRing = "dark",
  className = "",
  inline = false,
  onClick,
  "aria-label": ariaLabel,
  tapFeedback = false,
}: PillButtonBaseProps & { href: string; onClick?: () => void; "aria-label"?: string; tapFeedback?: boolean }) {
  const tapProps = tapFeedback ? { whileTap: { scale: 0.97 } } : {};
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...tapProps}
      className={pillClassName({ layout, size, focusRing, className, inline })}
    >
      <PillContent icon={icon} layout={layout} size={size}>
        {children}
      </PillContent>
    </MotionLink>
  );
}

export function PillButtonElement({
  icon,
  children,
  layout = "hug",
  size = "md",
  focusRing = "dark",
  className = "",
  inline = false,
  onClick,
  disabled,
  type = "button",
  tapFeedback = false,
}: PillButtonBaseProps & { onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; tapFeedback?: boolean }) {
  const tapProps = tapFeedback ? { whileTap: { scale: 0.97 } } : {};
  const fullClassName = [pillClassName({ layout, size, focusRing, className, inline }), disabled ? "disabled:opacity-50" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...tapProps} className={fullClassName}>
      <PillContent icon={icon} layout={layout} size={size}>
        {children}
      </PillContent>
    </motion.button>
  );
}