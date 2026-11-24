import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';

import { colors } from '@/theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondary-filled'
  | 'tonal'
  | 'ghost'
  | 'destructive'
  | 'warning';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Also supplies the accessible name for icon-only buttons. */
  label: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const variants = {
  primary: 'bg-primary',
  secondary: 'border border-outline bg-surface-card',
  'secondary-filled': 'bg-secondary',
  tonal: 'bg-primary-container',
  ghost: 'bg-transparent',
  destructive: 'bg-red-600',
  warning: 'bg-amber-600',
} satisfies Record<ButtonVariant, string>;

const labels = {
  primary: 'text-on-primary',
  secondary: 'text-text',
  'secondary-filled': 'text-on-primary',
  tonal: 'text-on-primary-container',
  ghost: 'text-primary',
  destructive: 'text-on-primary',
  warning: 'text-on-primary',
} satisfies Record<ButtonVariant, string>;

const spinnerColors = {
  primary: colors.onPrimary,
  secondary: colors.text,
  'secondary-filled': colors.onPrimary,
  tonal: colors.onPrimaryContainer,
  ghost: colors.primary,
  destructive: colors.onPrimary,
  warning: colors.onPrimary,
} satisfies Record<ButtonVariant, string>;

const sizes = {
  sm: 'min-h-9 px-4 py-2.5 rounded-lg',
  md: 'min-h-11 px-5 py-3 rounded-lg',
  lg: 'min-h-12 px-5 py-3.5 rounded-xl',
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  accessibilityLabel,
  accessibilityState,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{
        ...accessibilityState,
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      hitSlop={4}
      className={`flex-row items-center justify-center gap-2 ${
        iconOnly ? 'h-10 w-10 rounded-full' : sizes[size]
      } ${fullWidth ? 'w-full' : 'self-start'} ${
        disabled ? 'bg-outline opacity-70' : variants[variant]
      } ${
        isDisabled ? '' : 'active:scale-[0.98] active:opacity-95'
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={disabled ? colors.muted : spinnerColors[variant]}
        />
      ) : leadingIcon ? (
        <View
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          {leadingIcon}
        </View>
      ) : null}
      {!iconOnly && (
        <Text
          className={`shrink text-center font-body-semibold ${
            size === 'sm' ? 'text-xs leading-4' : 'text-sm leading-5'
          } ${disabled ? 'text-muted' : labels[variant]}`}
        >
          {label}
        </Text>
      )}
      {!loading && !iconOnly && trailingIcon && (
        <View
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          {trailingIcon}
        </View>
      )}
    </Pressable>
  );
}
