import { ScheduleDaySummaryCard, ScheduleWeekView } from '@/features';
import { useDaySelectionTransition } from '@/hooks';
import { Button, Chevron, DayItem, Header, Screen } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const fullWeek: DayItem[] = [
  { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
  { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
  { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
  { key: 'wed', label: 'We', timeRange: '9 AM - 5 PM' },
  { key: 'thur', label: 'Th', timeRange: '9 AM - 5 PM' },
  { key: 'fri', label: 'Fr', timeRange: '6 PM - 2 AM' },
  { key: 'sat', label: 'Sa', timeRange: '12 PM - 8 PM' },
];

type ScheduleDay = {
  id: string;
  isoDate: string; // "2026-02-15"
  // shortLabel: string; // "Su"
  // longLabel: string; // "Sunday"
  // dateLabel: string; // "02/15/26"
  fromTime: string; // "7 AM"
  toTime: string; // "3 PM"
  // timeRange: string; // "7 AM - 3 PM" NOTE: Format time range manually in frontend
  totalHours: number; // 8
  isToday: boolean;
  // hasShift: boolean;
};

type ScheduleWeekData = {
  // weekLabel: string;
  weekStartIsoDate: string;
  weekEndIsoDate: string;
  totalHours: number;
  days: ScheduleDay[];
};

export default function Schedule() {
  const [selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle] =
    useDaySelectionTransition();
  const selectedDay = fullWeek.find((d) => d.key === selectedDayKey) ?? null;

  const handlePrevWeek = () => {};

  const handleNextWeek = () => {};

  const handlePrevDay = () => {};

  const handleNextDay = () => {};

  const handleFullSchedule = () => {};

  return (
    <Screen insetTop>
      <Header title="Schedule" />

      <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Animated.View style={[{ flex: 1 }, weekFadeStyle]}>
          <ScheduleWeekView
            weekLabel="02/15/26 - 02/21/26"
            days={fullWeek}
            totalHours={56}
            onPreviousWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
            onDayPress={(dayKey) => setSelectedDayKey(dayKey)}
          />

          <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
              <Button title="View Full Schedule" onPress={handleFullSchedule} />
            </View>
          </View>
        </Animated.View>

        {selectedDay && (
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.overlay, detailFadeStyle]}>
            <View style={styles.summaryContainer}>
              <View style={styles.topRow}>
                <Chevron direction="left" size={28} onPress={() => setSelectedDayKey(null)} />
              </View>
              <View style={styles.middleRow}>
                <ScheduleDaySummaryCard
                  dateLabel="02/15/26"
                  dayLabel="Today"
                  fromTime="7 AM"
                  toTime="3 PM"
                  totalHours={8}
                  barColor={'#ccc'}
                  onNextDay={handleNextDay}
                  onPreviousDay={handlePrevDay}
                />
              </View>
              <View style={styles.bottomRow} />
            </View>
          </Animated.View>
        )}
      </View>
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
  overlay: {
    flex: 1,
  },
  summaryContainer: {
    flex: 1,
  },
  topRow: {
    // flex: 1,
    height: 75,
    justifyContent: 'center',
    paddingLeft: 12,
    // backgroundColor: 'green',
  },
  middleRow: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'lightblue',
  },
  bottomRow: {
    height: 75,
    // backgroundColor: 'red',
    // flex: 1,
  },
});
