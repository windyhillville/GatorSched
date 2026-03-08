import { Colors } from '@/styles';
import { StyleSheet, Text, View } from 'react-native';

type DayIconProps = {
  day: string;
  timeRange: string;
  size?: 'small' | 'large';
  showTime?: boolean;
  isToday?: boolean;
};

export function DayIcon({
  day,
  timeRange,
  size = 'small',
  showTime = true,
  isToday,
}: DayIconProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, styles[`${size}Icon`]]}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      {showTime && <Text style={styles.timeText}>{timeRange}</Text>}
    </View>
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
    minWidth: 47,
    minHeight: 47,
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
