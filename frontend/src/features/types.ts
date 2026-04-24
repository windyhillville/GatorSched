import { EmployeeRequestStatus, ManagerRequestStatus } from '@/services';

export type PersonData = {
  name: string;
  avatarUrl: string | null;
  color: string | null;
};

export type ShiftData = {
  day: string;
  timeRange: string;
};

export type RequestStatus = {
  employeeStatus: EmployeeRequestStatus;
  managerStatus: ManagerRequestStatus;
};
