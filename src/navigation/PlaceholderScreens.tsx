import { Text, View } from 'react-native';

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{title}</Text>
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
