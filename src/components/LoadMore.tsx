"use client";

import { PillButtonElement } from "@/components/PillButton";

const CHEVRON_DOWN_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25 12 15.75 4.5 8.25" />
  </svg>
);

export default function LoadMore({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) {
  return (
    <div className="flex justify-center mt-10 sm:mt-14">
      <PillButtonElement onClick={onClick} disabled={loading} icon={CHEVRON_DOWN_ICON} layout="hug" focusRing="dark">
        {loading ? "Loading…" : "Load More"}
      </PillButtonElement>
    </div>
  );
}
