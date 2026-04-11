import { PersonData, ShiftData } from '@/features/types';
import { Button } from '@/ui';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ShiftSummary } from './ShiftSummary';

export type SwapRequestPurpose = 'swap-in' | 'swap-out' | 'manager-approval';

type SwapRequestDetailsProps = {
  purpose: SwapRequestPurpose;
  fromUser: PersonData;
  toUser: PersonData;
  fromShift: ShiftData;
  toShift: ShiftData;
};

function SwapRequestDetails({
  purpose,
  fromUser,
  toUser,
  fromShift,
  toShift,
}: SwapRequestDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.multishiftWrapper}>
        <ShiftSummary user={fromUser} shift={fromShift} />

        <View style={styles.multishiftSpacer} />

        <ShiftSummary user={toUser} shift={toShift} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          {purpose === 'swap-in' ? (
            <>
              <Button title="Accept" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Decline" onPress={() => {}} shape="rounded" color="reject" />
            </>
          ) : purpose === 'manager-approval' ? (
            <>
              <Button title="Approve" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Reject" onPress={() => {}} shape="rounded" color="reject" />
            </>
          ) : (
            <>
              <Button title="Cancel" onPress={() => {}} shape="rounded" color="reject" />
            </>
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
});
