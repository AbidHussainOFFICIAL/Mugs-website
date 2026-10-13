import type { ReactNode } from "react";

// The standard section wrapper for the content pages: the same container and
// vertical rhythm the landing page uses (mt-12 sm:mt-16 lg:mt-20 between
// sections), with an optional Anton heading. Pass `first` for the section that
// directly follows the page banner, which uses the banner's own tighter gap.
export default function ContentSection({
  title,
  id,
  first = false,
  children,
  className = "",
}: {
  title?: string;
  id?: string;
  first?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const spacing = first ? "mt-8 sm:mt-10" : "mt-12 sm:mt-16 lg:mt-20";
  return (
    <section id={id} aria-labelledby={id && title ? `${id}-heading` : undefined} className={`${spacing} ${className}`}>
      {title && (
        <h2 id={id ? `${id}-heading` : undefined} className="font-anton text-2xl sm:text-3xl mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
