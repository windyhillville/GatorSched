import { PersonData, RequestStatus, ShiftData } from '@/features/types';
import { Button } from '@/ui';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ShiftSummary } from './ShiftSummary';
import { getStatusMessage, SwapRequestPurpose } from './utils/decision';

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
  const statusMessage = getStatusMessage(purpose, status, 'swap');
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
