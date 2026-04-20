import { API_BASE } from '../apiConfig';

export type AcceptSwapResponse = {
  success: boolean;
};

export async function employeeAcceptSwapRequest(requestId: string): Promise<AcceptSwapResponse> {
  const res = await fetch(`${API_BASE}/employee/requests/${requestId}/accept`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to accept swap request');
  }

  return await res.json();
}
