import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TodayScreen } from '@/features/today/screens/TodayScreen';

import {
  CalendarScreen,
  SettingsScreen,
  StatisticsScreen,
} from './PlaceholderScreens';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
