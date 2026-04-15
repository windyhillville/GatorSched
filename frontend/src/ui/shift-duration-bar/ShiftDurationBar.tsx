import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { DurationBar } from './DurationBar';

type ShiftDurationBarProps = {
  fromTime: string;
  toTime: string;
  longLabel: string;
  isToday?: boolean;
  barColor: string;
  barHeight?: number;
  compact?: boolean;
  dayTextStyle?: StyleProp<TextStyle>;
};

export function ShiftDurationBar({
  fromTime,
  toTime,
  longLabel,
  isToday,
  barColor,
  barHeight,
  compact = false,
  dayTextStyle,
}: ShiftDurationBarProps) {
  return (
    // <View style={styles.cardContainer}>

    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={[styles.topRow, compact && styles.compactTopRow]}>
        <Text style={[styles.cardText, compact && styles.compactCardText]}>{fromTime}</Text>
        <Text style={[styles.cardText, dayTextStyle]}>{isToday ? 'Today' : longLabel}</Text>
        <Text style={[styles.cardText, compact && styles.compactCardText]}>{toTime}</Text>
      </View>

      <View style={[styles.barContainer, compact && styles.compactBarContainer]}>
        <DurationBar color={barColor} height={barHeight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  compactContainer: {
    gap: 8,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardText: {
    fontSize: 16,
  },
  barContainer: {
    width: '85%',
    alignItems: 'center',
  },
  compactTopRow: {
    // maybe slightly tighter layout if needed
    alignItems: 'center',
    width: '99%',
  },

  compactCardText: {
    fontSize: 16,
    verticalAlign: 'middle',
    alignContent: 'center',
  },

  compactBarContainer: {
    width: '80%',
  },
});
