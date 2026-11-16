
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House,
  CalendarDays,
  ChartNoAxesColumn,
  Settings,
} from 'lucide-react-native';

import { TodayScreen } from '@/features/today';
import { colors } from '@/theme';

import {
  CalendarScreen,
  StatisticsScreen,
  SettingsScreen,
} from './PlaceholderScreens';

import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabIcons = {
  Today: House,
  Calendar: CalendarDays,
  Statistics: ChartNoAxesColumn,
  Settings: Settings,
};

function createTabIcon(Icon: typeof House) {
  return ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <Icon
      color={color}
      size={size}
      strokeWidth={focused ? 2.5 : 2}
    />
  );
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => {
        const Icon = tabIcons[route.name];

        return {
          headerShown: false,

          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,

          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.outline,
            paddingTop: 10
          },

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },

          tabBarIcon: createTabIcon(Icon),
        };
      }}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
