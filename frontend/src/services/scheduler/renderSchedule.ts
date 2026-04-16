import { API_BASE } from '../apiConfig';
import { GenerateScheduleResponse } from './scheduler';

export async function renderSchedule(weekStart: string): Promise<GenerateScheduleResponse> {
  const res = await fetch(
    `${API_BASE}/scheduler/render?week_start=${encodeURIComponent(weekStart)}`,
  );

  if (!res.ok) {
    throw new Error('Failed to render scheduler');
  }

  return await res.json();
}
