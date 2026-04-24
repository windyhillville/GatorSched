import { API_BASE } from '../apiConfig';
import { EditShiftRequest, EditedShift } from './types';

// export type EditShiftRequest = {
//   date: string;
//   startTime: TimeRange;
//   endTime: TimeRange;
//   staffingRequirement: number;
//   roleId: string;
// };

// export type EditedShift = {
//   id: string;
//   date: string;
//   dayKey: string;
//   shortDayLabel: string;
//   longDayLabel: string;
//   startTime: TimeRange;
//   endTime: TimeRange;
//   staffingRequirement: number;
//   roleId: string;
//   roleName: string;
//   roleColor: string;
//   fromTime: string;
//   toTime: string;
// };

export type EditShiftResponse = {
  shift: EditedShift;
};

export async function editShift(
  payload: EditShiftRequest,
  shiftId: string,
): Promise<EditShiftResponse> {
  const res = await fetch(`${API_BASE}/manager/shifts/${shiftId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to edit Shift');
  }

  return res.json();
}
