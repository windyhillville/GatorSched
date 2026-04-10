import { API_BASE } from './apiConfig';

type ShiftTimeSpan = {
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
};

export type EmployeeAvailabilityResponse = {
  id: string;
  availabilities: EmployeeAvailability[];
};

export async function getAvailabilities(viewerId: string): Promise<EmployeeAvailabilityResponse> {
  const res = await fetch(
    `${API_BASE}/employee/availabilities?viewer_id=${encodeURIComponent(viewerId)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to retrieve Availabilities');
  }

  return await res.json();
}
