import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { ViewProps } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '@/theme';
import { Icon } from '../Icon';

export interface ProgressIndicatorProps extends ViewProps {
  value: number;
  total?: number;
  variant?: 'linear' | 'circular' | 'summary';
  label?: string;
  /** Circular diameter in density independent pixels. */
  size?: number;
  center?: ReactNode;
  caption?: string;
  trackingLabel?: string;
}

export function ProgressIndicator({
  value,
  total = 100,
  variant = 'linear',
  label = 'Daily Completion',
  size = 56,
  center,
  caption,
  trackingLabel,
  className = '',
  ...props
}: ProgressIndicatorProps) {
  const target = Number.isFinite(total) ? Math.max(0, total) : 0;
  const completed = Number.isFinite(value)
    ? Math.min(target, Math.max(0, value))
    : 0;
  const percentage = target > 0 ? (completed / target) * 100 : 0;
  const percentLabel = Math.round(percentage);
  const diameter = Number.isFinite(size) && size > 0 ? size : 56;

  const ring = (
    <View
      className="items-center justify-center"
      style={{ width: diameter, height: diameter }}
    >
      <Svg
        width={diameter}
        height={diameter}
        viewBox="0 0 36 36"
        accessible={false}
      >
        <Circle
          cx={18}
          cy={18}
          r={15.9155}
          fill="none"
          stroke={colors.surfaceSubtle}
          strokeWidth={3.5}
        />
        {percentage > 0 && (
          <Circle
            cx={18}
            cy={18}
            r={15.9155}
            fill="none"
            stroke={colors.primary}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeDasharray={`${percentage} 100`}
            transform="rotate(-90 18 18)"
          />
        )}
      </Svg>
      <View className="absolute items-center justify-center">
        {center ?? (
          <Icon name="energy_savings_leaf" size={20} color={colors.primary} />
        )}
      </View>
    </View>
  );
  const bar = (
    <View className="h-2.5 w-full overflow-hidden rounded-full border border-outline/50 bg-surface-subtle">
      <View
        className="h-full rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );

  return (
    <View
      {...props}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={props.accessibilityLabel ?? label}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: percentLabel,
        text: `${completed} of ${target} completed, ${percentLabel}%`,
      }}
      className={`${
        variant === 'summary'
          ? 'gap-3 rounded-xl border border-outline bg-surface-card p-4 shadow-sm'
          : ''
      } ${className}`}
    >
      {variant === 'summary' ? (
        <>
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <Text className="font-body-semibold text-[10px] leading-[14px] uppercase tracking-[1px] text-muted">
                {label}
              </Text>
              <View className="flex-row flex-wrap items-baseline gap-x-2">
                <Text className="font-heading text-[28px] font-bold leading-[34px] tracking-[-0.25px] text-primary">
                  {percentLabel}%
                </Text>
                <Text className="font-body-semibold text-sm leading-5 text-text">
                  {completed} of {target} completed
                </Text>
              </View>
            </View>
            {ring}
          </View>
          {bar}
          {(caption || trackingLabel) && (
            <View className="flex-row flex-wrap justify-between gap-2 border-t border-outline/60 pt-1">
              {caption && (
                <Text className="font-body text-[11px] leading-4 text-muted">
                  {caption}
                </Text>
              )}
              {trackingLabel && (
                <Text className="font-body text-[11px] leading-4 text-secondary">
                  {trackingLabel}
                </Text>
              )}
            </View>
          )}
        </>
      ) : variant === 'circular' ? (
        ring
      ) : (
        bar
      )}
    </View>
  );
}
