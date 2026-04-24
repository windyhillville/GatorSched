import { API_BASE } from '../apiConfig';

export type ScheduledShift = {
  employeeId: string;
  employeeName: string;
  startLabel: string;
  endLabel: string;
  color: string;
};

export type RoleGroup = {
  role: string;
  shifts: ScheduledShift[];
};

export type DaySchedule = {
  date: Date;
  dayLabel: string;
  groups: RoleGroup[];
};

export type GenerateScheduleResponse = {
  days: DaySchedule[];
};

export async function generateSchedule(date: string): Promise<GenerateScheduleResponse> {
  const res = await fetch(`${API_BASE}/scheduler/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ week_start: date }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate schedule');
  }

  return await res.json();
}
