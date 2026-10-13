"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION } from "@/lib/motion";

interface AccordionItem {
  title: string;
  content: string;
  /** Anchor id for deep links (e.g. /faq#how-much-is-shipping). Falls back to the title as the item's key. */
  id?: string;
}

// One item open at a time. Used uncontrolled on the product page (two
// columns); the FAQ page uses it in a single column and controls which item
// is open so a link to a question can open it.
export default function Accordion({
  items,
  columns = 2,
  openId,
  onOpenChange,
}: {
  items: AccordionItem[];
  columns?: 1 | 2;
  /** Controlled mode: the key (id, or title if no id) of the open item, or null for none. Omit to let the accordion manage itself. */
  openId?: string | null;
  onOpenChange?: (openId: string | null) => void;
}) {
  const baseId = useId();
  const [internalOpenId, setInternalOpenId] = useState<string | null>(null);
  const currentOpenId = openId !== undefined ? openId : internalOpenId;

  function toggle(key: string) {
    const next = currentOpenId === key ? null : key;
    if (openId === undefined) setInternalOpenId(next);
    onOpenChange?.(next);
  }

  return (
    <div className={columns === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12" : "grid grid-cols-1"}>
      {items.map((item, index) => {
        const key = item.id ?? item.title;
        const isOpen = currentOpenId === key;
        // Generated, not derived from the key: titles contain spaces, which
        // aren't valid in an id referenced by aria-controls.
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={key} id={item.id} className="border-b border-[#e9ecf6] scroll-mt-24">
            <button
              type="button"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
            >
              <span className="font-semibold text-sm sm:text-base">{item.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`size-5 text-[#183fad] shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: DURATION.base }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm text-[#090909]/80">{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
