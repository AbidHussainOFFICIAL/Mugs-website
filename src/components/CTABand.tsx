import type { ReactNode } from "react";

// The closing panel on most content pages: the hero's mid-blue panel colour,
// a yellow Anton headline, one supporting line and one action (normally a
// yellow pill). The action fills the row below 480px and hugs its content
// above that.
export default function CTABand({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#4565bc] text-white rounded-4xl p-6 sm:p-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 min-w-0">
        <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#F1BF0A]">{title}</h2>
        {text && <p className="max-w-xl text-white/90">{text}</p>}
      </div>
      <div className="w-full min-[480px]:w-auto shrink-0">{children}</div>
    </div>
  );
}
