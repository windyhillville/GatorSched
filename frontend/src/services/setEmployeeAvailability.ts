import { API_BASE } from './apiConfig';

export type SetEmployeeAvailabilityRequest = {
  isAvailable: boolean;
  startHour: string | null;
  startMinute: string | null;
  startTimePeriod: 'AM' | 'PM' | null;
  endHour: string | null;
  endMinute: string | null;
  endTimePeriod: 'AM' | 'PM' | null;
};

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
  isAvailable: boolean;
};

export type SetEmployeeAvailabilityResponse = {
  dayOfWeek: number;
  availability: EmployeeAvailability;
};

export async function setAvailability(
  dayOfWeek: number,
  payload: SetEmployeeAvailabilityRequest,
  viewerId: string,
): Promise<SetEmployeeAvailabilityResponse> {
  const res = await fetch(
    `${API_BASE}/employee/availabilities/${dayOfWeek}?viewer_id=${encodeURIComponent(viewerId)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to set Availability');
  }

  return await res.json();
}
