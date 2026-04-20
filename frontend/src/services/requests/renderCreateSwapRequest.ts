import { API_BASE } from '../apiConfig';
import { RequestPerson } from './types';

export type AssignmentSummary = {
  assignmentId: string;
  dayLabel: string;
  monthAndDayLabel: string;
  timeRange: string;
};

export type TeammateShiftGroup = {
  teammateId: string;
  shifts: AssignmentSummary[];
};

export type EmployeeSwapRequestInfoResponse = {
  requester: RequestPerson;
  requesterShifts: AssignmentSummary[];
  eligibleTeammates: RequestPerson[];
  eligibleTeammatesShifts: TeammateShiftGroup[];
};

export async function getSwapRequestInfo(
  viewerId: string,
  weekStart: string,
): Promise<EmployeeSwapRequestInfoResponse> {
  const res = await fetch(
    `${API_BASE}/employee/requests/swap-options?viewer_id=${encodeURIComponent(viewerId)}&week_start=${encodeURIComponent(weekStart)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to retrieve swap request information');
  }

  return await res.json();
}
