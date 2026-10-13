"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

// The "Cookie settings" entry in the Footer's legal row. Looks like the
// links around it; opens the preferences dialog.
export default function CookieSettingsButton() {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="rounded transition-colors hover:text-[#F1BF0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1BF0A]"
    >
      Cookie settings
    </button>
  );
}
