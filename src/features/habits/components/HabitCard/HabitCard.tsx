import { Pressable, Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { Icon } from '@/components/ui';
import type { IconName } from '@/components/ui';
import { colors } from '@/theme';
import type { Habit, HabitId } from '@/types';

export type HabitCardTone = 'primary' | 'secondary' | 'blue' | 'purple';

export interface HabitCardProps
  extends Pick<
    ViewProps,
    | 'className'
    | 'style'
    | 'testID'
    | 'accessibilityLabel'
    | 'accessibilityHint'
  > {
  habit: Pick<Habit, 'id' | 'name'>;
  description?: string;
  icon?: IconName;
  tone?: HabitCardTone;
  completed: boolean;
  disabled?: boolean;
  onToggle: (habitId: HabitId, completed: boolean) => void;
  /** When supplied, the content opens details and the checkbox toggles completion. */
  onPress?: (habitId: HabitId) => void;
}

const tones = {
  primary: { background: 'bg-primary-container', color: colors.primary },
  secondary: { background: 'bg-secondary-container', color: colors.secondary },
  blue: { background: 'bg-blue-50', color: '#1D4ED8' },
  purple: { background: 'bg-purple-50', color: '#7E22CE' },
} as const;

export function HabitCard({
  habit,
  description,
  icon = 'menu_book',
  tone = 'primary',
  completed,
  disabled = false,
  onToggle,
  onPress,
  className = '',
  accessibilityLabel,
  accessibilityHint,
  ...props
}: HabitCardProps) {
  const appearance = tones[tone];
  const toggle = () => onToggle(habit.id, !completed);
  const label = accessibilityLabel ?? habit.name;
  const classes = `flex-row items-center justify-between gap-3 rounded-xl border border-outline bg-surface-card p-3.5 shadow-sm ${
    disabled ? 'opacity-70' : ''
  } ${className}`;
  const content = (
    <View className="flex-1 flex-row items-center gap-3">
      <View
        className={`h-10 w-10 items-center justify-center rounded-lg ${appearance.background}`}
      >
        <Icon name={icon} size={20} color={appearance.color} />
      </View>
      <View className="flex-1">
        <Text
          className={`font-heading-semibold text-[15px] leading-5 ${
            completed ? 'text-muted line-through' : 'text-text'
          }`}
        >
          {habit.name}
        </Text>
        {description && (
          <Text className="font-body text-xs leading-4 text-muted">
            {description}
          </Text>
        )}
      </View>
    </View>
  );
  const checkbox = (
    <View
      className={`h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
        completed ? 'border-primary bg-primary' : 'border-outline bg-surface'
      }`}
    >
      {completed && <Icon name="check" size={14} color={colors.onPrimary} />}
    </View>
  );

  if (onPress) {
    return (
      <View {...props} className={classes}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint ?? description}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={() => onPress(habit.id)}
          className="flex-1 active:opacity-80"
        >
          {content}
        </Pressable>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityLabel={label}
          accessibilityHint={completed ? 'Mark incomplete' : 'Mark complete'}
          accessibilityState={{ checked: completed, disabled }}
          disabled={disabled}
          onPress={toggle}
          hitSlop={8}
          className="active:scale-90"
        >
          {checkbox}
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      {...props}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint ?? description}
      accessibilityState={{ checked: completed, disabled }}
      disabled={disabled}
      onPress={toggle}
      className={`${classes} active:scale-[0.99]`}
    >
      {content}
      {checkbox}
    </Pressable>
  );
}
