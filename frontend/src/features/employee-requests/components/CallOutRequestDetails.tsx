import { PersonData, RequestStatus, ShiftData } from '@/features/types';
import { Button } from '@/ui';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ShiftSummary } from './ShiftSummary';
import { getStatusMessage } from './utils/decision';

export type CallOutRequestPurpose = 'callout-in' | 'callout-out' | 'manager-approval';

type CallOutRequestDetailsProps = {
  purpose: CallOutRequestPurpose;
  user: PersonData;
  shift: ShiftData;
  status: RequestStatus;
  onAccept?: () => void;
  onDecline?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
};

export function CallOutRequestDetails({
  purpose,
  user,
  shift,
  status,
  onAccept,
  onDecline,
  onApprove,
  onReject,
  onCancel,
}: CallOutRequestDetailsProps) {
  const statusMessage = getStatusMessage(purpose, status, 'callout');
  return (
    <View style={styles.container}>
      <ShiftSummary user={user} shift={shift} textStyle={{ fontSize: 22 }} />
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
          ) : purpose === 'callout-in' ? (
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
        {/* <View style={styles.buttonContainer}>
          {purpose === 'callout-in' ? (
            <>
              <Button title="Accept" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Decline" onPress={() => {}} shape="rounded" color="reject" />
            </>
          ) : (
            <>
              <Button title="Cancel" onPress={() => {}} shape="rounded" color="reject" />
            </>
          )}
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    gap: 32,
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
