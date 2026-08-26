import type { ReactNode } from "react";

export default function TrustChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 bg-[#abb9de] rounded-2xl px-2 py-3">
      <span className="flex items-center justify-center size-8 rounded-full bg-white/40 text-[#183fad]">{icon}</span>
      <span className="text-xs sm:text-sm font-medium text-[#090909] leading-tight">{label}</span>
    </div>
  );
}
