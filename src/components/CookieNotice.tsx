"use client";

import { OutlineButton } from "@/components/OutlineButton";
import { PillButtonElement } from "@/components/PillButton";
import { CheckIcon } from "@/components/icons";
import { useCookieConsent } from "@/context/CookieConsentContext";

// The first-visit cookie notice, as the top row of the BottomDock. Compact on
// phones (two lines of text and a pair of buttons side by side); on desktop
// it gains its Anton heading and sits on one row.
export default function CookieNotice({ divider }: { divider: boolean }) {
  const { acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  return (
    <section
      aria-label="Cookie notice"
      className={`flex flex-col gap-3 px-4 py-3 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-6 md:py-5 ${
        divider ? "border-b border-white/15 md:border-b-0" : ""
      }`}
    >
      <div className="min-w-0 md:max-w-[60ch]">
        <h2 className="hidden font-anton text-xl text-[#F1BF0A] md:block">COOKIES</h2>
        <p className="text-xs text-white/90 sm:text-sm md:mt-1">
          We store what the site needs to work, like your cart. With your OK we&apos;d also use analytics and marketing cookies.{" "}
          <button
            type="button"
            onClick={openPreferences}
            className="rounded underline underline-offset-2 hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Choose
          </button>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:flex md:shrink-0 md:items-center md:gap-3">
        <PillButtonElement onClick={acceptAll} icon={<CheckIcon className="size-6" />} layout="fluid" focusRing="light">
          Accept all
        </PillButtonElement>
        <OutlineButton onClick={rejectNonEssential} onDark fluid ariaLabel="Reject non-essential cookies">
          <span className="md:hidden">Reject</span>
          <span className="hidden md:inline">Reject non-essential</span>
        </OutlineButton>
      </div>
    </section>
  );
}
