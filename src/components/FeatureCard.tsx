import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

// The ProductCard's outer tile (soft blue-grey, rounded-3xl) holding a yellow
// icon circle, an Anton title and a short blurb. On mobile the icon sits left
// of the text; from sm up the card stacks. With `href` the whole card is a
// link and gains the small yellow arrow circle.
export default function FeatureCard({
  icon,
  title,
  children,
  href,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex items-center justify-center size-11 shrink-0 rounded-full bg-[#F1BF0A] text-[#090909]">{icon}</span>
      <span className="flex flex-1 flex-col gap-1 min-w-0">
        <span className="font-anton text-xl">{title}</span>
        <span className="text-sm text-[#090909]/70">{children}</span>
      </span>
      {href && (
        <span className="flex items-center justify-center size-8 shrink-0 rounded-full bg-[#F1BF0A] text-[#090909] self-center sm:self-start">
          <ArrowRightIcon className="size-4" />
        </span>
      )}
    </>
  );

  const baseClass = "flex items-start gap-4 sm:flex-col sm:gap-3 bg-[#e9ecf6] rounded-3xl p-4 sm:p-5";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} sm:items-stretch transition-colors hover:bg-[#abb9de]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]`}
      >
        {content}
      </Link>
    );
  }

  return <div className={baseClass}>{content}</div>;
}
