import { API_BASE } from '../apiConfig';

type ProfileScreenResponse = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  color: string;
  avatarUrl: string | null;
  role: string;
  maxWeeklyHours: number | null;
};

export async function getUserInfo(viewerId: string): Promise<ProfileScreenResponse> {
  const res = await fetch(`${API_BASE}/employee/profile?viewer_id=${encodeURIComponent(viewerId)}`);

  if (!res.ok) {
    throw new Error('Failed to retrieve user information');
  }

  return await res.json();
}
