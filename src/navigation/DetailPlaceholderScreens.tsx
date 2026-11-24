import type { PropsWithChildren } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from './types';
import { Button } from '@/components/ui';

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
      <Text className="font-heading text-2xl font-bold text-primary">Monthly Plan</Text>
      <Text className="mt-3 font-body text-base text-text">
        Month: {route.params.month}
      </Text>
      <Button
        label="Go Back"
        fullWidth
        size="lg"
        className="mt-6"
        onPress={() => navigation.goBack()}
      />
    </DetailScreenLayout>
  );
}

export function HabitDetailsScreen({ navigation, route }: HabitDetailsProps) {
  const { habitId } = route.params;

  return (
    <DetailScreenLayout>
      <Text className="font-heading text-2xl font-bold text-primary">Habit Details</Text>
      <Text className="mt-3 font-body text-base text-text">
        Habit ID: {habitId}
      </Text>
      <Button
        label="Edit Habit"
        fullWidth
        size="lg"
        className="mt-6"
        onPress={() => navigation.navigate('EditHabit', { habitId })}
      />
    </DetailScreenLayout>
  );
}

export function EditHabitScreen({ route }: EditHabitProps) {
  return (
    <DetailScreenLayout>
      <Text className="font-heading text-2xl font-bold text-primary">Edit Habit</Text>
      <Text className="mt-3 font-body text-base text-text">
        Editing habit: {route.params.habitId}
      </Text>
    </DetailScreenLayout>
  );
}
