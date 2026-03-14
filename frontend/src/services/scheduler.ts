import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
const API_BASE = `http://${HOST}:8000/api/v1`;

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
