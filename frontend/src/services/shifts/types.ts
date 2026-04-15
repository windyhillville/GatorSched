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
