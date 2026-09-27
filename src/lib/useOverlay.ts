"use client";

import { useEffect, useRef } from "react";

// Shared behavior for every dialog/sheet/lightbox in the app: lock page
// scroll while open, close on Escape, keep Tab cycling inside the overlay
// instead of leaking focus to the page behind it, and return focus to
// whatever triggered the overlay once it closes.
//
// Attach the returned ref to the overlay's outer content element (the
// panel/dialog itself, not the backdrop). If an overlay renders more than
// one variant of its content at once (e.g. a desktop and mobile version,
// switched with CSS breakpoints), wrap both in a single element with
// `style={{ display: "contents" }}` and put the ref there — the hidden
// variant's controls aren't focusable anyway, so trapping across both is safe.
//
// `onClose` is read through a ref rather than the effect's own dependency
// array. Callers pass it as an inline arrow function, so a new reference is
// created on every render of the owning component — including every
// keystroke into a field inside the overlay. If the trap/Escape effect
// depended on `onClose` directly, each of those renders would tear the
// effect down and rebuild it: its cleanup restores focus to whatever was
// focused before the overlay opened, then its setup immediately re-grabs
// focus onto the overlay's first focusable element. The net effect is
// focus visibly jumping out of whatever the person is typing into on every
// keystroke. Reading the latest callback from a ref keeps the effect's own
// lifecycle tied only to `isOpen`, so it doesn't restart on unrelated
// re-renders.

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null
  );
}

export function useOverlay<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<T | null>(null);

  // Always holds the latest onClose, updated on every render, but never
  // itself triggers the effect below to re-run.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;
    const focusable = container ? getFocusable(container) : [];
    (focusable[0] ?? container)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !container) return;

      const focusableNow = getFocusable(container);
      if (focusableNow.length === 0) return;
      const first = focusableNow[0];
      const last = focusableNow[focusableNow.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
    // Deliberately excludes onClose — see the comment above onCloseRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return containerRef;
}