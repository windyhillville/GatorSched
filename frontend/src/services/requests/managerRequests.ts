import { API_BASE } from '../apiConfig';
import {
  EmployeeRequestStatus,
  ManagerRequestStatus,
  RequestPerson,
  RequestShiftSummary,
} from './types';

export type ManagerRequestCardBase = {
  id: string;
  employee_status: EmployeeRequestStatus;
  manager_status: ManagerRequestStatus;
};

export type ManagerSwapRequestCard = ManagerRequestCardBase & {
  type: 'swap';
  requester: RequestPerson;
  coverEmployee: RequestPerson;
  requesterShift: RequestShiftSummary;
  coverShift: RequestShiftSummary;
  impactSummary: string | null;
};

export type ManagerRequestCard = ManagerSwapRequestCard;

export type ManagerRequestCardGroup = {
  role: string;
  requests: ManagerRequestCard[];
};

export async function getManagerRequests(): Promise<ManagerRequestCardGroup[]> {
  const res = await fetch(`${API_BASE}/manager/requests`);

  if (!res.ok) {
    throw new Error('Failed to retrieve Manager Requests');
  }

  const data = await res.json();

  return data.groups;
}
