import type { ReactNode } from "react";
import Link from "next/link";

// The yellow-outline pill: the quieter partner to the solid yellow pill, for
// a secondary action next to it ("Search the shop", "Send another", "Reject
// non-essential"). It matches the solid pill exactly in height (48px) and
// label size, so a pair always lines up.
//
// `onDark` is for a blue panel: white label and a white focus ring instead of
// ink on a light background. `fluid` mirrors the solid pill's "fluid" shape:
// full width below 480px, hugging its label above. Full class sets per
// variant, never stacked.
const BASE =
  "items-center justify-center gap-2 rounded-full border border-[#F1BF0A] bg-transparent px-6 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const TONES = {
  light: "text-[#090909] hover:bg-[#F1BF0A]/10 focus-visible:outline-[#183fad]",
  dark: "text-white hover:bg-white/10 focus-visible:outline-white",
} as const;
const SHAPES = {
  hug: "inline-flex h-12",
  fluid: "flex h-12 w-full min-[480px]:w-fit",
} as const;

function outlineClass(onDark: boolean, fluid: boolean, className: string) {
  return `${SHAPES[fluid ? "fluid" : "hug"]} ${BASE} ${onDark ? TONES.dark : TONES.light} ${className}`;
}

export function OutlineLink({
  href,
  children,
  className = "",
  onDark = false,
  fluid = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
  fluid?: boolean;
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  return (
    <Link href={href} className={outlineClass(onDark, fluid, className)} {...rest}>
      {children}
    </Link>
  );
}

export function OutlineButton({
  onClick,
  children,
  className = "",
  type = "button",
  disabled,
  onDark = false,
  fluid = false,
  ariaLabel,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onDark?: boolean;
  fluid?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${outlineClass(onDark, fluid, className)} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
