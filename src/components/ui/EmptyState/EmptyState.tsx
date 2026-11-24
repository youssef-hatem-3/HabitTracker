import { Text, View } from 'react-native';
import type { ViewProps } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useId } from 'react';

import { colors } from '@/theme';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export type EmptyStateVariant =
  | 'no-plan'
  | 'no-habits'
  | 'no-statistics'
  | 'no-completions'
  | 'celebration';

export interface EmptyStateProps extends ViewProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  badge?: string;
  actionLabel?: string;
  /** Omit to render a state without a call to action. */
  onAction?: () => void;
  /** Shows the completion metric in the celebration state. */
  completedHabits?: number;
}

const states = {
  'no-plan': {
    title: 'Your next chapter starts here.',
    description:
      'Monthly habit planning lets you set recurring intentions once and stick with them every single day without manual setup.',
    badge: 'Monthly Foundation',
    icon: 'calendar_month',
    action: 'Create Monthly Plan',
    actionIcon: 'add_circle',
    container: 'border-primary/20 bg-primary-container/40',
    color: colors.primary,
  },
  'no-habits': {
    title: 'No habits scheduled for today.',
    description:
      'Take a restful breather or add a mindful habit to your active plan to maintain momentum.',
    badge: undefined,
    icon: 'today',
    action: 'Add a Habit',
    actionIcon: 'add',
    container: 'border-secondary/20 bg-secondary-container/50',
    color: colors.secondary,
  },
  'no-statistics': {
    title: 'Your progress story starts with one habit.',
    description:
      'As soon as you complete your first check-in, your 30-day bar chart, streaks, and heatmaps will bring your progress to life.',
    badge: undefined,
    icon: 'query_stats',
    action: 'Start Tracking',
    actionIcon: 'play_arrow',
    container: 'border-outline bg-surface-subtle',
    color: colors.muted,
  },
  'no-completions': {
    title: 'Make today count.',
    description:
      'Your habits are waiting for today. Checking off just one builds immediate momentum!',
    badge: 'New Day, Fresh Focus',
    icon: 'wb_sunny',
    action: 'Complete First Habit',
    actionIcon: 'check_circle',
    container: 'border-streak-amber/20 bg-streak-amber-subtle',
    color: colors.streakAmber,
  },
  celebration: {
    title: 'You crushed it today! 🎉',
    description:
      'All your scheduled habits for today are completed. Keep your momentum going!',
    badge: 'Perfect Day • 100%',
    icon: 'check_circle',
    action: 'View Progress & Analytics',
    actionIcon: 'arrow_forward',
    container: '',
    color: colors.primary,
  },
} satisfies Record<
  EmptyStateVariant,
  {
    title: string;
    description: string;
    badge: string | undefined;
    icon: IconName;
    action: string;
    actionIcon: IconName;
    container: string;
    color: string;
  }
>;

export function EmptyState({
  variant = 'no-plan',
  title,
  description,
  badge,
  actionLabel,
  onAction,
  completedHabits,
  className = '',
  ...props
}: EmptyStateProps) {
  const state = states[variant];
  const isCelebration = variant === 'celebration';
  const badgeLabel = badge ?? state.badge;
  const gradientId = `celebration-${useId().replace(/:/g, '')}`;
  const count =
    completedHabits !== undefined &&
    Number.isFinite(completedHabits) &&
    completedHabits > 0
      ? Math.floor(completedHabits)
      : undefined;

  return (
    <View {...props} className={`w-full items-center gap-6 ${className}`}>
      {isCelebration ? (
        <View className="h-36 w-36 items-center justify-center rounded-full border-4 border-primary/30 shadow-xl">
          <View className="absolute inset-0">
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 144 144"
              accessible={false}
            >
              <Defs>
                <LinearGradient
                  id={gradientId}
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <Stop offset="0%" stopColor={colors.primaryContainer} />
                  <Stop offset="50%" stopColor={colors.surfaceCard} />
                  <Stop offset="100%" stopColor={colors.secondaryContainer} />
                </LinearGradient>
              </Defs>
              <Circle cx={72} cy={72} r={72} fill={`url(#${gradientId})`} />
            </Svg>
          </View>
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary shadow-md">
            <Text accessible={false} className="text-4xl">
              🎉
            </Text>
          </View>
          <Text
            accessible={false}
            className="absolute -right-1 -top-1 text-2xl"
          >
            ✨
          </Text>
          <Text
            accessible={false}
            className="absolute -left-2 bottom-2 text-2xl"
          >
            🌟
          </Text>
        </View>
      ) : (
        <View
          className={`h-32 w-32 items-center justify-center rounded-3xl border shadow-md ${state.container}`}
        >
          <Icon name={state.icon} size={60} color={state.color} />
        </View>
      )}
      <View className="w-full items-center gap-2 px-2">
        {badgeLabel && (
          <View
            className={`rounded-full px-3 py-1 ${
              isCelebration
                ? 'bg-primary-container'
                : variant === 'no-completions'
                ? 'bg-streak-amber-subtle'
                : 'border border-outline bg-surface-subtle'
            }`}
          >
            <Text
              className={`text-center font-body-semibold text-xs leading-4 uppercase tracking-[1px] ${
                isCelebration
                  ? 'text-primary'
                  : variant === 'no-completions'
                  ? 'text-streak-amber'
                  : 'text-muted'
              }`}
            >
              {badgeLabel}
            </Text>
          </View>
        )}
        <Text
          accessibilityRole="header"
          className="text-center font-heading text-2xl font-bold leading-[30px] tracking-[-0.25px] text-text"
        >
          {title ?? state.title}
        </Text>
        <Text className="text-center font-body text-sm leading-[22.75px] text-muted">
          {description ?? state.description}
        </Text>
      </View>
      {isCelebration && count !== undefined && count > 0 && (
        <View className="w-full max-w-xs flex-row flex-wrap items-center justify-between gap-2 rounded-xl border border-outline bg-surface-card p-3.5">
          <Text className="font-body text-xs leading-4 text-muted">
            Daily Completion
          </Text>
          <Text className="font-heading text-base font-bold leading-6 text-primary">
            {count} / {count} Habits (100%)
          </Text>
        </View>
      )}
      {onAction && (
        <View className="w-full pt-2">
          <Button
            label={actionLabel ?? state.action}
            variant={variant === 'no-habits' ? 'secondary-filled' : 'primary'}
            size="lg"
            fullWidth
            onPress={onAction}
            leadingIcon={
              !isCelebration ? (
                <Icon
                  name={state.actionIcon}
                  size={18}
                  color={colors.onPrimary}
                />
              ) : undefined
            }
            trailingIcon={
              isCelebration ? (
                <Icon name="arrow_forward" size={18} color={colors.onPrimary} />
              ) : undefined
            }
          />
        </View>
      )}
    </View>
  );
}
