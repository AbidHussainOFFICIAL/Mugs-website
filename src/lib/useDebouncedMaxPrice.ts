"use client";

import { useEffect, useState } from "react";

/**
 * The price slider's displayed position updates instantly on every drag tick
 * (the returned local value) for a responsive feel, but the value actually
 * passed to `setMaxPrice` — which cascades into re-filtering and
 * re-animating the whole product grid — is debounced. Without this, dragging
 * the slider fires a fresh grid re-filter/re-animation on every pixel of
 * movement, and those overlapping, half-finished animations looked like a
 * "flash" during rearrangement.
 */
export function useDebouncedMaxPrice(maxPrice: number, setMaxPrice: (value: number) => void) {
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  // Tracks the maxPrice this hook last saw, purely to detect an EXTERNAL
  // change to it (e.g. "Clear all" resetting the filter) — not to be read
  // for any other purpose. React's documented pattern for "adjust state when
  // a prop changes": setting state directly in the render body, guarded by a
  // comparison, rather than in an effect. Calling setState during an effect
  // body runs one render behind (the slider would flash its old position for
  // a frame before snapping); this runs synchronously as part of the same
  // render React is already doing, so there's no such flash, and it
  // satisfies the react-hooks/set-state-in-effect rule, which specifically
  // targets the effect-based version of this.
  const [prevMaxPrice, setPrevMaxPrice] = useState(maxPrice);
  if (maxPrice !== prevMaxPrice) {
    setPrevMaxPrice(maxPrice);
    setLocalMaxPrice(maxPrice);
  }

  useEffect(() => {
    if (localMaxPrice === maxPrice) return;
    const timeout = setTimeout(() => setMaxPrice(localMaxPrice), 200);
    return () => clearTimeout(timeout);
  }, [localMaxPrice, maxPrice, setMaxPrice]);

  return [localMaxPrice, setLocalMaxPrice] as const;
}
