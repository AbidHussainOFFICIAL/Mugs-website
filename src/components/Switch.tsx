"use client";

// An on/off switch in the same yellow-on, soft-grey-off logic as the
// "In Stock Only" toggle in the filters, at the size used in settings rows.
export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad] ${
        checked ? "bg-[#F1BF0A]" : "bg-[#e9ecf6]"
      }`}
    >
      <span
        className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
