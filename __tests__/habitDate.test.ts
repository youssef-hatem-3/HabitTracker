import { formatLocalDate, isValidHabitDate, parseHabitDate } from '@/utils';

describe('formatLocalDate', () => {
  test.each([
    [new Date(2026, 0, 5, 12), '2026-01-05'],
    [new Date(2026, 10, 23, 23, 59, 59, 999), '2026-11-23'],
    [new Date(2026, 10, 24, 0, 0, 0, 0), '2026-11-24'],
    [new Date(2026, 10, 24, 0, 30), '2026-11-24'],
    [new Date(2026, 10, 24, 23, 30), '2026-11-24'],
    [new Date(2026, 3, 30, 23, 59), '2026-04-30'],
    [new Date(2026, 4, 1, 0, 0), '2026-05-01'],
    [new Date(2026, 11, 31, 23, 59), '2026-12-31'],
    [new Date(2027, 0, 1, 0, 0), '2027-01-01'],
    [new Date(2024, 1, 29, 12), '2024-02-29'],
    [new Date(2024, 2, 1, 0, 0), '2024-03-01'],
  ])('formats local calendar day %s as %s', (date, expected) => {
    expect(formatLocalDate(date)).toBe(expected);
  });

  test.each([
    [1, '0001-01-01'],
    [99, '0099-01-01'],
    [9999, '9999-01-01'],
    [0, null],
    [-1, null],
    [10000, null],
  ])('handles local year %s', (year, expected) => {
    // Date's multi-argument constructor treats years 0–99 as 1900–1999.
    const date = new Date(2000, 0, 1, 12);
    date.setFullYear(year);
    expect(formatLocalDate(date)).toBe(expected);
  });

  test('returns null for an invalid Date', () => {
    expect(formatLocalDate(new Date(Number.NaN))).toBeNull();
  });

  test('does not mutate the input', () => {
    const date = new Date(2026, 10, 24, 0, 30, 15, 123);
    const timestamp = date.getTime();
    expect(formatLocalDate(date)).toBe('2026-11-24');
    expect(date.getTime()).toBe(timestamp);
  });
});

describe('calendar key validation and parsing', () => {
  test.each([
    ['0001-01-01', { year: 1, month: 1, day: 1 }],
    ['0099-12-31', { year: 99, month: 12, day: 31 }],
    ['9999-12-31', { year: 9999, month: 12, day: 31 }],
    ['2026-01-05', { year: 2026, month: 1, day: 5 }],
    ['2026-02-28', { year: 2026, month: 2, day: 28 }],
    ['2024-02-29', { year: 2024, month: 2, day: 29 }],
    ['1900-02-28', { year: 1900, month: 2, day: 28 }],
    ['2000-02-29', { year: 2000, month: 2, day: 29 }],
    ['2400-02-29', { year: 2400, month: 2, day: 29 }],
    ['2026-04-30', { year: 2026, month: 4, day: 30 }],
    ['2026-12-31', { year: 2026, month: 12, day: 31 }],
  ])('accepts %s and returns calendar parts', (key, expected) => {
    expect(parseHabitDate(key)).toEqual(expected);
    expect(isValidHabitDate(key)).toBe(true);
  });

  test.each([
    '0000-01-01',
    '10000-01-01',
    '-001-01-01',
    '2026-00-01',
    '2026-13-01',
    '2026-01-00',
    '2026-01-32',
    '2026-02-29',
    '2024-02-30',
    '1900-02-29',
    '2100-02-29',
    '2026-04-31',
    '2026-06-31',
    '2026-09-31',
    '2026-11-31',
    '2026-1-05',
    '2026-01-5',
    '26-01-05',
    '2026/01/05',
    '2026-01-05T00:00:00Z',
    '2026-01-05T00:00:00+02:00',
    ' 2026-01-05',
    '2026-01-05 ',
    '2026-01-05\n',
    '2026-01-05\r\n',
    '٢٠٢٦-٠١-٠٥',
    '',
    'not-a-date',
  ])('rejects invalid key %j without normalizing it', value => {
    expect(parseHabitDate(value)).toBeNull();
    expect(isValidHabitDate(value)).toBe(false);
  });

  test.each([
    null,
    undefined,
    20260105,
    Number.NaN,
    true,
    {},
    ['2026-01-05'],
    new Date(2026, 0, 5),
  ])('rejects non-string input %j', value => {
    expect(parseHabitDate(value)).toBeNull();
    expect(isValidHabitDate(value)).toBe(false);
  });
});
