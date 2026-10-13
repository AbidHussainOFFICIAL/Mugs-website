// Date and time helpers for the gift card pickers. Dates travel as local
// "YYYY-MM-DD" keys and times as "HH:MM" strings, never as UTC instants, so a
// day means the day on the buyer's own calendar.

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

/** How far ahead a gift card can be scheduled. */
export const MAX_SCHEDULE_DAYS = 365;

export function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function dateKeyFromParts(year: number, month: number, day: number) {
  return toDateKey(new Date(year, month, day));
}

/** Parses a "YYYY-MM-DD" key into a local date, or null if it isn't one. */
export function parseDateKey(key: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return toDateKey(date) === key ? date : null;
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** The cells of a month, Sunday first: leading nulls for the blank days, then 1..N. */
export function monthCells(year: number, month: number): (number | null)[] {
  const leading = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = Array.from({ length: leading }, () => null);
  for (let day = 1; day <= daysInMonth(year, month); day += 1) cells.push(day);
  return cells;
}

export function formatDateLong(key: string) {
  const date = parseDateKey(key);
  if (!date) return key;
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Every half hour of the day, as "HH:MM". */
export const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, "0");
  return `${hours}:${index % 2 === 0 ? "00" : "30"}`;
});

export const DEFAULT_SEND_TIME = "09:00";
