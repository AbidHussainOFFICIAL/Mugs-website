import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  items,
  variant = "dark",
}: {
  items: Crumb[];
  variant?: "dark" | "light";
}) {
  const inactiveClass =
    variant === "dark"
      ? "text-white/50 hover:text-white transition-colors"
      : "text-[#090909]/50 hover:text-[#090909] transition-colors";
  const activeClass = variant === "dark" ? "text-white" : "text-[#090909]";
  const separatorClass = variant === "dark" ? "text-white/50" : "text-[#090909]/50";

  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5 min-w-0">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className={inactiveClass}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={`${isLast ? activeClass : inactiveClass} ${isLast ? "truncate max-w-[160px] sm:max-w-none" : ""}`}>
                  {crumb.label}
                </span>
              )}
              {!isLast && <span className={separatorClass}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
