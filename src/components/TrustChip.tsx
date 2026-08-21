import type { ReactNode } from "react";

export default function TrustChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#abb9de] rounded-2xl p-3">
      <span className="text-[#183fad] shrink-0">{icon}</span>
      <span className="text-xs sm:text-sm font-medium text-[#090909]">{label}</span>
    </div>
  );
}
