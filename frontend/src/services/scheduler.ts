import { API_BASE } from './apiConfig';

export type ScheduledShift = {
  id: string;
  employeeName: string;
  startLabel: string;
  endLabel: string;
  color: string;
};

export type RoleGroup = {
  role: string;
  shifts: ScheduledShift[];
};

export async function generateSchedule(date: string): Promise<RoleGroup[]> {
  const res = await fetch(`${API_BASE}/scheduler/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate schedule');
  }

  const data = await res.json();

  return data.groups;
}
