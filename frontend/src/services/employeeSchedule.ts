import { API_BASE } from './apiConfig';

export type EmployeeShiftSummary = {
  fromTime: string;
  toTime: string;
  longLabel: string;
  dateLabel: string;
  shiftHours: number;
};

export type EmployeeShift = {
  key: string;
  shortLabel: string;
  timeRange: string;
  isoDate: string;
  summary: EmployeeShiftSummary;
};

export type EmployeeScheduleResponse = {
  id: string;
  color: string;
  weekLabel: string;
  totalHours: number;
  schedule: EmployeeShift[];
};

export async function getEmployeeSchedule(
  viewerId: string,
  weekStart: string,
): Promise<EmployeeScheduleResponse> {
  const res = await fetch(
    `${API_BASE}/employee/schedule?viewer_id=${encodeURIComponent(viewerId)}&week_start=${encodeURIComponent(weekStart)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to retrieve Schedule');
  }

  return await res.json();
}
