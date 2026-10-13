"use client";

import { useState } from "react";
import PickerShell from "@/components/PickerShell";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import {
  MAX_SCHEDULE_DAYS,
  MONTH_NAMES,
  WEEKDAY_LABELS,
  addDays,
  dateKeyFromParts,
  formatDateLong,
  monthCells,
  parseDateKey,
  toDateKey,
} from "@/lib/dates";

const NAV_BUTTON =
  "flex size-9 items-center justify-center rounded-full bg-[#e9ecf6] text-[#183fad] transition-colors hover:bg-[#F1BF0A] hover:text-[#090909] disabled:opacity-40 disabled:hover:bg-[#e9ecf6] disabled:hover:text-[#183fad] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183fad]";

// A themed month calendar in place of the browser's date input. `min` is the
// first day that can be chosen ("YYYY-MM-DD"); the last is a year after it.
export default function DatePicker({
  id,
  label,
  value,
  onChange,
  onClose,
  min,
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Called when the calendar closes, however it closed (for "touched" tracking). */
  onClose?: () => void;
  min: string;
  error?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ year: 0, month: 0 });

  const minDate = parseDateKey(min);
  const maxKey = minDate ? toDateKey(addDays(minDate, MAX_SCHEDULE_DAYS)) : "";
  const todayKey = min;

  function handleOpenChange(next: boolean) {
    if (next) {
      // Open on the chosen month, or on the first month that can be chosen.
      const anchor = parseDateKey(value) ?? minDate ?? new Date();
      setView({ year: anchor.getFullYear(), month: anchor.getMonth() });
    } else if (open) {
      onClose?.();
    }
    setOpen(next);
  }

  function shiftMonth(delta: number) {
    setView((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  function handlePick(day: number) {
    onChange(dateKeyFromParts(view.year, view.month, day));
    handleOpenChange(false);
  }

  const firstOfView = dateKeyFromParts(view.year, view.month, 1);
  const lastOfView = dateKeyFromParts(view.year, view.month + 1, 0);
  const canGoBack = firstOfView > min;
  const canGoForward = lastOfView < maxKey;

  return (
    <PickerShell
      id={id}
      label={label}
      valueText={value ? formatDateLong(value) : ""}
      placeholder="Choose a date"
      icon={<CalendarIcon className="size-4" />}
      open={open}
      onOpenChange={handleOpenChange}
      panelLabel="Choose a date"
      error={error}
      className={className}
    >
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => shiftMonth(-1)} disabled={!canGoBack} aria-label="Previous month" className={NAV_BUTTON}>
          <ChevronLeftIcon className="size-4" />
        </button>
        <p className="font-anton text-lg" aria-live="polite">
          {MONTH_NAMES[view.month].toUpperCase()} {view.year}
        </p>
        <button type="button" onClick={() => shiftMonth(1)} disabled={!canGoForward} aria-label="Next month" className={NAV_BUTTON}>
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-xs text-[#090909]/60" aria-hidden="true">
        {WEEKDAY_LABELS.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {monthCells(view.year, view.month).map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} />;
          const key = dateKeyFromParts(view.year, view.month, day);
          const disabled = key < min || key > maxKey;
          const selected = key === value;
          const isToday = key === todayKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handlePick(day)}
              disabled={disabled}
              aria-label={formatDateLong(key)}
              aria-pressed={selected}
              className={`mx-auto flex size-10 items-center justify-center rounded-full text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#183fad] ${
                selected
                  ? "bg-[#F1BF0A] font-semibold text-[#090909]"
                  : disabled
                    ? "text-[#090909]/25"
                    : `hover:bg-[#F1BF0A]/30 ${isToday ? "border border-[#183fad] font-semibold" : ""}`
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </PickerShell>
  );
}
