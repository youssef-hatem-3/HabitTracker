import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { BottomTabParamList, RootStackParamList } from '@/navigation/types';
import { Button } from '@/components/ui';

type TodayScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Today'>,
  NativeStackScreenProps<RootStackParamList, 'MainTabs'>
>;

export function TodayScreen({ navigation }: TodayScreenProps) {
  return (
    <View className="flex-1 bg-background">
      {/* The tab bar owns the bottom safe-area inset. */}
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          contentContainerClassName="flex-grow justify-center px-4 py-6">
          <View className="w-full max-w-[440px] self-center">
            <Text className="mb-2 font-body-semibold text-xs uppercase tracking-[1.5px] text-primary">
              HABITFLOW
            </Text>
            <Text className="font-heading text-[28px] font-bold leading-[34px] tracking-[-0.25px] text-text">
              A little progress every day.
            </Text>
            <Text className="mt-3 font-body text-base leading-6 text-text-secondary">
              Build a rhythm that feels good and keep your daily intentions in
              view.
            </Text>
            <View className="mt-8 rounded-2xl border border-outline bg-surface-card p-6">
              <View className="self-start rounded-full bg-primary-container px-3 py-2">
                <Text className="font-body-semibold text-[10px] tracking-[0.6px] text-on-primary-container">
                  TODAY’S FOCUS
                </Text>
              </View>
              <Text className="mt-4 font-heading-semibold text-lg leading-6 text-text">
                Your habits, your pace
              </Text>
              <Text className="mt-2 font-body text-sm leading-5 text-text-secondary">
                Small steps add up. Come back each day to see how far you’ve
                gone.
              </Text>
            </View>
            <Button
              label="Open Monthly Plan"
              fullWidth
              size="lg"
              className="mt-6"
              onPress={() =>
                navigation.navigate('MonthlyPlan', { month: '2026-11' })
              }
            />
            <Button
              label="Open Habit Details"
              variant="secondary"
              fullWidth
              size="lg"
              className="mt-3"
              onPress={() =>
                navigation.navigate('HabitDetails', { habitId: 'habit-123' })
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
