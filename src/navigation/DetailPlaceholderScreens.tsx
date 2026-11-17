import type { PropsWithChildren } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from './types';

type MonthlyPlanProps = NativeStackScreenProps<RootStackParamList, 'MonthlyPlan'>;
type HabitDetailsProps = NativeStackScreenProps<RootStackParamList, 'HabitDetails'>;
type EditHabitProps = NativeStackScreenProps<RootStackParamList, 'EditHabit'>;

function DetailScreenLayout({ children }: PropsWithChildren) {
  return (
    // The native stack header owns the top inset; these screens have no tab bar.
    <SafeAreaView
      className="flex-1 bg-background"
      edges={['left', 'right', 'bottom']}>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        contentContainerClassName="flex-grow p-6">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function MonthlyPlanScreen({ navigation, route }: MonthlyPlanProps) {
  return (
    <DetailScreenLayout>
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
    </DetailScreenLayout>
  );
}

export function HabitDetailsScreen({ navigation, route }: HabitDetailsProps) {
  const { habitId } = route.params;

  return (
    <DetailScreenLayout>
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
    </DetailScreenLayout>
  );
}

export function EditHabitScreen({ route }: EditHabitProps) {
  return (
    <DetailScreenLayout>
      <Text className="font-heading text-2xl text-primary">Edit Habit</Text>
      <Text className="mt-3 font-body text-base text-text">
        Editing habit: {route.params.habitId}
      </Text>
    </DetailScreenLayout>
  );
}
