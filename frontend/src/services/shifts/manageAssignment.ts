import { API_BASE } from '../apiConfig';

export type ManageAssignmentRequest = {
  employeeIds: string[];
};

export type ManageAssignmentResponse = {
  success: boolean;
};

export async function manageAssignment(
  payload: ManageAssignmentRequest,
  shiftId: string,
): Promise<ManageAssignmentResponse> {
  const res = await fetch(`${API_BASE}/manager/shifts/${shiftId}/assignments`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to edit Assignment');
  }

  return res.json();
}
