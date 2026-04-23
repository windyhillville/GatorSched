import { ShiftModalShell } from '@/features/shifts/ShiftModalShell';
import { getWeekStart } from '@/features/utils';
import { useAuth, useToday } from '@/hooks';
import {
  CreateSwapRequestPayload,
  EmployeeSwapRequestInfoResponse,
  getSwapRequestInfo,
} from '@/services/requests';
import { ExitButton, Header } from '@/ui';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { CreateSwapRequestForm } from './CreateSwapRequestForm';
import { RequestTypeModalNavigator } from './RequestTypeModalNavigator';
import { RequestOption } from './types';

type RequestModalPhase = 'picker' | 'swap-shift' | 'swap-teammate' | 'callout' | 'pickup';

type EmployeeRequestOptionsProps = {
  isCreateRequestButtonPressed: boolean;
  onExit: () => void;
  onCreateSwapRequest: (payload: CreateSwapRequestPayload) => void;
};

export function EmployeeRequestOptions({
  isCreateRequestButtonPressed,
  onExit,
  onCreateSwapRequest,
}: EmployeeRequestOptionsProps) {
  const [requestType, setRequestType] = useState<RequestOption | null>(null);
  const [swapRequestInfo, setSwapRequestInfo] = useState<EmployeeSwapRequestInfoResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));

  const { user } = useAuth();
  const currentUserId = user?.id;

  async function handleSelectRequestType(requestType: RequestOption) {
    if (!currentUserId) return;

    setRequestType(requestType);
    try {
      setIsLoading(true);
      setError(null);

      if (requestType === 'swap') {
        const data = await getSwapRequestInfo(currentUserId, currentWeekStart);
        setSwapRequestInfo(data);
      } else if (requestType === 'callout') {
      } else {
      }
    } catch (err) {
      setError(
        requestType === 'swap'
          ? 'Failed to render swap request'
          : requestType === 'callout'
            ? 'Failed to render callout request'
            : 'Failed to render pickup request',
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreateSwap() {}

  const modalHeight = requestType === null ? 300 : requestType === 'swap' ? 500 : '45%';
  // style={{ minHeight: modalHeight }
  return (
    <ShiftModalShell isActivated={isCreateRequestButtonPressed}>
      <View style={styles.exitButtonWrapper}>
        <View style={styles.exitButtonInnerContainer}>
          <ExitButton size={20} onExit={onExit} />
        </View>
      </View>

      {requestType === 'swap' && swapRequestInfo ? (
        <CreateSwapRequestForm
          requesterShifts={swapRequestInfo.requesterShifts.map((req) => ({
            key: req.assignmentId,
            label: req.dayLabel,
            timeRange: req.timeRange,
          }))}
          teammateShiftGroups={swapRequestInfo.eligibleTeammatesShifts.map((group) => ({
            teammateId: group.teammateId,
            shifts: group.shifts.map((shift) => ({
              key: shift.assignmentId,
              label: shift.dayLabel,
              timeRange: shift.timeRange,
            })),
          }))}
          eligibleTeammates={swapRequestInfo.eligibleTeammates.map((teammate) => ({
            id: teammate.id,
            name: teammate.name,
            avatarUrl: teammate.avatarUrl,
            color: teammate.color,
          }))}
          onCreateSwap={onCreateSwapRequest}
        />
      ) : requestType === 'callout' ? (
        <View></View>
      ) : requestType === 'pickup' ? (
        <View>
          <Text>Hello</Text>
        </View>
      ) : (
        <>
          <Header title="Select a Request Type" type="medium" />
          <RequestTypeModalNavigator onSelectRequestType={handleSelectRequestType} />
        </>
      )}
    </ShiftModalShell>
  );
}

const styles = StyleSheet.create({
  exitButtonWrapper: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        // paddingTop: 10,
        left: 340,
      },
      android: {
        // paddingTop: 12,
        left: 330,
      },
    }),
  },
  exitButtonInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderRadius: 50,
    borderColor: '#E33333',
  },
  navContainer: {
    flex: 1,
    marginTop: 32,
    backgroundColor: 'blue',
  },
});
