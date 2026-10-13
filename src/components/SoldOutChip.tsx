// The "Sold out" tag laid over a product photo (product cards and the product
// page gallery). Ink on the photo reads against any mug colour.
export default function SoldOutChip({ className = "" }: { className?: string }) {
  return (
    <span className={`rounded-full bg-[#090909] px-3 py-1 text-xs font-semibold text-white ${className}`}>Sold out</span>
  );
}
