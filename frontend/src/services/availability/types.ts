export type ShiftTimeSpan = {
  startHour: string;
  startMinute: string;
  startTimePeriod: 'AM' | 'PM';
  endHour: string;
  endMinute: string;
  endTimePeriod: 'AM' | 'PM';
};

export type EmployeeAvailability = {
  key: string;
  shortLabel: string;
  longLabel: string;
  timeRange: string;
  timeWindow: ShiftTimeSpan;
  isAvailable: boolean;
};
