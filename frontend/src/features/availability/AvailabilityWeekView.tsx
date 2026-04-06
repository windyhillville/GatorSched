import { DayGrid, DayItem } from '@/ui';
import { StyleSheet, View } from 'react-native';

type AvailabilityWeekViewProps = {
  days: DayItem[];
  onDayPress: (dayKey: string) => void;
};
export function AvailabilityWeekView({ days, onDayPress }: AvailabilityWeekViewProps) {
  return (
    <View style={styles.content}>
      <View style={styles.spacer} />

      <DayGrid days={days} onDayPress={onDayPress} size="large" />

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 50,
  },
  spacer: {
    flex: 1,
  },
});
