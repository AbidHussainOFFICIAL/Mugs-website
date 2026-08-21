export default function PriceBadge({
  price,
  originalPrice,
  size = "default",
  className = "",
}: {
  price: number;
  originalPrice: number;
  size?: "default" | "large";
  className?: string;
}) {
  return (
    <div
      className={`flex gap-2 items-center bg-[#e9ecf6] rounded-tr-2xl relative after:content-[''] after:absolute after:top-0 after:right-0 after:h-1/2 after:w-1/2 after:bg-white after:-z-5 pl-3 ${
        size === "large" ? "py-2.5" : ""
      } ${className}`}
    >
      <span className={`line-through text-[#b7bac5] ${size === "large" ? "text-lg sm:text-xl" : ""}`}>
        ${originalPrice}
      </span>
      <span className={`font-semibold ${size === "large" ? "text-xl sm:text-2xl" : ""}`}>${price}</span>
    </div>
  );
}
