import type { ReactNode } from "react";

// Green / red confirmation and error chips. Outside the promo code, these two
// colours are used only for this: a form field's error, a code that didn't
// work, a "we'll let you know" confirmation. Everything else stays on the
// brand palette.
export default function StatusChip({
  variant,
  id,
  children,
  className = "",
}: {
  variant: "error" | "success";
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const colors = variant === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700";
  return (
    <p
      id={id}
      role={variant === "error" ? "alert" : "status"}
      className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-xs ${colors} ${className}`}
    >
      {children}
    </p>
  );
}
