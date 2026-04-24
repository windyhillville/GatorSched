export type RoleInfo = {
  id: string;
  name: string;
  color: string;
};

export type AssignmentInfo = {
  assignmentId: string | null;
  employeeId: string;
  employeeName: string;
  avatarUrl: string | null;
  color: string;
};

export type TimeRange = {
  minute: string;
  hour: string;
  period: 'AM' | 'PM';
};

export type EditShiftRequest = {
  date: string;
  startTime: TimeRange;
  endTime: TimeRange;
  staffingRequirement: number;
  roleId: string;
};

export type EditedShift = {
  id: string;
  date: string;
  dayKey: string;
  shortDayLabel: string;
  longDayLabel: string;
  startTime: TimeRange;
  endTime: TimeRange;
  staffingRequirement: number;
  roleId: string;
  roleName: string;
  roleColor: string;
  fromTime: string;
  toTime: string;
};
