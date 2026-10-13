import LogoMark from "@/components/LogoMark";

// The gift card as the buyer is building it: the amount and the recipient
// update live as the form changes. One flat decorative quarter-circle in the
// corner, no gradients.
export default function GiftCardPreview({
  amount,
  recipientName,
}: {
  /** The chosen amount, or null while it's still blank or invalid. */
  amount: number | null;
  recipientName: string;
}) {
  const name = recipientName.trim();
  return (
    <div
      role="group"
      aria-label="Gift card preview"
      className="relative min-h-48 w-full overflow-hidden rounded-4xl bg-[#183fad] p-5 text-white sm:aspect-[1.6/1] sm:min-h-0 sm:p-7"
    >
      <span className="absolute -bottom-16 -right-16 size-48 rounded-full bg-[#4565bc] sm:-bottom-20 sm:-right-20 sm:size-64" aria-hidden="true" />

      <div className="relative flex h-full min-h-36 flex-col justify-between gap-4 sm:min-h-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            <LogoMark className="size-8" />
            <span className="font-anton text-lg">MUGSY&apos;S MUGS</span>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#abb9de] px-3 py-1 text-xs text-[#090909]">Digital · Instant</span>
        </div>

        <div>
          {name && <p className="mb-1 truncate text-sm text-white/80">For {name}</p>}
          <p className="font-anton text-5xl text-[#F1BF0A] sm:text-6xl">{amount !== null ? `$${amount}` : "$—"}</p>
        </div>
      </div>
    </div>
  );
}
