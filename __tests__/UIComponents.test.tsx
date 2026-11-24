import React, { createRef } from 'react';
import type { ComponentRef, ReactElement } from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import type {
  ReactTestInstance,
  ReactTestRenderer as Renderer,
} from 'react-test-renderer';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Button,
  ConfirmDialog,
  EmptyState,
  Input,
  ProgressIndicator,
} from '@/components/ui';
import { HabitCard } from '@/features/habits';

const mounted: Renderer[] = [];

beforeAll(() => {
  require('../jest/nativewindStyles')();
});

async function render(element: ReactElement) {
  let renderer!: Renderer;
  await act(() => {
    renderer = ReactTestRenderer.create(element);
  });
  mounted.push(renderer);
  return renderer;
}

function control(renderer: Renderer, label: string): ReactTestInstance {
  const match = renderer.root.findAll(
    node =>
      node.props.accessibilityLabel === label &&
      typeof node.props.onPress === 'function',
  )[0];
  if (!match) {
    throw new Error(`Missing control: ${label}`);
  }
  return match;
}

afterEach(async () => {
  await act(() => {
    mounted.splice(0).forEach(renderer => renderer.unmount());
  });
});

test('NativeWind resolves Stitch spacing, typography and radius overrides at the 16px root', async () => {
  const renderer = await render(
    <>
      <Button
        testID="styled-button"
        label="Save Habit Plan"
        onPress={jest.fn()}
      />
      <HabitCard
        testID="styled-habit"
        habit={{ id: 'reading', name: 'Read Quran' }}
        completed={false}
        onToggle={jest.fn()}
      />
    </>,
  );
  const host = (id: string) =>
    renderer.root.findAll(
      node => typeof node.type === 'string' && node.props.testID === id,
    )[0];
  expect(StyleSheet.flatten(host('styled-button').props.style)).toMatchObject({
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 12,
    minHeight: 44,
  });
  expect(StyleSheet.flatten(host('styled-habit').props.style)).toMatchObject({
    borderRadius: 24,
    padding: 14,
  });
  const label = renderer.root.findAll(
    node =>
      typeof node.type === 'string' &&
      node.props.children === 'Save Habit Plan',
  )[0];
  expect(StyleSheet.flatten(label.props.style)).toMatchObject({
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-SemiBold',
  });
});

test('Button calls its action and exposes loading as a disabled, busy state', async () => {
  const onPress = jest.fn();
  const renderer = await render(
    <Button label="Save Habit Plan" onPress={onPress} />,
  );
  await act(() => control(renderer, 'Save Habit Plan').props.onPress());
  expect(onPress).toHaveBeenCalledTimes(1);

  await act(() =>
    renderer.update(
      <Button label="Save Habit Plan" loading onPress={onPress} />,
    ),
  );
  const button = control(renderer, 'Save Habit Plan');
  expect(button.props.disabled).toBe(true);
  expect(button.props.accessibilityState).toMatchObject({
    busy: true,
    disabled: true,
  });
});

test('icon-only Button keeps its accessible label', async () => {
  const renderer = await render(
    <Button
      label="Previous Day"
      iconOnly
      leadingIcon={<Text>‹</Text>}
      onPress={jest.fn()}
    />,
  );
  expect(control(renderer, 'Previous Day').props.accessibilityRole).toBe(
    'button',
  );
  expect(
    renderer.root
      .findAllByType(Text)
      .some(node => node.props.children === 'Previous Day'),
  ).toBe(false);
});

