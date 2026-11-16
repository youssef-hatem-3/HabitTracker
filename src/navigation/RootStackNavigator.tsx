import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabNavigator } from './BottomTabNavigator';
import {
  MonthlyPlanScreen,
  HabitDetailsScreen,
  EditHabitScreen,
} from './DetailPlaceholderScreens';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MonthlyPlan"
        component={MonthlyPlanScreen}
        options={{ title: 'Monthly Plan' }}
      />
      <Stack.Screen
        name="HabitDetails"
        component={HabitDetailsScreen}
        options={{ title: 'Habit Details' }}
      />
      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={{ title: 'Edit Habit' }}
      />
    </Stack.Navigator>
  );
}
