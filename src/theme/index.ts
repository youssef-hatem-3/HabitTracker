import { Platform } from 'react-native';

// Source: HabitFlow Monthly Plans Redesign / HabitFlow Design System in Stitch.
// Secondary text is darkened from #707974 for 4.5:1 contrast on the background.
export const colors = {
  background: '#F8FAF9',
  surface: '#F8FAF9',
  surfaceCard: '#FFFFFF',
  surfaceSubtle: '#F1F5F3',
  primary: '#107A48',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E8F5EE',
  onPrimaryContainer: '#084427',
  secondary: '#2E7D68',
  secondaryContainer: '#E6F4F0',
  onSecondaryContainer: '#114235',
  text: '#191C1B',
  textSecondary: '#58655E',
  outline: '#E2E8E5',
  outlineStrong: '#CBD5D0',
  streakAmber: '#D97706',
  streakAmberSubtle: '#FEF3C7',
  partialGreen: '#86EFAC',
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24,
  section: 32, pageMargin: 16,
} as const;

export const radius = {
  sm: 6, base: 12, md: 16, lg: 20, xl: 24, full: 9999,
} as const;

export const fontFamily = {
  heading: Platform.select({ ios: 'PlusJakartaSans-Bold', android: 'PlusJakartaSans' }),
  headingSemiBold: Platform.select({ ios: 'PlusJakartaSans-SemiBold', android: 'PlusJakartaSansSemiBold' }),
  body: Platform.select({ ios: 'Inter-Regular', android: 'Inter' }),
  bodySemiBold: Platform.select({ ios: 'Inter-SemiBold', android: 'InterSemiBold' }),
} as const;

// Sizes are density independent pixels. Text scaling remains enabled.
export const typography = {
  display: { fontFamily: fontFamily.heading, fontSize: 36, lineHeight: 44, fontWeight: '700' as const, letterSpacing: -0.5 },
  displayMobile: { fontFamily: fontFamily.heading, fontSize: 28, lineHeight: 34, fontWeight: '700' as const, letterSpacing: -0.25 },
  headline: { fontFamily: fontFamily.heading, fontSize: 24, lineHeight: 30, fontWeight: '700' as const, letterSpacing: -0.25 },
  headlineMobile: { fontFamily: fontFamily.heading, fontSize: 20, lineHeight: 26, fontWeight: '700' as const, letterSpacing: -0.15 },
  headlineMd: { fontFamily: fontFamily.headingSemiBold, fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  title: { fontFamily: fontFamily.headingSemiBold, fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  titleMd: { fontFamily: fontFamily.headingSemiBold, fontSize: 15, lineHeight: 20, fontWeight: '600' as const },
  body: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyMd: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  bodySm: { fontFamily: fontFamily.body, fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  label: { fontFamily: fontFamily.bodySemiBold, fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  labelMd: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
  labelSm: { fontFamily: fontFamily.bodySemiBold, fontSize: 10, lineHeight: 14, fontWeight: '600' as const },
} as const;
