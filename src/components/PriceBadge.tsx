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
  // The "default" size keeps the exact cutout-corner markup from
  // ProductCard's original inline price badge — that treatment is designed
  // to blend into an adjacent element (the cart/wishlist button cluster)
  // sitting right next to it in the card. Standing alone on the PDP with
  // nothing adjacent to complete that illusion, the cutout just looked like
  // a piece of the background was missing — so "large" uses a plain,
  // fully-rounded box instead.
  if (size === "large") {
    return (
      <div className={`flex gap-2 items-center bg-[#e9ecf6] rounded-2xl px-4 py-2.5 ${className}`}>
        <span className="line-through text-[#b7bac5] text-lg sm:text-xl">${originalPrice}</span>
        <span className="font-semibold text-xl sm:text-2xl">${price}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-2 items-center bg-[#e9ecf6] rounded-tr-2xl relative after:content-[''] after:absolute after:top-0 after:right-0 after:h-1/2 after:w-1/2 after:bg-white after:-z-5 pl-3 ${className}`}
    >
      <span className="line-through text-[#b7bac5]">${originalPrice}</span>
      <span className="font-semibold">${price}</span>
    </div>
  );
}
