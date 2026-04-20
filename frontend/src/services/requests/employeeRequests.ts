import { API_BASE } from '../apiConfig';

import {
  EmployeeRequestStatus,
  ManagerRequestStatus,
  RequestPerson,
  RequestShiftSummary,
} from './types';

// type EmployeeRequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';
// type MananagerRequestStatus = 'not_sent' | 'pending' | 'approved' | 'rejected';
// type RequestType = 'swap' | 'callout' | 'pickup';

// export type RequestPerson = {
//   id: string;
//   name: string;
//   avatarUrl: string | null;
//   color: string | null;
// };

// export type RequestShiftSummary = {
//   day: string;
//   timeRange: string;
// };

export type EmployeeRequestCardBase = {
  id: string;
  employeeStatus: EmployeeRequestStatus;
  managerStatus: ManagerRequestStatus;
};

export type EmployeeSwapRequestCard = EmployeeRequestCardBase & {
  type: 'swap';
  requester: RequestPerson;
  requesterShift: RequestShiftSummary;
  coverEmployee: RequestPerson;
  coverShift: RequestShiftSummary;
};

export type CallOutStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export type EmployeeCalloutRequestCard = EmployeeRequestCardBase & {
  type: 'callout';
  employee: RequestPerson;
  shift: RequestShiftSummary;
  reason: string | null;
  status: CallOutStatus;
}

export type EmployeeRequestCard = EmployeeSwapRequestCard | EmployeeCalloutRequestCard;

export type EmployeeRequestsResponse = {
  incoming: EmployeeRequestCard[];
  outgoing: EmployeeRequestCard[];
};

export async function getEmployeeRequests(viewerId: string): Promise<EmployeeRequestsResponse> {
  const res = await fetch(
    `${API_BASE}/employee/requests?viewer_id=${encodeURIComponent(viewerId)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to retrieve Employee Requests');
  }

  return await res.json();
}
