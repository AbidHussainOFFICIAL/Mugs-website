"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { reviews as seedReviews, type Review } from "@/data/reviews";

interface NewReviewInput {
  productSlug: string;
  author: string;
  rating: number;
  text: string;
}

interface RatingSummary {
  average: number;
  count: number;
  breakdown: Record<number, number>;
}

interface ReviewsContextValue {
  getReviewsForProduct: (slug: string) => Review[];
  getRatingSummary: (slug: string) => RatingSummary;
  addReview: (input: NewReviewInput) => void;
}

const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined);
const STORAGE_KEY = "mugsys-user-reviews";

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setUserReviews(JSON.parse(stored));
    } catch {
      // Malformed storage — ignore and start fresh.
    } finally {
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
  }, [userReviews]);

  const allReviews = useMemo(() => [...userReviews, ...seedReviews], [userReviews]);

  const getReviewsForProduct = useCallback(
    (slug: string) =>
      allReviews.filter((r) => r.productSlug === slug).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [allReviews]
  );

  const getRatingSummary = useCallback(
    (slug: string): RatingSummary => {
      const productReviews = getReviewsForProduct(slug);
      const count = productReviews.length;
      const breakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0;
      productReviews.forEach((r) => {
        total += r.rating;
        breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1;
      });
      return { average: count > 0 ? total / count : 0, count, breakdown };
    },
    [getReviewsForProduct]
  );

  const addReview = useCallback((input: NewReviewInput) => {
    const newReview: Review = {
      id: `user-${Date.now()}`,
      productSlug: input.productSlug,
      author: input.author || "Anonymous",
      rating: input.rating,
      date: new Date().toISOString().slice(0, 10),
      text: input.text,
    };
    setUserReviews((prev) => [newReview, ...prev]);
  }, []);

  const value = useMemo(
    () => ({ getReviewsForProduct, getRatingSummary, addReview }),
    [getReviewsForProduct, getRatingSummary, addReview]
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
