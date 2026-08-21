"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import RatingStars from "@/components/RatingStars";
import LoadMore from "@/components/LoadMore";
import { useReviews } from "@/context/ReviewsContext";
import { DURATION } from "@/lib/motion";

const PAGE_SIZE = 4;
const STAR_PATH =
  "m11.48 3.499 2.398 4.86 5.365.78-3.883 3.786.917 5.35L11.48 15.75l-4.796 2.522.917-5.35L3.72 9.139l5.365-.78 2.396-4.86Z";

export default function ReviewsSection({ productSlug }: { productSlug: string }) {
  const { getReviewsForProduct, getRatingSummary, addReview } = useReviews();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allReviews = getReviewsForProduct(productSlug);
  const summary = getRatingSummary(productSlug);
  const visibleReviews = allReviews.slice(0, visibleCount);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    addReview({ productSlug, author: author.trim(), rating, text: text.trim() });
    setAuthor("");
    setRating(5);
    setText("");
    setFormOpen(false);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="reviews" className="scroll-mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-anton text-2xl sm:text-3xl">REVIEWS</h2>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="inline-flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap self-start sm:self-auto relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]"
        >
          <div className="rounded-full p-1.5 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="relative z-10">Write a Review</span>
        </button>
      </div>

      {summary.count > 0 && (
        <div className="bg-[#e9ecf6] rounded-3xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="flex flex-col items-center justify-center shrink-0">
            <span className="font-anton text-4xl">{summary.average.toFixed(1)}</span>
            <RatingStars rating={summary.average} size="md" />
            <span className="text-xs text-[#5b5f6b] mt-1">
              {summary.count} {summary.count === 1 ? "review" : "reviews"}
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5 justify-center">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = summary.breakdown[star] ?? 0;
              const pct = summary.count > 0 ? (count / summary.count) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs w-3 text-right">{star}</span>
                  <div className="flex-1 h-2 rounded-full bg-white overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: DURATION.base }}
                      className="h-full bg-[#F1BF0A] rounded-full"
                    />
                  </div>
                  <span className="text-xs text-[#5b5f6b] w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#183fad]/10 rounded-3xl p-5 sm:p-6 mb-6 flex flex-col gap-4">
          <div>
            <span className="text-sm font-medium block mb-1.5">Your rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star === 1 ? "" : "s"}`}
                  className="p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? "#F1BF0A" : "none"}
                    stroke={star <= rating ? "#F1BF0A" : "#e9ecf6"}
                    strokeWidth="1.5"
                    className="size-6"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={STAR_PATH} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5" htmlFor="review-author">
              Name
            </label>
            <input
              id="review-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-xl border border-[#183fad]/20 px-3 py-2 text-sm focus:outline-none focus:border-[#F1BF0A]"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5" htmlFor="review-text">
              Review
            </label>
            <textarea
              id="review-text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="What did you think?"
              className="w-full rounded-xl border border-[#183fad]/20 px-3 py-2 text-sm focus:outline-none focus:border-[#F1BF0A] resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-[#F1BF0A] rounded-full px-6 py-2 text-sm font-semibold">
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-sm text-[#183fad] underline underline-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="bg-[#F1BF0A]/20 border border-[#F1BF0A] rounded-2xl px-4 py-3 mb-6 text-sm font-medium">
          Thanks — your review has been posted.
        </div>
      )}

      {visibleReviews.length > 0 ? (
        <div className="flex flex-col gap-3">
          {visibleReviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-[#e9ecf6] p-4">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="font-semibold text-sm">{review.author}</span>
                <span className="text-xs text-[#090909]/50">
                  {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <RatingStars rating={review.rating} />
              <p className="mt-2 text-sm text-[#090909]/80">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#5b5f6b]">No reviews yet — be the first to share your thoughts.</p>
      )}

      {visibleCount < allReviews.length && <LoadMore onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} />}
    </section>
  );
}
