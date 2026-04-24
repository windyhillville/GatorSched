import { API_BASE } from '../apiConfig';

export type CreateEmployeeRequest = {
  name: string;
  email: string;
  password: string;
  phone: string | null;
  avatarUrl: string | null;
  roleName: string;
};

export type CreateEmployeeResponse = {
  success: boolean;
};

export async function createEmployeeAccount(
  payload: CreateEmployeeRequest,
): Promise<CreateEmployeeResponse> {
  const res = await fetch(`${API_BASE}/auth/create-employee-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create employee account');
  }

  return await res.json();
}
