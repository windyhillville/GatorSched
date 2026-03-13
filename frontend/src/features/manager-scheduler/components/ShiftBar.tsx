import { DurationBar } from '@/ui';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type ShiftBarProps = {
  startLabel: string;
  endLabel: string;
  color: string;
  style?: StyleProp<ViewStyle>;
};

export function ShiftBar({ startLabel, endLabel, color, style }: ShiftBarProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.topRow}>
        <Text style={styles.labelText}>{startLabel}</Text>
        <Text style={styles.labelText}>{endLabel}</Text>
      </View>
      <DurationBar color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
    // maxWidth: 220,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 14,
  },
});
