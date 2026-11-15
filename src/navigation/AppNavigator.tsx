import { NavigationContainer } from '@react-navigation/native';

import { BottomTabNavigator } from './BottomTabNavigator';

export function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

