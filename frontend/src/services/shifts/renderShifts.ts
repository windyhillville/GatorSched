import { API_BASE } from '../apiConfig';
import { AssignmentInfo, RoleInfo, TimeRange } from './types';

// export type AssignmentInfo = {
//   assignmentId: string | null;
//   employeeId: string;
//   employeeName: string;
//   avatarUrl: string | null;
//   color: string;
// };

// export type TimeRange = {
//   minute: string;
//   hour: string;
//   period: 'AM' | 'PM';
// };

export type ShiftItem = {
  id: string;
  role: RoleInfo;
  //   roleId: string;
  //   roleColor: string;
  //   roleName: string;
  fromTime: string;
  toTime: string;
  dayKey: string;
  shortDayLabel: string;
  longDayLabel: string;
  startTime: TimeRange;
  endTime: TimeRange;
  staffingRequirement: number;
  assignedEmployees: AssignmentInfo[];
  availableEmployees: AssignmentInfo[];
  underStaffedAmount: number;
};

export type ShiftsGroup = {
  role: string;
  shifts: ShiftItem[];
};

export type ShiftsResponse = {
  weekLabel: string;
  groups: ShiftsGroup[];
  roles: RoleInfo[];
};

export async function getShifts(weekStart: string): Promise<ShiftsResponse> {
  const res = await fetch(
    `${API_BASE}/manager/shifts/render?week_start=${encodeURIComponent(weekStart)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to retrieve Shifts');
  }

  return res.json();
}
