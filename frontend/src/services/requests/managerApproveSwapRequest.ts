import { API_BASE } from '../apiConfig';

export type ApproveSwapResponse = {
  success: boolean;
};

export async function managerApproveSwapRequest(requestId: string): Promise<ApproveSwapResponse> {
  const res = await fetch(`${API_BASE}/manager/requests/${requestId}/approve`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to approve swap request');
  }

  return await res.json();
}
