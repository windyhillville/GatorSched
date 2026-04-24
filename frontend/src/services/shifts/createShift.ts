import { API_BASE } from '../apiConfig';
import { EditedShift, TimeRange } from './types';

export type CreateShiftRequest = {
  date: string;
  startTime: TimeRange;
  endTime: TimeRange;
  staffingRequirement: number;
  roleId: string;
};

export type CreateShiftResponse = {
  shift: EditedShift;
};

export async function createShift(payload: CreateShiftRequest): Promise<CreateShiftResponse> {
  const res = await fetch(`${API_BASE}/manager/shifts/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to add Shift');
  }

  return res.json();
}
