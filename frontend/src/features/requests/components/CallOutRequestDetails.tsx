import { Button } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';
import { PersonData } from '../../types';
import { ShiftSummary } from './ShiftSummary';

export type CallOutRequestPurpose = 'callout-in' | 'callout-out';

type CallOutRequestDetailsProps = {
  purpose: CallOutRequestPurpose;
  user: PersonData;
};

export function CallOutRequestDetails({ purpose, user }: CallOutRequestDetailsProps) {
  return (
    <View style={styles.container}>
      <ShiftSummary user={user} textStyle={{ fontSize: 22 }} />
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
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
