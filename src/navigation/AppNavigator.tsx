import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

/**
 * Application navigation boundary.
 *
 * A navigation library can be introduced here when the first flows are ready.
 */
export function AppNavigator() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Habit Flow</Text>
      <Text style={styles.subtitle}>Build small habits. Keep moving forward.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
  },
});
