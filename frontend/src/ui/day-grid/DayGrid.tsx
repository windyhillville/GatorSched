import { Pressable, StyleSheet, View } from 'react-native';
import { DayIcon } from '../day-icon';

export type DayItem = {
  key: string;
  label: string;
  timeRange: string;
};
type DayGridProps = {
  days: DayItem[];
  size?: 'small' | 'large';
  selectedKey?: string;
  onDayPress?: (day: DayItem) => void;
};

export function DayGrid({ days, size = 'small', selectedKey, onDayPress }: DayGridProps) {
  const firstRow = days.slice(0, 4);
  const secondRow = days.slice(4);
  const hasSecondRow = days.length > 4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((d) => (
          <Pressable key={d.key} onPress={() => onDayPress?.(d)}>
            <DayIcon day={d.label} timeRange={d.timeRange} size={size} />
          </Pressable>
        ))}
      </View>
      {hasSecondRow && (
        <View style={styles.row}>
          {secondRow.map((d) => (
            <Pressable key={d.key} onPress={() => onDayPress?.(d)}>
              <DayIcon day={d.label} timeRange={d.timeRange} size={size} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
