import type { HTMLInputTypeAttribute, ReactNode } from "react";
import StatusChip from "@/components/StatusChip";

// Pill inputs in the same anatomy as the search box and the promo code field:
// white, hairline blue border that turns yellow on focus. Used by the
// Contact and Gift cards forms.
//
// Every field is controlled by its parent (`value` / `onChange`), shows its
// error as a red chip underneath, and ties label, helper text and error to
// the input for screen readers.

interface FieldBaseProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helper?: string;
  /** Marks the label "(optional)". Fields are required unless this is set. */
  optional?: boolean;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

function describedBy(id: string, error?: string, helper?: string, extra?: string) {
  const ids = [error ? `${id}-error` : null, helper ? `${id}-helper` : null, extra ?? null].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function FieldLabel({ id, label, optional }: { id: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={id} className="mb-1.5 ml-4 block text-sm font-semibold">
      {label}
      {optional && <span className="font-normal text-[#090909]/60"> (optional)</span>}
    </label>
  );
}

function FieldMessages({ id, error, helper }: { id: string; error?: string; helper?: string }) {
  return (
    <>
      {helper && (
        <p id={`${id}-helper`} className="mt-1.5 ml-4 text-xs text-[#090909]/60">
          {helper}
        </p>
      )}
      {error && <StatusChip variant="error" id={`${id}-error`} className="mt-1.5 ml-4">{error}</StatusChip>}
    </>
  );
}

function borderClass(error?: string, disabled?: boolean) {
  if (disabled) return "border-[#183fad]/10 bg-[#e9ecf6]";
  return `bg-white ${error ? "border-red-300" : "border-[#183fad]/20 focus-within:border-[#F1BF0A]"}`;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  helper,
  optional,
  placeholder,
  maxLength,
  disabled,
  className = "",
  type = "text",
  autoComplete,
  inputMode,
  leading,
  trailing,
  inputClassName = "",
}: FieldBaseProps & {
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email" | "tel" | "decimal";
  /** Rendered inside the pill, before the input — normally an icon in a circle. */
  leading?: ReactNode;
  /** Rendered inside the pill, after the input — normally a small button. */
  trailing?: ReactNode;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel id={id} label={label} optional={optional} />
      <div className={`flex h-12 items-center gap-2 rounded-full border transition-colors ${leading ? "pl-2" : "pl-5"} ${trailing ? "pr-2" : "pr-5"} ${borderClass(error, disabled)}`}>
        {leading}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, helper)}
          className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#090909]/50 disabled:cursor-not-allowed ${inputClassName}`}
        />
        {trailing}
      </div>
      <FieldMessages id={id} error={error} helper={helper} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  helper,
  optional,
  placeholder,
  maxLength,
  disabled,
  className = "",
  rows = 5,
  showCounter = false,
}: FieldBaseProps & { rows?: number; showCounter?: boolean }) {
  const counterId = `${id}-counter`;
  return (
    <div className={className}>
      <FieldLabel id={id} label={label} optional={optional} />
      <div className={`rounded-3xl border px-5 py-3.5 transition-colors ${borderClass(error, disabled)}`}>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={rows}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, helper, showCounter ? counterId : undefined)}
          className="block min-h-32 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[#090909]/50 disabled:cursor-not-allowed"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <FieldMessages id={id} error={error} helper={helper} />
        </div>
        {showCounter && maxLength !== undefined && (
          <p id={counterId} className="mt-1.5 mr-4 shrink-0 text-xs text-[#090909]/60">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
