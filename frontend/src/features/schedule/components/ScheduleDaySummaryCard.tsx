import { EmployeeShiftSummary } from '@/services';
import { Colors } from '@/styles';
import { Button, DateNavigator, ShiftDurationBar } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';

type ScheduleDaySummaryCardProps = {
  summary: EmployeeShiftSummary;
  dateLabel: string;
  barColor: string;
  isToday: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
};

export function ScheduleDaySummaryCard({
  summary,
  dateLabel,
  barColor,
  isToday,
  onPreviousDay,
  onNextDay,
}: ScheduleDaySummaryCardProps) {
  return (
    <View style={styles.container}>
      {/* <Chevron direction="left" /> */}

      {/* <View style={styles.summaryContent}> */}
      <DateNavigator label={dateLabel} onPrevious={onPreviousDay} onNext={onNextDay} />

      <View style={[styles.cardContainer, { borderColor: Colors.buttonDefaultBorder }]}>
        <ShiftDurationBar
          fromTime={summary.fromTime}
          toTime={summary.toTime}
          longLabel={summary.longLabel}
          isToday={isToday}
          barColor={barColor}
        />
        {/* <View style={styles.topRow}>
          <Text style={styles.cardText}>{summary.fromTime}</Text>
          <Text style={styles.cardText}>{isToday ? 'Today' : summary.longLabel}</Text>
          <Text style={styles.cardText}>{summary.toTime}</Text>
        </View>

        <View style={styles.barContainer}>
          <DurationBar color={barColor} />
        </View> */}
      </View>

      <Text style={styles.totalHours}>{`${summary.shiftHours} Hrs`}</Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="Swap Out" disabled={true} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Request Call Out" disabled={true} />
        </View>
      </View>
      {/* </View> */}
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
    // gap: 20,
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  barContainer: {
    width: '85%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
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