test('Input forwards its value, ref, change and focus callbacks', async () => {
  const onChangeText = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const ref = createRef<ComponentRef<typeof TextInput>>();
  const renderer = await render(
    <Input
      ref={ref}
      label="Habit Name"
      value="Read"
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );
  const field = renderer.root.findByType(TextInput);
  expect(field.props.value).toBe('Read');
  expect(field.props.accessibilityLabel).toBe('Habit Name');
  expect(typeof ref.current?.focus).toBe('function');
  await act(() => {
    field.props.onChangeText('Read 10 Pages');
    field.props.onFocus({ nativeEvent: {} });
  });
  await act(() => field.props.onBlur({ nativeEvent: {} }));
  expect(onChangeText).toHaveBeenCalledWith('Read 10 Pages');
  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test('Input announces its validation error instead of helper text', async () => {
  const renderer = await render(
    <Input
      label="Habit Name"
      helperText="Repeats daily"
      error="Enter a habit name"
      editable={false}
    />,
  );
  const field = renderer.root.findByType(TextInput);
  expect(field.props.accessibilityHint).toBe('Enter a habit name');
  expect(field.props.accessibilityState.disabled).toBe(true);
  expect(
    renderer.root
      .findAllByType(Text)
      .some(node => node.props.children === 'Repeats daily'),
  ).toBe(false);
});

test.each([
  [3, 5, 60],
  [-1, 5, 0],
  [8, 5, 100],
  [3, 0, 0],
  [Number.NaN, 5, 0],
  [3, Number.POSITIVE_INFINITY, 0],
])(
  'ProgressIndicator safely handles value=%s and total=%s',
  async (value, total, expected) => {
    const renderer = await render(
      <ProgressIndicator value={value} total={total} variant="summary" />,
    );
    const progress = renderer.root
      .findAllByType(View)
      .find(node => node.props.accessibilityRole === 'progressbar');
    expect(progress?.props.accessibilityValue.now).toBe(expected);
  },
);

test('EmptyState only renders a call to action when a handler is supplied', async () => {
  const onAction = jest.fn();
  const renderer = await render(<EmptyState variant="no-plan" />);
  expect(renderer.root.findAllByType(Pressable)).toHaveLength(0);
  await act(() =>
    renderer.update(<EmptyState variant="no-plan" onAction={onAction} />),
  );
  await act(() => control(renderer, 'Create Monthly Plan').props.onPress());
  expect(onAction).toHaveBeenCalledTimes(1);
});

test('HabitCard sends the habit identifier and next controlled completion state', async () => {
  const habit = { id: 'read', name: 'Read Quran' };
  const onToggle = jest.fn();
  const renderer = await render(
    <HabitCard habit={habit} completed={false} onToggle={onToggle} />,
  );
  await act(() => control(renderer, 'Read Quran').props.onPress());
  expect(onToggle).toHaveBeenLastCalledWith('read', true);
  // The caller owns completion; a tap does not mutate the card's props.
  expect(control(renderer, 'Read Quran').props.accessibilityState.checked).toBe(
    false,
  );
  await act(() =>
    renderer.update(<HabitCard habit={habit} completed onToggle={onToggle} />),
  );
  await act(() => control(renderer, 'Read Quran').props.onPress());
  expect(onToggle).toHaveBeenLastCalledWith('read', false);
});

test('HabitCard keeps details and completion actions independent', async () => {
  const onToggle = jest.fn();
  const onPress = jest.fn();
  const renderer = await render(
    <HabitCard
      habit={{ id: 'water', name: 'Drink 3L Water' }}
      completed={false}
      onToggle={onToggle}
      onPress={onPress}
    />,
  );
  const controls = renderer.root.findAll(
    node => typeof node.props.onPress === 'function',
  );
  const checkbox = controls.find(
    node => node.props.accessibilityRole === 'checkbox',
  )!;
  const details = controls.find(
    node => node.props.accessibilityRole === 'button',
  )!;
  await act(() => checkbox.props.onPress());
  expect(onToggle).toHaveBeenCalledWith('water', true);
  expect(onPress).not.toHaveBeenCalled();
  await act(() => details.props.onPress());
  expect(onPress).toHaveBeenCalledWith('water');
  expect(onToggle).toHaveBeenCalledTimes(1);
});

test('ConfirmDialog delegates confirmation, cancellation and Android back', async () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const renderer = await render(
    <ConfirmDialog
      visible
      title="Delete Habit"
      description="Remove this habit?"
      confirmLabel="Delete Habit"
      onConfirm={onConfirm}
      onCancel={onCancel}
      variant="destructive"
    />,
  );
  await act(() => control(renderer, 'Delete Habit').props.onPress());
  await act(() => control(renderer, 'Cancel').props.onPress());
  await act(() => renderer.root.findByType(Modal).props.onRequestClose());
  expect(onConfirm).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(2);
});

test('ConfirmDialog blocks dismissal while the caller is saving', async () => {
  const onCancel = jest.fn();
  const renderer = await render(
    <ConfirmDialog
      visible
      loading
      title="Saving"
      description="Please wait"
      onConfirm={jest.fn()}
      onCancel={onCancel}
      testID="confirm"
    />,
  );
  expect(control(renderer, 'Confirm').props.disabled).toBe(true);
  expect(control(renderer, 'Cancel').props.disabled).toBe(true);
  await act(() => renderer.root.findByType(Modal).props.onRequestClose());
  const backdrop = renderer.root.findAll(
    node =>
      node.props.testID === 'confirm-backdrop' &&
      typeof node.props.onPress === 'function',
  )[0];
  await act(() => backdrop.props.onPress());
  expect(onCancel).not.toHaveBeenCalled();
});

test('ConfirmDialog options request a selection without changing controlled state', async () => {
  const onSelectOption = jest.fn();
  const renderer = await render(
    <ConfirmDialog
      visible
      title="Update Active Habit"
      description="How should this edit apply?"
      onConfirm={jest.fn()}
      onCancel={jest.fn()}
      options={[
        { value: 'forward', label: 'From today onward' },
        { value: 'month', label: 'Entire month' },
      ]}
      selectedOption="forward"
      onSelectOption={onSelectOption}
    />,
  );
  await act(() => control(renderer, 'Entire month').props.onPress());
  expect(onSelectOption).toHaveBeenCalledWith('month');
  expect(
    control(renderer, 'From today onward').props.accessibilityState.checked,
  ).toBe(true);
});
