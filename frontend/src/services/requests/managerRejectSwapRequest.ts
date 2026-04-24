import { API_BASE } from '../apiConfig';

export type RejectSwapResponse = {
  success: boolean;
};

export async function managerRejectSwapRequest(requestId: string): Promise<RejectSwapResponse> {
  const res = await fetch(`${API_BASE}/manager/requests/${requestId}/reject`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to reject swap request');
  }

  return await res.json();
}
