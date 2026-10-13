"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CloseIcon } from "@/components/icons";
import { OutlineButton } from "@/components/OutlineButton";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

export interface LegalNavSection {
  id: string;
  title: string;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

// The mobile "On this page" bottom sheet. Mounted only while open, so the
// overlay hook's scroll lock and focus trap run exactly while it's visible.
function TocSheet({
  sections,
  activeId,
  onClose,
}: {
  sections: LegalNavSection[];
  activeId: string;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const sheetRef = useOverlay<HTMLDivElement>(true, onClose);

  function handleSelect(id: string) {
    onClose();
    // Wait a tick: closing releases the page's scroll lock, and the jump
    // needs the page to be scrollable again.
    window.setTimeout(() => scrollToSection(id), 50);
  }

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[70] bg-[#183fad]/90" aria-hidden="true" />
      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="On this page"
        initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE }}
        className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[85dvh] flex-col rounded-t-4xl bg-white"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#e9ecf6] p-4">
          <h2 className="font-anton text-xl">ON THIS PAGE</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center rounded-full bg-[#F1BF0A] p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <ul className="overflow-y-auto p-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleSelect(section.id);
                }}
                aria-current={section.id === activeId ? "true" : undefined}
                className={`block rounded-2xl px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                  section.id === activeId ? "bg-[#F1BF0A] font-semibold" : "hover:bg-[#e9ecf6]"
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

// "On this page" for the legal pages: a sticky rail on desktop that follows
// the reader through the sections, and a button + bottom sheet below lg.
export default function LegalNav({ sections }: { sections: LegalNavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [sheetOpen, setSheetOpen] = useState(false);
  const visibleIds = useRef(new Set<string>());

  useEffect(() => {
    const visible = visibleIds.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The first section (in page order) still in the top band wins.
        const first = sections.find((section) => visible.has(section.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: "0px 0px -65% 0px" }
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      visible.clear();
    };
  }, [sections]);

  return (
    <>
      <nav aria-label="On this page" className="hidden lg:block self-start sticky top-6">
        <p className="mb-2 font-anton text-lg">ON THIS PAGE</p>
        <ul className="flex flex-col gap-1">
          {sections.map((section) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`block border-l-2 py-1.5 pl-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                    active ? "border-[#F1BF0A] font-semibold text-[#183fad]" : "border-[#e9ecf6] hover:text-[#183fad]"
                  }`}
                >
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="lg:hidden">
        <OutlineButton onClick={() => setSheetOpen(true)}>On this page</OutlineButton>
      </div>
      {sheetOpen && <TocSheet sections={sections} activeId={activeId} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
