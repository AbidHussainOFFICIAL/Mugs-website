"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

// A small circular outline button that copies `text` and shows a check for
// about a second and a half. If the browser blocks clipboard access nothing
// changes — the text is still on screen to select by hand.
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="relative flex items-center justify-center size-8 shrink-0 rounded-full border border-[#F1BF0A] text-[#090909] transition-colors hover:bg-[#F1BF0A]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
    >
      {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      <span role="status" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
