import type { MonthlyPlanId } from './monthlyPlan';

/** A stable identifier shared by habit, calendar, and analytics features. */
export type HabitId = string;

/** A local calendar date in `YYYY-MM-DD` form, with no time or UTC conversion. */
export type HabitDate = string;

export type ScheduleId = string;
export type HabitDefinitionVersionId = string;

/**
 * Owned by one habit. Every date from startDate through endDate is scheduled
 * (both inclusive). Bounds must be valid, ordered dates within its plan's month.
 * A newly created full-month routine uses the month's first and last dates.
 */
export interface Schedule {
  id: ScheduleId;
  recurrence: 'daily';
  startDate: HabitDate;
  endDate: HabitDate;
}

/**
 * A dated definition owned by one habit. Bounds are inclusive; an omitted
 * effectiveTo applies through the schedule's endDate. Versions must have
 * nonempty names and valid, ordered ranges within the schedule, without overlap.
 * Future edits retain earlier definitions and create a new version ID.
 */
export interface HabitDefinitionVersion {
  id: HabitDefinitionVersionId;
  name: string;
  effectiveFrom: HabitDate;
  effectiveTo?: HabitDate;
}

/**
 * One monthly plan owns this habit, its schedule and its definition versions.
 * The habit ID survives edits; copying into another plan creates new IDs.
 * Versions must cover every scheduled date, with no gaps or overlaps.
 * Completion state is stored independently, keyed by habit ID and local date.
 */
export interface Habit {
  id: HabitId;
  planId: MonthlyPlanId;
  createdAt: HabitDate;
  /** Lifecycle metadata; historical eligibility comes from the schedule. */
  archivedAt?: HabitDate;
  schedule: Schedule;
  versions: readonly HabitDefinitionVersion[];
}

/** A completion is keyed by habit and day; duplicate keys represent the same event. */
export interface HabitCompletion {
  habitId: HabitId;
  date: HabitDate;
  completedAt: string;
}
