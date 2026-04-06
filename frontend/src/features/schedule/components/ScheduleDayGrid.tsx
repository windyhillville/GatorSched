import { Pressable, StyleSheet, View } from 'react-native';
// import { DayIcon } from '../day-icon';
import { ScheduleDayCell } from './ScheduleDayCell';

export type DayItem = {
  key: string;
  label: string;
  timeRange: string;
};
type ScheduleDayGridProps = {
  days: DayItem[];
  size?: 'small' | 'large';
  barColor: string;
  selectedKey?: string;
  onDayPress?: (day: DayItem) => void;
};

export function ScheduleDayGrid({
  days,
  size = 'small',
  barColor,
  selectedKey,
  onDayPress,
}: ScheduleDayGridProps) {
  const firstRow = days.slice(0, 4);
  const secondRow = days.slice(4);
  const hasSecondRow = days.length > 4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((d) => (
          <Pressable key={d.key} onPress={() => onDayPress?.(d)}>
            <ScheduleDayCell
              day={d.label}
              timeRange={d.timeRange}
              size={size}
              barColor={barColor}
            />
          </Pressable>
        ))}
      </View>
      {hasSecondRow && (
        <View style={styles.row}>
          {secondRow.map((d) => (
            <Pressable key={d.key} onPress={() => onDayPress?.(d)}>
              <ScheduleDayCell
                day={d.label}
                timeRange={d.timeRange}
                size={size}
                barColor={barColor}
              />
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
