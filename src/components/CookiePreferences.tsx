"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Switch from "@/components/Switch";
import { OutlineButton } from "@/components/OutlineButton";
import { PillButtonElement } from "@/components/PillButton";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { useCookieConsent, type CookieChoice } from "@/context/CookieConsentContext";
import { useOverlay } from "@/lib/useOverlay";
import { DURATION, EASE } from "@/lib/motion";

const KINDS = [
  { key: "analytics", title: "Analytics", text: "Helps us see which pages are used so we can improve them." },
  { key: "marketing", title: "Marketing", text: "Would be used to measure and personalise advertising." },
] as const;

const DEFAULT_DRAFT: CookieChoice = { analytics: false, marketing: false };

// The dialog's body is its own component so it mounts fresh every time the
// dialog opens, starting from the saved choice — no effect needed to reset
// the draft, and no stale toggles from a previous open.
function PreferencesDialog({ initial, onClose }: { initial: CookieChoice; onClose: () => void }) {
  const { save, acceptAll, rejectNonEssential } = useCookieConsent();
  const [draft, setDraft] = useState<CookieChoice>(initial);
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const dialogRef = useOverlay<HTMLDivElement>(true, onClose);

  const panelProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 24 } };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.base }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-[#183fad]/90"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-[81] flex items-end justify-center sm:items-center sm:p-5">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          {...panelProps}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="pointer-events-auto flex max-h-[90dvh] w-full max-w-[520px] flex-col overflow-y-auto rounded-t-4xl bg-white p-5 sm:rounded-4xl sm:p-8"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="font-anton text-2xl sm:text-3xl">
              COOKIE SETTINGS
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cookie settings"
              className="flex shrink-0 items-center justify-center rounded-full bg-[#F1BF0A] p-1.5 text-[#090909] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <ul className="mt-4 flex flex-col gap-2">
            <li className="flex items-center justify-between gap-4 rounded-2xl bg-[#e9ecf6] p-4">
              <div className="min-w-0">
                <p className="font-semibold">Necessary</p>
                <p className="text-sm text-[#090909]/70">Keeps your cart, wishlist, reviews and this choice working. Always on.</p>
              </div>
              <Switch checked onChange={() => {}} label="Necessary cookies (always on)" disabled />
            </li>
            {KINDS.map((kind) => (
              <li key={kind.key} className="flex items-center justify-between gap-4 rounded-2xl bg-[#e9ecf6] p-4">
                <div className="min-w-0">
                  <p className="font-semibold">{kind.title}</p>
                  <p className="text-sm text-[#090909]/70">{kind.text}</p>
                </div>
                <Switch
                  checked={draft[kind.key]}
                  onChange={(checked) => setDraft((current) => ({ ...current, [kind.key]: checked }))}
                  label={`${kind.title} cookies`}
                />
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-[#090909]/60">
            This demo store doesn&apos;t run analytics or marketing tools yet. Your choice is still saved on this device.
          </p>

          <div className="mt-5 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
            <PillButtonElement
              onClick={() => save(draft)}
              icon={<CheckIcon className="size-6" />}
              layout="fluid"
              focusRing="dark"
            >
              Save choices
            </PillButtonElement>
            <OutlineButton onClick={acceptAll} fluid>
              Accept all
            </OutlineButton>
            <OutlineButton onClick={rejectNonEssential} fluid>
              Reject non-essential
            </OutlineButton>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function CookiePreferences() {
  const { choice, isPreferencesOpen, closePreferences } = useCookieConsent();

  return (
    <AnimatePresence>
      {isPreferencesOpen && <PreferencesDialog key="cookie-preferences" initial={choice ?? DEFAULT_DRAFT} onClose={closePreferences} />}
    </AnimatePresence>
  );
}
