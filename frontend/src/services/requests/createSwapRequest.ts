import { API_BASE } from '../apiConfig';

export type CreateSwapRequestPayload = {
  requesterAssignmentId: string;
  coverAssignmentId: string;
};

export type CreateSwapResponse = {
  success: boolean;
};

export async function createSwapRequest(
  payload: CreateSwapRequestPayload,
): Promise<CreateSwapResponse> {
  const res = await fetch(`${API_BASE}/employee/requests/swap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create swap request');
  }

  return await res.json();
}
