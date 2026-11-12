/** A stable identifier shared by habit, calendar, and analytics features. */
export type HabitId = string;

/** Calendar date in `YYYY-MM-DD` form, independent of a device timezone. */
export type HabitDate = string;

export interface Habit {
  id: HabitId;
  name: string;
  createdAt: HabitDate;
  archivedAt?: HabitDate;
}

/** A completion is keyed by habit and day; duplicate keys represent the same event. */
export interface HabitCompletion {
  habitId: HabitId;
  date: HabitDate;
  completedAt: string;
}
