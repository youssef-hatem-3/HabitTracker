export type RootStackParamList = {
  MainTabs: undefined;
  MonthlyPlan: { month: string };
  HabitDetails: { habitId: string };
  EditHabit: { habitId: string };
};

export type BottomTabParamList = {
  Today: undefined;
  Calendar: undefined;
  Statistics: undefined;
  Settings: undefined;
};
