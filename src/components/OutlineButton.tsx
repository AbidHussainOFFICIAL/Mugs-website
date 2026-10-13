import type { ReactNode } from "react";
import Link from "next/link";

// The yellow-outline pill: the quieter partner to the solid yellow pill,
// for a secondary action next to it ("Visit press kit", "Send another",
// "Reject non-essential"). Same height and weight as a solid pill's label.
// `onDark` is for a blue panel: white label and a white focus ring instead
// of ink on a light background. Full class sets per tone, never stacked.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#F1BF0A] bg-transparent px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const TONES = {
  light: "text-[#090909] hover:bg-[#F1BF0A]/10 focus-visible:outline-[#183fad]",
  dark: "text-white hover:bg-white/10 focus-visible:outline-white",
} as const;

function outlineClass(onDark: boolean, className: string) {
  return `${BASE} ${onDark ? TONES.dark : TONES.light} ${className}`;
}

export function OutlineLink({
  href,
  children,
  className = "",
  onDark = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  return (
    <Link href={href} className={outlineClass(onDark, className)} {...rest}>
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
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onDark?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${outlineClass(onDark, className)} disabled:opacity-50`}>
      {children}
    </button>
  );
}
