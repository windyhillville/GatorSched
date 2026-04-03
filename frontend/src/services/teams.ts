import { API_BASE } from './apiConfig';

export type TeamMemberSchedule = {
  id: string;
  day: string;
  timeRange: string;
};

export type TeamMemberCard = {
  id: string;
  name: string;
  role: string;
  color: string | null;
  avatarUrl: string | null;
  totalHours: number;
  schedule: TeamMemberSchedule[];
};

export type TeamGroup = {
  role: string;
  members: TeamMemberCard[];
};

export async function getRoster(date: string): Promise<TeamGroup[]> {
  const res = await fetch(`${API_BASE}/teams?date=${encodeURIComponent(date)}`);

  if (!res.ok) {
    throw new Error('Failed to retrieve roster');
  }

  const data = await res.json();

  return data.groups;
}
