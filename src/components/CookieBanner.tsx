"use client";

import { PillButtonElement } from "@/components/PillButton";
import { OutlineButton } from "@/components/OutlineButton";
import { CheckIcon } from "@/components/icons";
import { useCookieConsent } from "@/context/CookieConsentContext";

// The first-visit cookie notice: a blue panel docked to the bottom edge
// (rounded-t-4xl like the Footer). It sits above the mobile tab bar by
// reading the --dock-h variable the tab bar publishes. Hidden once a choice
// is saved, and never rendered before saved data has loaded so a returning
// visitor doesn't see it flash.
export default function CookieBanner() {
  const { choice, isHydrated, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!isHydrated || choice !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-[var(--dock-h,0px)] z-[60] px-0 sm:px-5 lg:px-6 xl:px-8">
      <section
        aria-label="Cookie notice"
        className="mx-auto flex max-w-[1400px] flex-col gap-4 rounded-t-4xl bg-[#183fad] px-5 py-5 text-white sm:px-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="min-w-0 md:max-w-[60ch]">
          <h2 className="font-anton text-xl text-[#F1BF0A]">COOKIES</h2>
          <p className="mt-1 text-sm text-white/90">
            We store what the site needs to work, like your cart. With your say-so we&apos;d also use analytics and marketing
            cookies.{" "}
            <button
              type="button"
              onClick={openPreferences}
              className="rounded underline underline-offset-2 hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Choose
            </button>
          </p>
        </div>

        <div className="flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center md:shrink-0">
          <PillButtonElement
            onClick={acceptAll}
            icon={<CheckIcon className="size-6" />}
            layout="hug"
            focusRing="light"
            className="justify-center min-[480px]:justify-start"
          >
            Accept all
          </PillButtonElement>
          <OutlineButton onClick={rejectNonEssential} onDark>
            Reject non-essential
          </OutlineButton>
        </div>
      </section>
    </div>
  );
}
