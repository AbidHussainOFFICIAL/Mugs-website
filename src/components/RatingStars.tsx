const STAR_PATH =
  "m11.48 3.499 2.398 4.86 5.365.78-3.883 3.786.917 5.35L11.48 15.75l-4.796 2.522.917-5.35L3.72 9.139l5.365-.78 2.396-4.86Z";

export default function RatingStars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "size-5" : "size-4";

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(rating);
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "#F1BF0A" : "none"}
            stroke={filled ? "#F1BF0A" : "#e9ecf6"}
            strokeWidth="1.5"
            className={sizeClass}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={STAR_PATH} />
          </svg>
        );
      })}
    </div>
  );
}
