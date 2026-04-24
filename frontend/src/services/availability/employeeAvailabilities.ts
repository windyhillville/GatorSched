import { API_BASE } from '../apiConfig';
import { EmployeeAvailability } from './types';

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
