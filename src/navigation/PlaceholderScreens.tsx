import { Text, View } from 'react-native';

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="font-body text-base text-text">{title}</Text>
    </View>
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
