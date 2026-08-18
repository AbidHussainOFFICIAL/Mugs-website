// Shared motion tokens — keeps every section's animation feel consistent.
// Import these instead of hardcoding durations/easing per component.

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

export const STAGGER = {
  tight: 0.05,
  loose: 0.1,
} as const;

export const VIEWPORT = {
  once: true,
  margin: "-80px",
} as const;

export const fadeRise = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export function staggerContainer(stagger: number = STAGGER.tight) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };
}
