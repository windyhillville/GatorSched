import { Pressable, StyleSheet, View } from 'react-native';
import { DayIcon } from '../day-icon';

export type DayItem = {
  key: string;
  label: string;
  timeRange: string;
};
type DayGridProps = {
  days: DayItem[];
  selectedDay?: string;
  size?: 'small' | 'medium' | 'large';
  showTime?: boolean;
  onDayPress?: (dayKey: string) => void;
};

export function DayGrid({
  days,
  selectedDay,
  size = 'small',
  showTime = true,
  onDayPress,
}: DayGridProps) {
  const firstRow = days.slice(0, 4);
  const secondRow = days.slice(4);
  const hasSecondRow = days.length > 4;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((d) => (
          <Pressable key={d.key} onPress={() => onDayPress?.(d.key)}>
            <DayIcon
              day={d.label}
              timeRange={d.timeRange}
              size={size}
              showTime={showTime}
              selected={d.key === selectedDay}
            />
          </Pressable>
        ))}
      </View>
      {hasSecondRow && (
        <View style={styles.row}>
          {secondRow.map((d) => (
            <Pressable key={d.key} onPress={() => onDayPress?.(d.key)}>
              <DayIcon
                day={d.label}
                timeRange={d.timeRange}
                size={size}
                showTime={showTime}
                selected={d.key === selectedDay}
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
