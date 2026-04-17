import { StyleSheet, Text, View } from 'react-native';
import { SkinnyChevron } from '../chevron';

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
      <View style={{ width: 80, alignItems: 'center' }}>
        <SkinnyChevron direction="left" onPress={onPrevious} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>{header}</View>
      <View style={{ width: 80, alignItems: 'center' }}>
        <SkinnyChevron direction="right" onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // gap: 64,
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
