"use client";

import type { KeyboardEvent } from "react";

// A two-or-three-way switch between panels: a soft pill track with the
// selected segment filled yellow. Built from the chip's colours. Follows the
// tabs pattern — arrow keys move between segments, and each tab and its panel
// are tied together by `idPrefix`:
//   tab id   `${idPrefix}-tab-${value}`
//   panel id `${idPrefix}-panel-${value}`  (give the panel role="tabpanel")
export default function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
  idPrefix,
  ariaLabel,
}: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  idPrefix: string;
  ariaLabel: string;
}) {
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.value);
    document.getElementById(`${idPrefix}-tab-${next.value}`)?.focus();
  }

  return (
    <div role="tablist" aria-label={ariaLabel} className="inline-flex rounded-full bg-[#e9ecf6] p-1">
      {tabs.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            id={`${idPrefix}-tab-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.value}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold text-[#090909] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
              selected ? "bg-[#F1BF0A]" : "hover:bg-white/60"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
