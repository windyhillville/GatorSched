import { DayGrid, DayItem } from '@/ui';
import { StyleSheet, View } from 'react-native';

type AvailabilityWeekViewProps = {
  days: DayItem[];
  selectedDayKey?: string;
  onDayPress: (day: DayItem) => void;
};
export function AvailabilityWeekView({
  days,
  selectedDayKey,
  onDayPress,
}: AvailabilityWeekViewProps) {
  return (
    <View style={styles.content}>
      <View style={styles.spacer} />

      <DayGrid days={days} selectedKey={selectedDayKey} onDayPress={onDayPress} size="large" />

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
