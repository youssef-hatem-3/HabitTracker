import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function TodayScreen() {
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="flex-grow justify-center px-4">
          <View className="w-full max-w-[440px] self-center">
            <Text className="mb-2 font-body-semibold text-xs uppercase tracking-[1.5px] text-primary">
              HABITFLOW
            </Text>
            <Text className="font-heading text-[28px] leading-[34px] tracking-[-0.25px] text-text">
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
