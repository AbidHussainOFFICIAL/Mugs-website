"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePersistentState } from "@/lib/usePersistentState";

// The visitor's cookie choice. `null` means they haven't chosen yet, which
// is what makes the notice appear. "Necessary" storage (cart, wishlist,
// reviews, this choice itself) is always on and so isn't part of the choice.
export interface CookieChoice {
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "mugsys-cookie-choice";
const INITIAL: CookieChoice | null = null;

function isCookieChoice(value: unknown): value is CookieChoice | null {
  if (value === null) return true;
  if (typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.analytics === "boolean" && typeof candidate.marketing === "boolean";
}

interface CookieConsentContextValue {
  choice: CookieChoice | null;
  /** False until saved data has loaded, so the notice never flashes for a returning visitor. */
  isHydrated: boolean;
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  save: (choice: CookieChoice) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice, isHydrated] = usePersistentState<CookieChoice | null>(STORAGE_KEY, INITIAL, isCookieChoice);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  const save = useCallback(
    (next: CookieChoice) => {
      setChoice(next);
      setIsPreferencesOpen(false);
    },
    [setChoice]
  );
  const acceptAll = useCallback(() => save({ analytics: true, marketing: true }), [save]);
  const rejectNonEssential = useCallback(() => save({ analytics: false, marketing: false }), [save]);

  const value = useMemo(
    () => ({ choice, isHydrated, isPreferencesOpen, openPreferences, closePreferences, save, acceptAll, rejectNonEssential }),
    [choice, isHydrated, isPreferencesOpen, openPreferences, closePreferences, save, acceptAll, rejectNonEssential]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
