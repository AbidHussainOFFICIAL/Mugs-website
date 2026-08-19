"use client";

import { useState } from "react";

export default function SearchInput({
  value,
  onChange,
  autoFocus = false,
  placeholder = "Search mugs...",
}: {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 rounded-full border bg-white px-2 py-2 transition-colors ${
        focused ? "border-[#F1BF0A]" : "border-[#183fad]/20"
      }`}
    >
      <span className="flex items-center justify-center rounded-full bg-[#e9ecf6] p-1.5 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#183fad]" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label="Search products"
        className="flex-1 min-w-0 bg-transparent outline-none text-sm sm:text-base placeholder:text-[#5b5f6b]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="flex items-center justify-center rounded-full p-1 hover:bg-[#e9ecf6] transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 1 0 1.06 1.06L12 13.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L13.06 12l5.72-5.72a.75.75 0 0 0-1.06-1.06L12 10.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
