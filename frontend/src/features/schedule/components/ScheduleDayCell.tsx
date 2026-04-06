import { Colors } from '@/styles';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

type ScheduleDayCellProps = {
  day: string;
  timeRange: string;
  size?: 'small' | 'large';
  barColor: string;
  showTime?: boolean;
  isToday?: boolean;
  expanded?: boolean;
};

export function ScheduleDayCell({
  day,
  timeRange,
  size = 'small',
  barColor,
  showTime = true,
  isToday,
  expanded,
}: ScheduleDayCellProps) {
  return (
    <Animated.View style={styles.container}>
      <View style={[styles.icon, styles[`${size}Icon`]]}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      {showTime && <Text style={styles.timeText}>{timeRange}</Text>}
      {/* {expanded && <ScheduleDaySummaryCard barColor={barColor} />} */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.buttonDefaultBorder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon: {
    // Original value was 47
    minWidth: 50,
    minHeight: 50,
  },
  largeIcon: {
    minWidth: 77,
    minHeight: 77,
  },
  dayText: {
    fontSize: 17,
  },
  timeText: {
    fontSize: 12,
  },
});
