"use client";

import { useSyncExternalStore } from "react";

// How far below the screen the Footer may still be and count as "near": a
// fixed bottom bar uses this to slide out of the way just BEFORE the Footer
// comes into view, so the Footer is never seen with a bar sitting on it.
const NEAR_MARGIN_PX = 160;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

// Read from the Footer's real position on every check, not once: the Footer
// can mount after the bar does (client navigation, a page's loading state),
// and a scroll position check can't get stuck the way an observer can after a
// discontinuous jump (Back, "back to top").
function getSnapshot() {
  const footer = document.querySelector("footer");
  return footer ? footer.getBoundingClientRect().top < window.innerHeight + NEAR_MARGIN_PX : false;
}

const getServerSnapshot = () => false;

/** True while the page's Footer is on screen or about to be. False on the server and while no Footer exists. */
export function useFooterNear() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
