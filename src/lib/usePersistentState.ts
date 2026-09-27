"use client";

import { useCallback, useSyncExternalStore } from "react";

// A small localStorage-backed store for state that has to survive a refresh
// (cart, wishlist, user reviews). It is built on useSyncExternalStore rather
// than a load effect plus a save effect: the server render and hydration both
// see the initial value, then React switches to the stored value — so there
// is no hydration mismatch, and no window where an empty in-memory value can
// be written back over the saved data.

type Listener = () => void;
type Validator<T> = (value: unknown) => value is T;

const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<Listener>>();

function read<T>(key: string, initial: T, isValid: Validator<T>): T {
  if (cache.has(key)) return cache.get(key) as T;

  let value = initial;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw);
      if (isValid(parsed)) value = parsed;
    }
  } catch {
    // Storage unavailable or malformed — start from the initial value.
  }

  cache.set(key, value);
  return value;
}

function write<T>(key: string, value: T) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked — the value still lives in memory for this session.
  }
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string, listener: Listener) {
  const keyListeners = listeners.get(key) ?? new Set<Listener>();
  listeners.set(key, keyListeners);
  keyListeners.add(listener);

  // Another tab changed this key: drop the cached copy so the next read
  // picks up the fresh value.
  function handleStorage(event: StorageEvent) {
    if (event.key !== key && event.key !== null) return;
    cache.delete(key);
    listener();
  }
  window.addEventListener("storage", handleStorage);

  return () => {
    keyListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function subscribeToNothing() {
  return () => {};
}

/**
 * Works like useState, but the value is saved to localStorage and shared by
 * every component that uses the same key (and between browser tabs).
 *
 * `initial` and `isValid` must be module-level constants — not created inline
 * — so the returned setter keeps a stable identity. `isValid` guards against
 * stale or hand-edited data in storage: anything that fails it is ignored.
 *
 * The third item is false during server rendering and hydration and true
 * afterwards, for screens that must not flash an "empty" state before the
 * saved value has loaded.
 */
export function usePersistentState<T>(key: string, initial: T, isValid: Validator<T>) {
  const subscribeToKey = useCallback((listener: Listener) => subscribe(key, listener), [key]);
  const getSnapshot = useCallback(() => read(key, initial, isValid), [key, initial, isValid]);
  const getServerSnapshot = useCallback(() => initial, [initial]);

  const value = useSyncExternalStore(subscribeToKey, getSnapshot, getServerSnapshot);
  const isHydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );

  const setValue = useCallback(
    (update: T | ((previous: T) => T)) => {
      const previous = read(key, initial, isValid);
      write(key, typeof update === "function" ? (update as (previous: T) => T)(previous) : update);
    },
    [key, initial, isValid]
  );

  return [value, setValue, isHydrated] as const;
}