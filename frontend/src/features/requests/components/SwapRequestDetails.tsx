import { Button } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';
import { PersonData } from '../../types';
import { ShiftSummary } from './ShiftSummary';

export type SwapRequestPurpose = 'swap-in' | 'swap-out';

type SwapRequestDetailsProps = {
  purpose: SwapRequestPurpose;
  fromUser: PersonData;
  toUser: PersonData;
};

export function SwapRequestDetails({ purpose, fromUser, toUser }: SwapRequestDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.multishiftWrapper}>
        <ShiftSummary user={fromUser} />

        <View style={styles.multishiftSpacer} />

        <ShiftSummary user={toUser} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          {purpose === 'swap-in' ? (
            <>
              <Button title="Accept" onPress={() => {}} shape="rounded" color="accept" />
              <Button title="Decline" onPress={() => {}} shape="rounded" color="reject" />
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
