export type RequestPerson = {
  id: string;
  name: string;
  avatarUrl: string | null;
  color: string;
};

export type RequestShiftSummary = {
  dayLabel: string;
  timeRange: string;
};

export type EmployeeRequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';
export type ManagerRequestStatus = 'not_sent' | 'pending' | 'approved' | 'rejected';
type RequestType = 'swap' | 'callout' | 'pickup';
