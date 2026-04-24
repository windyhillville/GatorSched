import { API_BASE } from '../apiConfig';

export type AccessLevel = 'employee' | 'manager';

export type UserCredentials = {
  id: string;
  name: string;
  accessLevel: AccessLevel;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: UserCredentials;
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  return await res.json();
}
