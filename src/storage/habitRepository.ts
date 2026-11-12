import type { Habit, HabitCompletion, HabitDate, HabitId } from '@/types';

/**
 * The only persistence boundary for habit data.
 *
 * Features may cache data for rendering, but must read and write through this
 * contract so storage remains the canonical source of persisted habit data.
 */
export interface HabitRepository {
  getHabits(): Promise<readonly Habit[]>;
  saveHabit(habit: Habit): Promise<void>;
  getCompletions(date: HabitDate): Promise<readonly HabitCompletion[]>;
  saveCompletion(completion: HabitCompletion): Promise<void>;
  removeCompletion(habitId: HabitId, date: HabitDate): Promise<void>;
}
