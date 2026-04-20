import { Callout, Pickup, Swap } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';
import { RequestOption } from './types';

type RequestTypeModalNavigatorProps = {
  onSelectRequestType: (requestType: RequestOption) => void;
};

export function RequestTypeModalNavigator({ onSelectRequestType }: RequestTypeModalNavigatorProps) {
  return (
    <View style={styles.requestTypeWrapper}>
      <View style={styles.requestTypeContainer}>
        <Swap size={55} onPressSwap={() => onSelectRequestType('swap')} />
        <Text>Swap</Text>
      </View>
      <View style={styles.requestTypeContainer}>
        <Callout size={50} onPressCallout={() => onSelectRequestType('callout')} />
        <Text>Callout</Text>
      </View>
      <View style={styles.requestTypeContainer}>
        <Pickup size={53} onPressPickup={() => onSelectRequestType('pickup')} />
        <Text>Pickup</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestTypeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 12,
  },
  requestTypeContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    // backgroundColor: 'blue',
  },
});
