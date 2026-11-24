import { forwardRef, useId, useState } from 'react';
import type { ComponentRef, ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

import { colors } from '@/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  leadingIcon?: ReactNode;
  /** Styles the field's outer container. */
  className?: string;
  inputClassName?: string;
  variant?: 'default' | 'subtle';
}

export const Input = forwardRef<ComponentRef<typeof TextInput>, InputProps>(
  function Input(
    {
      label,
      helperText,
      error,
      leadingIcon,
      variant = 'default',
      className = '',
      inputClassName = '',
      editable = true,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
    const id = useId();
    const [focused, setFocused] = useState(false);
    const hint = error || helperText;

    return (
      <View
        className={`w-full gap-1.5 ${
          editable ? '' : 'opacity-70'
        } ${className}`}
      >
        {label && (
          <Text
            nativeID={`${id}-label`}
            className="font-body-semibold text-xs leading-4 text-text"
          >
            {label}
          </Text>
        )}
        <View
          className={`relative flex-row items-center gap-2 rounded-lg border px-3.5 ${
            variant === 'subtle' ? 'bg-surface-subtle' : 'bg-surface-card'
          } ${
            error
              ? 'border-red-600'
              : focused
              ? 'border-primary'
              : 'border-outline'
          }`}
        >
          {focused && !error && (
            <View
              pointerEvents="none"
              className="absolute -inset-[3px] rounded-[22px] border-2 border-primary/20"
            />
          )}
          {leadingIcon && (
            <View
              accessible={false}
              importantForAccessibility="no-hide-descendants"
            >
              {leadingIcon}
            </View>
          )}
          <TextInput
            {...props}
            ref={ref}
            editable={editable}
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityHint={
              [accessibilityHint, hint].filter(Boolean).join('. ') || undefined
            }
            accessibilityState={{ ...accessibilityState, disabled: !editable }}
            placeholderTextColor={props.placeholderTextColor ?? colors.muted}
            selectionColor={props.selectionColor ?? colors.primary}
            className={`min-h-10 flex-1 py-2.5 font-body text-sm leading-5 text-text ${inputClassName}`}
            onFocus={event => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={event => {
              setFocused(false);
              onBlur?.(event);
            }}
          />
        </View>
        {hint && (
          <Text
            accessibilityLiveRegion={error ? 'polite' : 'none'}
            className={`font-body text-xs leading-4 ${
              error ? 'text-red-600' : 'text-muted'
            }`}
          >
            {hint}
          </Text>
        )}
      </View>
    );
  },
);
