import { Colors } from '@/styles';
import { Button, DateNavigator } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';

type ScheduleDaySummaryCardProps = {
  dateLabel: string;
  dayLabel: string;
  fromTime: string;
  toTime: string;
  totalHours: number;
  barColor: string;
};

export function ScheduleDaySummaryCard({
  dateLabel,
  dayLabel,
  fromTime,
  toTime,
  totalHours,
  barColor,
}: ScheduleDaySummaryCardProps) {
  return (
    <View style={styles.container}>
      <DateNavigator label={dateLabel} />

      <View style={[styles.cardContainer, { borderColor: Colors.buttonDefaultBorder }]}>
        <View style={styles.topRow}>
          <Text style={styles.cardText}>{fromTime}</Text>
          <Text style={styles.cardText}>{dayLabel}</Text>
          <Text style={styles.cardText}>{toTime}</Text>
        </View>

        <View style={styles.barContainer}>
          <View style={[styles.durationBar, { backgroundColor: barColor }]} />
        </View>
      </View>

      <Text style={styles.totalHours}>{`${totalHours} Hrs`}</Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="Swap Out" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Request Call Out" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 30,
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  barContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  durationBar: {
    width: '85%',
    height: 40,
    borderRadius: 36,
  },
  totalHours: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
    maxWidth: 170,
  },
});
