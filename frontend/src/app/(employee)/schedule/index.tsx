import { ScheduleWeekView } from '@/features';
import { Button, DayItem, Header, Screen } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';

const fullWeek: DayItem[] = [
  { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
  { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
  { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
  { key: 'wed', label: 'We', timeRange: '9 AM - 5 PM' },
  { key: 'thur', label: 'Th', timeRange: '9 AM - 5 PM' },
  { key: 'fri', label: 'Fr', timeRange: '6 PM - 2 AM' },
  { key: 'sat', label: 'Sa', timeRange: '12 PM - 8 PM' },
];

// const halfWeek: DayItem[] = [
//   { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
//   { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
//   { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
// ];

export default function Schedule() {
  const handlePrevWeek = () => {};

  const handleNextWeek = () => {};

  const handleDayPress = () => {};

  const handleFullSchedule = () => {};
  return (
    <Screen insetTop>
      <Header title="Schedule" />
      <ScheduleWeekView
        weekLabel="02/15/26 - 02/21/26"
        days={fullWeek}
        totalHours={56}
        onPreviousWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onDayPress={handleDayPress}
      />
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button title="View Full Schedule" onPress={handleFullSchedule} />
        </View>
      </View>

      {/* <View style={{ flex: 1, justifyContent: 'center' }}>
        <ScheduleDaySummaryCard
          dateLabel="02/15/26"
          dayLabel="Today"
          fromTime="7 AM"
          toTime="3 PM"
          totalHours={8}
          barColor={Colors.surfaceTertiary}
        />
      </View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
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
