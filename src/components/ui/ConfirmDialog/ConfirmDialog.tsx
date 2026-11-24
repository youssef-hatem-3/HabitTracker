import { useRef } from 'react';
import type { ComponentRef, ReactNode } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export type ConfirmDialogVariant =
  | 'default'
  | 'destructive'
  | 'warning'
  | 'danger';

export interface ConfirmDialogOption {
  value: string;
  label: string;
  description?: string;
}

interface BaseConfirmDialogProps {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
  /** Controlled by the caller while its action is running. */
  loading?: boolean;
  dismissOnBackdropPress?: boolean;
  children?: ReactNode;
  testID?: string;
}

export type ConfirmDialogProps = BaseConfirmDialogProps &
  (
    | {
        options: readonly ConfirmDialogOption[];
        selectedOption: string;
        onSelectOption: (value: string) => void;
      }
    | {
        options?: never;
        selectedOption?: never;
        onSelectOption?: never;
      }
  );

const variants = {
  default: {
    icon: 'shield',
    color: colors.primary,
    container: 'bg-primary-container',
    button: 'primary',
  },
  destructive: {
    icon: 'warning',
    color: '#DC2626',
    container: 'bg-red-100',
    button: 'destructive',
  },
  warning: {
    icon: 'restart_alt',
    color: '#B45309',
    container: 'bg-amber-100',
    button: 'warning',
  },
  danger: {
    icon: 'delete_forever',
    color: colors.onPrimary,
    container: 'bg-red-600',
    button: 'destructive',
  },
} as const satisfies Record<
  ConfirmDialogVariant,
  { icon: IconName; color: string; container: string; button: string }
>;

export function ConfirmDialog({
  visible,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  loading = false,
  dismissOnBackdropPress = true,
  options,
  selectedOption,
  onSelectOption,
  children,
  testID,
}: ConfirmDialogProps) {
  const headingRef = useRef<ComponentRef<typeof Text>>(null);
  const appearance = variants[variant];
  const cancel = () => {
    if (!loading) {
      onCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={cancel}
      onShow={() => {
        const heading = findNodeHandle(headingRef.current);
        if (heading) {
          AccessibilityInfo.setAccessibilityFocus(heading);
        }
      }}
    >
      <View className="flex-1">
        <Pressable
          testID={testID ? `${testID}-backdrop` : undefined}
          className="absolute inset-0 bg-text/40"
          accessible={false}
          importantForAccessibility="no"
          onPress={dismissOnBackdropPress ? cancel : undefined}
        />
        <SafeAreaView
          className="flex-1 justify-end p-4"
          edges={['top', 'left', 'right', 'bottom']}
          pointerEvents="box-none"
        >
          <ScrollView
            testID={testID}
            accessibilityViewIsModal
            onAccessibilityEscape={cancel}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="gap-4 p-5"
            className={`max-h-full w-full max-w-[370px] grow-0 self-center rounded-2xl border bg-surface-card shadow-2xl ${
              variant === 'danger' ? 'border-red-300' : 'border-outline'
            }`}
          >
            <View className="flex-row items-start gap-3">
              <View
                className={`h-10 w-10 shrink-0 items-center justify-center rounded-full ${appearance.container}`}
              >
                <Icon
                  name={appearance.icon}
                  size={24}
                  color={appearance.color}
                />
              </View>
              <View className="flex-1">
                <Text
                  ref={headingRef}
                  accessible
                  accessibilityRole="header"
                  className={`font-heading text-base font-bold leading-[22px] ${
                    variant === 'danger' ? 'text-red-600' : 'text-text'
                  }`}
                >
                  {title}
                </Text>
                <Text className="mt-0.5 font-body text-xs leading-4 text-muted">
                  {description}
                </Text>
              </View>
            </View>
            {options && (
              <View accessibilityRole="radiogroup" className="gap-2">
                {options.map(option => {
                  const selected = selectedOption === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="radio"
                      accessibilityLabel={option.label}
                      accessibilityHint={option.description}
                      accessibilityState={{
                        checked: selected,
                        disabled: loading,
                      }}
                      disabled={loading}
                      onPress={() => onSelectOption?.(option.value)}
                      className={`flex-row items-start gap-2.5 rounded-xl p-3 ${
                        selected
                          ? 'border-2 border-primary bg-primary-container/30'
                          : 'border border-outline'
                      }`}
                    >
                      <View
                        className={`mt-0.5 h-4 w-4 items-center justify-center rounded-full border ${
                          selected ? 'border-primary' : 'border-outline-strong'
                        }`}
                      >
                        {selected && (
                          <View className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </View>
                      <View className="flex-1">
                        <Text className="font-body-semibold text-xs leading-4 text-text">
                          {option.label}
                        </Text>
                        {option.description && (
                          <Text className="font-body text-xs leading-4 text-muted">
                            {option.description}
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
            {children}
            <View className="flex-row items-center gap-2 pt-2">
              <Button
                label={cancelLabel}
                variant="secondary"
                size="sm"
                disabled={loading}
                onPress={cancel}
                className="flex-1"
              />
              <Button
                label={confirmLabel}
                variant={appearance.button}
                size="sm"
                loading={loading}
                onPress={onConfirm}
                className={`flex-1 ${variant === 'danger' ? 'bg-red-700' : ''}`}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
