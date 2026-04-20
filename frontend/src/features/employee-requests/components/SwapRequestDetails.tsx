import { PersonData, RequestStatus, ShiftData } from '@/features/types';
import { Button } from '@/ui';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ShiftSummary } from './ShiftSummary';

export type SwapRequestPurpose = 'swap-in' | 'swap-out' | 'manager-approval';

type SwapRequestDetailsProps = {
  purpose: SwapRequestPurpose;
  fromUser: PersonData;
  toUser: PersonData;
  fromShift: ShiftData;
  toShift: ShiftData;
  status: RequestStatus;
  onAccept?: () => void;
  onDecline?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
};

function getStatusMessage(
  purpose: SwapRequestPurpose,

  status: RequestStatus,
): { text: string; tone: 'neutral' | 'accept' | 'reject' } | null {
  const { employeeStatus, managerStatus } = status;

  if (purpose === 'swap-in') {
    if (managerStatus === 'approved') {
      return { text: 'This swap request was approved.', tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: 'This swap request was rejected by the manager.', tone: 'reject' };
    }

    if (employeeStatus === 'accepted') {
      return {
        text: 'You accepted this swap request. Waiting for manager approval.',
        tone: 'neutral',
      };
    }

    if (employeeStatus === 'rejected') {
      return { text: 'You declined this swap request.', tone: 'reject' };
    }

    return null;
  }

  if (purpose === 'swap-out') {
    if (managerStatus === 'approved') {
      return { text: 'Your swap request was approved.', tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: 'Your swap request was rejected by the manager.', tone: 'reject' };
    }

    if (employeeStatus === 'accepted') {
      return { text: 'Your teammate accepted. Waiting for manager approval.', tone: 'neutral' };
    }

    if (employeeStatus === 'rejected') {
      return { text: 'Your teammate declined this swap request.', tone: 'reject' };
    }

    return null;
  }

  if (purpose === 'manager-approval') {
    if (managerStatus === 'approved') {
      return { text: 'You approved this swap request.', tone: 'accept' };
    }

    if (managerStatus === 'rejected') {
      return { text: 'You rejected this swap request.', tone: 'reject' };
    }

    return null;
  }

  return null;
}

function SwapRequestDetails({
  purpose,
  fromUser,
  toUser,
  fromShift,
  toShift,
  status,
  onAccept,
  onDecline,
  onApprove,
  onReject,
  onCancel,
}: SwapRequestDetailsProps) {
  const statusMessage = getStatusMessage(purpose, status);
  return (
    <View style={styles.container}>
      <View style={styles.multishiftWrapper}>
        <ShiftSummary user={fromUser} shift={fromShift} />

        <View style={styles.multishiftSpacer} />

        <ShiftSummary user={toUser} shift={toShift} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          {statusMessage ? (
            <View
              style={[
                styles.statusBanner,

                statusMessage.tone === 'accept'
                  ? styles.statusBannerAccept
                  : statusMessage.tone === 'reject'
                    ? styles.statusBannerReject
                    : styles.statusBannerNeutral,
              ]}
            >
              <Text
                style={[
                  styles.statusText,

                  statusMessage.tone === 'accept'
                    ? styles.statusTextAccept
                    : statusMessage.tone === 'reject'
                      ? styles.statusTextReject
                      : styles.statusTextNeutral,
                ]}
              >
                {statusMessage.text}
              </Text>
            </View>
          ) : purpose === 'swap-in' ? (
            <>
              <Button title="Accept" onPress={onAccept} shape="rounded" color="accept" />

              <Button title="Decline" onPress={onDecline} shape="rounded" color="reject" />
            </>
          ) : purpose === 'manager-approval' ? (
            <>
              <Button title="Approve" onPress={onApprove} shape="rounded" color="accept" />

              <Button title="Reject" onPress={onReject} shape="rounded" color="reject" />
            </>
          ) : (
            <Button title="Cancel" onPress={onCancel} shape="rounded" color="reject" />
          )}
        </View>
      </View>
    </View>
  );
}

const MemoiozedSwapRequestDetails = React.memo(SwapRequestDetails);

export { MemoiozedSwapRequestDetails as SwapRequestDetails };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    gap: 32,
  },
  multishiftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multishiftSpacer: {
    flex: 0.8,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 10,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
  statusBanner: {
    width: '100%',

    borderRadius: 12,

    borderWidth: 1,

    paddingVertical: 14,

    paddingHorizontal: 16,

    alignItems: 'center',

    justifyContent: 'center',
  },

  statusBannerNeutral: {
    backgroundColor: '#F4F5F7',

    borderColor: '#D0D5DD',
  },

  statusBannerAccept: {
    backgroundColor: '#ECFDF3',

    borderColor: '#ABEFC6',
  },

  statusBannerReject: {
    backgroundColor: '#FEF3F2',

    borderColor: '#FDA29B',
  },

  statusText: {
    fontSize: 15,

    fontWeight: '600',

    textAlign: 'center',
  },

  statusTextNeutral: {
    color: '#344054',
  },

  statusTextAccept: {
    color: '#027A48',
  },

  statusTextReject: {
    color: '#B42318',
  },
});
