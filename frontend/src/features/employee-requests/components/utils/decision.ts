import { RequestStatus } from '@/features/types';

export type SwapRequestPurpose = 'swap-in' | 'swap-out' | 'manager-approval';

export type CalloutRequestPurpose = 'callout-in' | 'callout-out' | 'manager-approval';

export function getStatusMessage(
  purpose: SwapRequestPurpose | CalloutRequestPurpose,
  status: RequestStatus,
  type?: 'swap' | 'callout',
): { text: string; tone: 'neutral' | 'accept' | 'reject' } | null {
  const { employeeStatus, managerStatus } = status;

  if (purpose === `${type}-in`) {
    if (managerStatus === 'approved') {
      return { text: `This ${type} request was approved.`, tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: `This ${type} request was rejected by the manager.`, tone: 'reject' };
    }

    if (employeeStatus === 'accepted') {
      return {
        text: `You accepted this ${type} request. Waiting for manager approval.`,
        tone: 'neutral',
      };
    }

    if (employeeStatus === 'rejected') {
      return { text: `You declined this ${type} request.`, tone: 'reject' };
    }

    return null;
  }

  if (purpose === `${type}-out`) {
    if (managerStatus === 'approved') {
      return { text: `Your ${type} request was approved.`, tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: `Your ${type} request was rejected by the manager.`, tone: 'reject' };
    }

    if (employeeStatus === 'accepted') {
      return { text: 'Your teammate accepted. Waiting for manager approval.', tone: 'neutral' };
    }

    if (employeeStatus === 'rejected') {
      return { text: `Your teammate declined this ${type} request.`, tone: 'reject' };
    }

    return null;
  }

  if (purpose === 'manager-approval') {
    if (managerStatus === 'approved') {
      return { text: `You approved this ${type} request.`, tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: `You rejected this ${type} request.`, tone: 'reject' };
    }

    return null;
  }

  return null;
}
