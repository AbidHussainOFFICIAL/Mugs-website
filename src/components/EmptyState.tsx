"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const CTA_CLASSNAME =
  "mt-6 inline-flex items-center gap-2 bg-[#F1BF0A] rounded-full py-1.5 pl-1.5 pr-4 text-[#090909] whitespace-nowrap relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:rounded-full after:bg-white after:h-9 after:w-9 hover:after:w-full after:transition-[width] after:duration-[1600ms] after:ease-[linear(0,0.029_0.8%,0.13_1.8%,0.908_7.2%,1.051_9.1%,1.112_11.2%,1.116_12.2%,1.106_13.4%,1.007_19.5%,0.987_23.1%,1.001_35%,1)] overflow-hidden hover:after:h-full hover:after:left-0";

function CtaContent({ label }: { label: string }) {
  return (
    <>
      <div className="rounded-full p-1.5 relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </div>
      <span className="relative z-10">{label}</span>
    </>
  );
}

export default function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 sm:py-24 px-4">
      <div className="flex items-center justify-center bg-[#F1BF0A] rounded-full size-16 mb-5">{icon}</div>
      <h2 className="font-anton text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 text-[#5b5f6b] max-w-sm">{description}</p>
      {onCtaClick ? (
        <button type="button" onClick={onCtaClick} className={CTA_CLASSNAME}>
          <CtaContent label={ctaLabel} />
        </button>
      ) : ctaHref ? (
        <Link href={ctaHref} className={CTA_CLASSNAME}>
          <CtaContent label={ctaLabel} />
        </Link>
      ) : null}
    </div>
  );
}
