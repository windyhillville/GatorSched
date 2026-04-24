import { Colors } from '@/styles';
import { StyleSheet, Text, View } from 'react-native';

type DayIconProps = {
  day: string;
  timeRange: string;
  size?: 'small' | 'medium' | 'large';
  showTime?: boolean;
  isToday?: boolean;
  selected?: boolean;
};

export function DayIcon({
  day,
  timeRange,
  size = 'small',
  showTime = true,
  isToday,
  selected,
}: DayIconProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, styles[`${size}Icon`], selected && styles.selectedIcon]}>
        <Text style={[styles.dayText, selected && styles.selectedDayText]}>{day}</Text>
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
    // Original value was 47
    minWidth: 50,
    minHeight: 50,
  },
  mediumIcon: {
    minWidth: 60,
    minHeight: 60,
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
  selectedIcon: {
    backgroundColor: Colors.buttonDefaultBorder,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
});
