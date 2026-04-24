import { Colors } from '@/styles';
import { Button, DateNavigator, ShiftDurationBar } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';

type UnscheduledDayCardProps = {
  dateLabel: string;
  isToday: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
};

export function UnscheduledDayCard({
  dateLabel,
  isToday,
  onPreviousDay,
  onNextDay,
}: UnscheduledDayCardProps) {
  return (
    <View style={styles.container}>
      <DateNavigator
        label={isToday ? 'Today' : dateLabel}
        onPrevious={onPreviousDay}
        onNext={onNextDay}
      />
      <View style={[styles.cardContainer, { borderColor: Colors.buttonDefaultBorder }]}>
        <ShiftDurationBar fromTime={''} toTime={''} longLabel={''} isToday={false} barColor={''} />
        <View style={{ position: 'absolute', top: 48 }}>
          <Text style={{ fontSize: 20 }}>No Shift Scheduled</Text>
        </View>
      </View>
      <Text style={styles.totalHours}>0 Hrs</Text>

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
    borderWidth: 0,
    paddingVertical: 20,
    // gap: 20,
    alignItems: 'center',
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
    opacity: 0,
  },
  buttonWrapper: {
    flex: 1,
    maxWidth: 170,
  },
});
