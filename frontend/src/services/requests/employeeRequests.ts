import { API_BASE } from '../apiConfig';

import {
  EmployeeRequestStatus,
  ManagerRequestStatus,
  RequestPerson,
  RequestShiftSummary,
} from './types';

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

export type EmployeeCalloutRequestCard = EmployeeRequestCardBase & {
  type: 'callout';
  employee: RequestPerson;
  shift: RequestShiftSummary;
  reason: string | null;
};

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
