/** Stable identity; editing a plan does not change its ID. */
export type MonthlyPlanId = string;

/** Calendar month, using 1 for January and 12 for December. */
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * A plan for one Gregorian calendar month. Year must be a positive integer.
 * Habits reference this plan through planId; habit IDs are not duplicated here.
 * Only one active plan may exist for a given year/month.
 */
export interface MonthlyPlan {
  id: MonthlyPlanId;
  year: number;
  month: MonthNumber;
}
