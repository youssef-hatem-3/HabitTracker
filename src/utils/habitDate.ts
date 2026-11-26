import type { HabitDate, MonthNumber } from '@/types';

export interface LocalDateParts {
  year: number;
  month: MonthNumber;
  day: number;
}

/** Read the device's local calendar day without converting to UTC. */
export function formatLocalDate(date: Date): HabitDate | null {
  if (!Number.isFinite(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  if (year < 1 || year > 9999) { //2026
    return null;
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${String(year).padStart(4, '0')}-${month}-${day}`;
}

/** Parse a strict Gregorian calendar key; never interpret it as a timestamp. */
export function parseHabitDate(value: unknown): LocalDateParts | null {
  if (
    typeof value !== 'string' ||
    value.length !== 10 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return null;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  if (year < 1 || month < 1 || month > 12 || day < 1) {
    return null;
  }

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  let daysInMonth = 31;
  if (month === 2) {
    daysInMonth = leapYear ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  }
  if (day > daysInMonth) {
    return null;
  }

  return { year, month: month as MonthNumber, day };
}

/** Validate untrusted input before using it as a local calendar-date key. */
export function isValidHabitDate(value: unknown): value is HabitDate {
  return parseHabitDate(value) !== null;
}
