"use client";

import { useCallback, useState } from "react";
import PickerShell from "@/components/PickerShell";
import { ClockIcon } from "@/components/icons";
import { TIME_OPTIONS, formatTime, timeToMinutes } from "@/lib/dates";

// A themed list of half-hour times in place of the browser's time input.
// Times before `minMinutes` (minutes since midnight) are disabled, which is
// how "today" stops the buyer picking a time that has already passed.
export default function TimePicker({
  id,
  label,
  value,
  onChange,
  onClose,
  minMinutes = 0,
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  minMinutes?: number;
  error?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  // Scroll the chosen time to the middle of the list as it mounts. Done in a
  // stable ref callback, scoped to the list itself, so the page never scrolls.
  const attachList = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const selected = node.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (selected) node.scrollTop = selected.offsetTop - node.clientHeight / 2 + selected.clientHeight / 2;
  }, []);

  function handleOpenChange(next: boolean) {
    if (!next && open) onClose?.();
    setOpen(next);
  }

  function handlePick(time: string) {
    onChange(time);
    handleOpenChange(false);
  }

  return (
    <PickerShell
      id={id}
      label={label}
      valueText={value ? formatTime(value) : ""}
      placeholder="Choose a time"
      icon={<ClockIcon className="size-4" />}
      open={open}
      onOpenChange={handleOpenChange}
      panelLabel="Choose a time"
      error={error}
      className={className}
    >
      <p className="mb-3 font-anton text-lg">CHOOSE A TIME</p>
      <div ref={attachList} className="relative grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1">
        {TIME_OPTIONS.map((time) => {
          const disabled = timeToMinutes(time) < minMinutes;
          const selected = time === value;
          return (
            <button
              key={time}
              type="button"
              onClick={() => handlePick(time)}
              disabled={disabled}
              aria-pressed={selected}
              className={`rounded-full border px-2 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#183fad] ${
                selected
                  ? "border-[#F1BF0A] bg-[#F1BF0A] font-semibold text-[#090909]"
                  : disabled
                    ? "border-transparent text-[#090909]/25"
                    : "border-[#183fad]/20 hover:border-[#F1BF0A] hover:bg-[#F1BF0A]/20"
              }`}
            >
              {formatTime(time)}
            </button>
          );
        })}
      </div>
    </PickerShell>
  );
}
