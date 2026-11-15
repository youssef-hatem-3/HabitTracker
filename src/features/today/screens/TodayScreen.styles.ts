import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  screen: { flexGrow: 1, justifyContent: 'center', padding: spacing.pageMargin },
  content: { width: '100%', maxWidth: 440, alignSelf: 'center' },
  eyebrow: { ...typography.labelMd, color: colors.primary, letterSpacing: 1.5, marginBottom: spacing.sm },
  heading: { ...typography.displayMobile, color: colors.text },
  intro: { ...typography.body, color: colors.textSecondary, marginTop: spacing.md },
  card: {
    backgroundColor: colors.surfaceCard,
    borderColor: colors.outline,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.section,
    padding: spacing.xxl,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryContainer,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  badgeText: { ...typography.labelSm, color: colors.onPrimaryContainer, letterSpacing: 0.6 },
  cardTitle: { ...typography.headlineMd, color: colors.text, marginTop: spacing.lg },
  cardBody: { ...typography.bodyMd, color: colors.textSecondary, marginTop: spacing.sm },
});
