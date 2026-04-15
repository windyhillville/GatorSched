import { TimeValue } from '@/ui';

export type StaffingInformation = {
  staffingRequirement: number;
  underStaffedAmount: number;
  numberOfAssignments: number;
};

export type ShiftInformation = {
  id: string;
  dayKey: string;
  shortDayLabel: string;
  longDayLabel: string;
  startTime: TimeValue;
  endTime: TimeValue;
  staffingRequirement: string;
  roleId: string;
  roleName: string;
  roleColor: string;
};
