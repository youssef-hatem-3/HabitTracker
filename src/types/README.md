# Monthly plan and habit models

Import these types through `@/types`. They describe data only; ID creation,
runtime validation, date utilities, editing, and persistence are separate work.
TypeScript constrains month numbers and daily recurrence, but does not validate
date strings, relationships, version ranges, or year values at runtime.

## Ownership and identity

- `MonthlyPlan` identifies one Gregorian year and month. Months are 1–12; years
  must be positive integers. Allow only one active plan per year/month.
- `Habit.planId` references its owning plan. The habit owns its embedded
  `Schedule` and `HabitDefinitionVersion` records. Plans do not repeat habit IDs.
- Assign stable IDs when records are created, independently of names, array
  positions, and dates. Preserve plan, habit, and schedule IDs during edits.
  A new definition version receives a new ID; retain earlier version IDs.
- Copying into another month creates new plan, habit, schedule, and version
  records with new IDs. Completion history is never copied.

## Calendar dates and history

`HabitDate` represents a valid local calendar day as `YYYY-MM-DD`, without a
time or UTC conversion. Existing `createdAt` and optional `archivedAt` fields
continue to use calendar dates; they are not timestamp strings.

A daily schedule includes both `startDate` and `endDate`. The dates must be
ordered and belong to the owning plan's month. A full-month habit spans the
first through last day, including February 29 in a leap year. Eligibility for
historical dates comes from the schedule; `archivedAt` is lifecycle metadata.

A habit has at least one definition version. Each version includes
`effectiveFrom` and, when supplied, `effectiveTo`. These bounds are inclusive;
an omitted end runs through the schedule's end. Versions have nonempty names,
stay within the schedule, and cover its days without gaps or overlaps.

For an edit effective November 15, the earlier version ends November 14 and
the new version starts November 15. The habit ID stays the same, preserving
the meaning of completion records keyed by habit ID and local date.

```ts
import type { Habit, MonthlyPlan } from '@/types';

const plan: MonthlyPlan = {
  id: 'plan-2026-nov',
  year: 2026,
  month: 11,
};

const habit: Habit = {
  id: 'habit-reading',
  planId: plan.id,
  createdAt: '2026-11-01',
  schedule: {
    id: 'schedule-reading',
    recurrence: 'daily',
    startDate: '2026-11-01',
    endDate: '2026-11-30',
  },
  versions: [
    {
      id: 'definition-reading-original',
      name: 'Read 10 pages',
      effectiveFrom: '2026-11-01',
      effectiveTo: '2026-11-14',
    },
    {
      id: 'definition-reading-renamed',
      name: 'Read 20 pages',
      effectiveFrom: '2026-11-15',
    },
  ],
};
```

For November 14, a future date resolver selects `Read 10 pages`; for November
15, it selects `Read 20 pages`. `HabitCard` receives the resolved `{ id, name }`
for the displayed day, with completion supplied independently.

## Local calendar-date utilities

Import `formatLocalDate`, `parseHabitDate`, and `isValidHabitDate` through
`@/utils`. Keys use exactly `YYYY-MM-DD`, with Gregorian years `0001`–`9999`.
The parser validates month lengths and leap years without creating a `Date`.
Whitespace, timestamp strings, missing padding, and impossible dates are rejected.

```ts
import { formatLocalDate, isValidHabitDate, parseHabitDate } from '@/utils';

// Uses the device's local year/month/day, even near midnight.
const key = formatLocalDate(new Date(2026, 10, 24, 0, 30)); // '2026-11-24'
if (key !== null) {
  // Safe to use as a calendar-day key.
}

const parts = parseHabitDate('2024-02-29'); // { year: 2024, month: 2, day: 29 }
if (parts !== null) {
  // parts.month uses the 1–12 MonthNumber type.
}

parseHabitDate('2026-02-30'); // null
isValidHabitDate('2026-02-30'); // false
formatLocalDate(new Date(Number.NaN)); // null
```

Formatting returns `null` for an invalid `Date` or a local year outside the
supported range. Parsing returns `null` for invalid input; validation returns
`false`. Callers must handle these results before saving or displaying dates.
These helpers do not mutate inputs or convert to UTC. Keys contain no timezone;
formatting uses the device's current local timezone. Do not create day keys with
`toISOString()` or interpret a key with `new Date(key)`.

`HabitCompletion` and the existing `HabitRepository` methods remain available.
The DailyCompletion model and repository extensions belong to HAB-50. These
models and utilities add no storage implementation or calendar navigation helpers.
