import { API_BASE } from '../apiConfig';

export type CancelSwapResponse = {
  success: boolean;
};

export async function employeeCancelSwapRequest(requestId: string): Promise<CancelSwapResponse> {
  const res = await fetch(`${API_BASE}/employee/requests/${requestId}/cancel`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to cancel swap request');
  }

  return await res.json();
}
