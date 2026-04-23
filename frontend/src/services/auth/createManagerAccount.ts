import { API_BASE } from '../apiConfig';

export type CreateManagerRequest = {
  name: string;
  email: string;
  password: string;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  roles: string[];
};

export type CreateManagerResponse = {
  success: boolean;
};

export async function createManagerAccount(
  payload: CreateManagerRequest,
): Promise<CreateManagerResponse> {
  const res = await fetch(`${API_BASE}/auth/create-manager-account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create manager account');
  }

  return await res.json();
}
