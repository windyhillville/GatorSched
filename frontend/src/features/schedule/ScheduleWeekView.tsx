import { EmployeeShift } from '@/services';
import { DateNavigator, DayGrid } from '@/ui';
import { Platform, StyleSheet, Text, View } from 'react-native';

type ScheduleWeekViewProps = {
  weekLabel: string;
  employeeShifts: EmployeeShift[];
  totalHours: number;

  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onDayPress: (dayKey: string) => void;
};

export function ScheduleWeekView({
  weekLabel,
  employeeShifts,
  totalHours,
  onPreviousWeek,
  onNextWeek,
  onDayPress,
}: ScheduleWeekViewProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.content}>
        <View style={styles.spacer} />

        <DateNavigator label={weekLabel} onPrevious={onPreviousWeek} onNext={onNextWeek} />

        <DayGrid
          days={employeeShifts.map((shift) => ({
            key: shift.key,
            label: shift.shortLabel,
            timeRange: shift.timeRange,
          }))}
          onDayPress={onDayPress}
        />

        <Text style={styles.totalHours}>{`${totalHours} Hrs`}</Text>

        <View style={styles.spacer} />

        {/* <View style={styles.buttonWrapper}>
          <View style={styles.buttonContainer}>
            <Button title="View Full Schedule" onPress={onViewFullSchedule} />
          </View>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 50,
  },
  spacer: {
    flex: 1,
  },
  totalHours: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 340,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
});
