import { TeamMemberSchedule } from '@/services';
import { Button, DayGrid, DayItem } from '@/ui';
import { Platform, StyleSheet, Text, View } from 'react-native';

// const dummyDays: DayItem[] = [
//   { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
//   { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
//   { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
//   { key: 'wed', label: 'We', timeRange: '9 AM - 5 PM' },
//   { key: 'thur', label: 'Th', timeRange: '9 AM - 5 PM' },
//   { key: 'fri', label: 'Fr', timeRange: '6 PM - 2 AM' },
//   { key: 'sat', label: 'Sa', timeRange: '12 PM - 8 PM' },
// ];

type ScheduleInfoDetailsProps = {
  totalHours: number;
  weeklySchedule: TeamMemberSchedule[];
  // onViewSchedule: () => void;
  // onSelectDay: () => void;
};

function getDayLabelFromIsoDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return labels[date.getDay()];
}

function toDayItems(schedule: TeamMemberSchedule[]): DayItem[] {
  return schedule.map((item) => ({
    key: item.id,
    label: getDayLabelFromIsoDate(item.day),
    timeRange: item.timeRange,
  }));
}

export function ScheduleInfoDetails({
  totalHours,
  weeklySchedule,
  // onViewSchedule,
  // onSelectDay,
}: ScheduleInfoDetailsProps) {
  const formattedHours = Number.isInteger(totalHours) ? `${totalHours}` : totalHours.toFixed(1);
  return (
    <View style={styles.container}>
      <View style={styles.dayGridWrapper}>
        <DayGrid
          days={toDayItems(weeklySchedule)}
          size="small"
          onDayPress={(d) => console.log(d)}
        />
      </View>
      <Text style={styles.totalHours}>{formattedHours} Hrs</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button title="View Full Schedule" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    gap: 32,
  },
  // expandedContainer: {
  //   width: '100%',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   marginTop: 50,
  //   marginBottom: 20,
  //   gap: 50,
  // },
  dayGridWrapper: {
    flexDirection: 'column',
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
    maxWidth: 320,
    gap: 10,
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
