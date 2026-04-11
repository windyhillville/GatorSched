import { API_BASE } from '../apiConfig';
import { EmployeeAvailability } from './types';

export type SetEmployeeAvailabilityRequest = {
  isAvailable: boolean;
  startHour: string | null;
  startMinute: string | null;
  startTimePeriod: 'AM' | 'PM' | null;
  endHour: string | null;
  endMinute: string | null;
  endTimePeriod: 'AM' | 'PM' | null;
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
