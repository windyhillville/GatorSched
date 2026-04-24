import { API_BASE } from '../apiConfig';

export type DeclineSwapResponse = {
  success: boolean;
};

export async function employeeDeclineSwapRequest(requestId: string): Promise<DeclineSwapResponse> {
  const res = await fetch(`${API_BASE}/employee/requests/${requestId}/decline`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to decline swap request');
  }

  return await res.json();
}
