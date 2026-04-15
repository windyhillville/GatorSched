import { DayItem } from '@/ui';

type DayOptionInfo = {
  dayIndex: string;
  shortLabel: string;
  longLabel: string;
};

export const POSSIBLE_SELECTED_DAYS: Record<string, DayOptionInfo> = {
  None: { dayIndex: '-1', shortLabel: '', longLabel: 'No Day Selected' },
  Sun: { dayIndex: '0', shortLabel: 'Su', longLabel: 'Sunday' },
  Mon: { dayIndex: '1', shortLabel: 'Mo', longLabel: 'Monday' },
  Tue: { dayIndex: '2', shortLabel: 'Tu', longLabel: 'Tuesday' },
  Wed: { dayIndex: '3', shortLabel: 'We', longLabel: 'Wednesday' },
  Thu: { dayIndex: '4', shortLabel: 'Th', longLabel: 'Thursday' },
  Fri: { dayIndex: '5', shortLabel: 'Fr', longLabel: 'Friday' },
  Sat: { dayIndex: '6', shortLabel: 'Sa', longLabel: 'Saturday' },
};
export const SHIFT_DAY_OPTIONS: DayItem[] = [
  { key: 'Sun', label: 'Su', timeRange: '' },
  { key: 'Mon', label: 'Mo', timeRange: '' },
  { key: 'Tue', label: 'Tu', timeRange: '' },
  { key: 'Wed', label: 'We', timeRange: '' },
  { key: 'Thu', label: 'Th', timeRange: '' },
  { key: 'Fri', label: 'Fr', timeRange: '' },
  { key: 'Sat', label: 'Sa', timeRange: '' },
];
