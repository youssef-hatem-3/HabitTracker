import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import type { RootStackParamList } from './types';

type MonthlyPlanProps = NativeStackScreenProps<RootStackParamList, 'MonthlyPlan'>;
type HabitDetailsProps = NativeStackScreenProps<RootStackParamList, 'HabitDetails'>;
type EditHabitProps = NativeStackScreenProps<RootStackParamList, 'EditHabit'>;

export function MonthlyPlanScreen({ navigation, route }: MonthlyPlanProps) {
  return (
    <View className="flex-1 bg-background p-6">
      <Text className="font-heading text-2xl text-primary">Monthly Plan</Text>
      <Text className="mt-3 font-body text-base text-text">
        Month: {route.params.month}
      </Text>
      <Pressable
        accessibilityRole="button"
        className="mt-6 rounded-xl bg-primary p-4"
        onPress={() => navigation.goBack()}>
        <Text className="text-center font-body-semibold text-white">Go Back</Text>
      </Pressable>
    </View>
  );
}

export function HabitDetailsScreen({ navigation, route }: HabitDetailsProps) {
  const { habitId } = route.params;

  return (
    <View className="flex-1 bg-background p-6">
      <Text className="font-heading text-2xl text-primary">Habit Details</Text>
      <Text className="mt-3 font-body text-base text-text">
        Habit ID: {habitId}
      </Text>
      <Pressable
        accessibilityRole="button"
        className="mt-6 rounded-xl bg-primary p-4"
        onPress={() => navigation.navigate('EditHabit', { habitId })}>
        <Text className="text-center font-body-semibold text-white">
          Edit Habit
        </Text>
      </Pressable>
    </View>
  );
}

export function EditHabitScreen({ route }: EditHabitProps) {
  return (
    <View className="flex-1 bg-background p-6">
      <Text className="font-heading text-2xl text-primary">Edit Habit</Text>
      <Text className="mt-3 font-body text-base text-text">
        Editing habit: {route.params.habitId}
      </Text>
    </View>
  );
}
