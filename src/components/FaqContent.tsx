"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Accordion from "@/components/Accordion";
import { Chip, ChipRow } from "@/components/Chip";
import { FAQ_CATEGORIES, findFaqCategoryId } from "@/data/faq";

// The URL hash as an external store, so the page can react to a deep link
// (/faq#how-much-is-shipping) without reading `window` during render or
// syncing it in an effect. The server snapshot is empty: the hash never
// reaches the server.
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

export default function FaqContent() {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);

  const [categoryId, setCategoryId] = useState(FAQ_CATEGORIES[0].id);
  const [openId, setOpenId] = useState<string | null>(null);

  // A deep link to a question opens it, in its own category. Adjusting state
  // during render, guarded by a comparison, is React's documented pattern for
  // "change state when something it depends on changes".
  //
  // `scrollTarget` is only set for a hash that came from outside (a link, the
  // address bar, Back). When this page writes the hash itself, because a
  // question was opened by hand, `openId` already matches it and nothing
  // scrolls, so opening a question never moves the screen.
  const [handledHash, setHandledHash] = useState("");
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  if (hash !== handledHash) {
    setHandledHash(hash);
    const linkedCategoryId = findFaqCategoryId(hash);
    if (linkedCategoryId && hash !== openId) {
      setCategoryId(linkedCategoryId);
      setOpenId(hash);
      setScrollTarget(hash);
    }
  }

  // Bring a deep-linked question into view once it has rendered.
  useEffect(() => {
    if (!scrollTarget) return;
    document.getElementById(scrollTarget)?.scrollIntoView({ block: "start" });
  }, [scrollTarget]);

  const category = FAQ_CATEGORIES.find((c) => c.id === categoryId) ?? FAQ_CATEGORIES[0];

  function setUrlHash(id: string | null) {
    window.history.replaceState(null, "", id ? `${pathname}#${id}` : pathname);
  }

  function handleSelectCategory(id: string) {
    setCategoryId(id);
    setOpenId(null);
    setUrlHash(null);
  }

  function handleOpenChange(id: string | null) {
    setOpenId(id);
    setUrlHash(id);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Desktop: a sticky rail, like the Shop filter sidebar. */}
      <nav aria-label="FAQ categories" className="hidden lg:block self-start sticky top-6">
        <ul className="flex flex-col gap-1">
          {FAQ_CATEGORIES.map((c) => {
            const active = c.id === categoryId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(c.id)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full border-l-2 py-1.5 pl-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
                    active ? "border-[#F1BF0A] font-semibold text-[#183fad]" : "border-[#e9ecf6] hover:text-[#183fad]"
                  }`}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile and tablet: the same categories as a sticky chip row. */}
      <div className="lg:hidden sticky top-0 z-20 min-w-0 bg-white py-2">
        <ChipRow label="FAQ categories">
          {FAQ_CATEGORIES.map((c) => (
            <Chip key={c.id} selected={c.id === categoryId} onClick={() => handleSelectCategory(c.id)}>
              {c.label}
            </Chip>
          ))}
        </ChipRow>
      </div>

      <section aria-labelledby="faq-group-heading" className="min-w-0">
        <h2 id="faq-group-heading" className="font-anton text-xl sm:text-2xl">
          {category.label.toUpperCase()}
        </h2>
        <div className="mt-2">
          <Accordion
            columns={1}
            openId={openId}
            onOpenChange={handleOpenChange}
            items={category.items.map((item) => ({ id: item.id, title: item.question, content: item.answer }))}
          />
        </div>
      </section>
    </div>
  );
}
