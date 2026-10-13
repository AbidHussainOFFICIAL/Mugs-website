import type { ReactNode } from "react";

// The yellow-outline chip: solid yellow when selected, outlined when not.
export function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`shrink-0 whitespace-nowrap rounded-full border border-[#F1BF0A] px-4 py-1.5 text-sm font-medium text-[#090909] transition-[color,background-color,scale] duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
        selected ? "bg-[#F1BF0A]" : "bg-transparent hover:bg-[#F1BF0A]/10"
      }`}
    >
      {children}
    </button>
  );
}

// A single non-wrapping, horizontally scrollable row of chips — the same
// pattern the footer nav uses. Vertical padding gives the focus outline room
// that the scroll container would otherwise clip.
export function ChipRow({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`no-scrollbar flex flex-nowrap gap-2 overflow-x-auto py-1 px-0.5 ${className}`}
    >
      {children}
    </div>
  );
}
