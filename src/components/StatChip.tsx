// The landing page's "98%" panel, reused for facts, dates and support details.
export default function StatChip({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`bg-[#abb9de] rounded-2xl p-3 sm:p-4 text-[#090909] ${className}`}>
      <p className="text-2xl sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs sm:text-sm">{label}</p>
    </div>
  );
}
