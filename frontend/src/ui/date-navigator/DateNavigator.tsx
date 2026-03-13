import { StyleSheet, Text, View } from 'react-native';
import { Chevron } from '../chevron';

type DateNavigatorProps = {
  label: string;
  subLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  // disabledPrevious?: boolean;
  // disablednext?: boolean;
};

export function DateNavigator({ label, subLabel, onPrevious, onNext }: DateNavigatorProps) {
  const header = subLabel ? (
    <View style={styles.headerContainer}>
      <Text>{subLabel}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  ) : (
    <Text style={styles.labelText}>{label}</Text>
  );
  return (
    <View style={styles.container}>
      <Chevron direction="left" onPress={onPrevious} />
      {header}
      <Chevron direction="right" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 17,
  },
});
