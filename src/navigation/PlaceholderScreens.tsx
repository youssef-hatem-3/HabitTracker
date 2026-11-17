import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'left', 'right']}>
      <View className="flex-1 items-center justify-center p-6">
        <Text className="font-body text-base text-text">{title}</Text>
      </View>
    </SafeAreaView>
  );
}

export function CalendarScreen() {
  return <PlaceholderScreen title="Calendar" />;
}

export function StatisticsScreen() {
  return <PlaceholderScreen title="Statistics" />;
}

export function SettingsScreen() {
  return <PlaceholderScreen title="Settings" />;
}
