import { ScheduleDaySummaryCard, ScheduleWeekView } from '@/features';
import { isToday } from '@/features/utils';
import { useDaySelectionTransition, useToday } from '@/hooks';
import { EmployeeScheduleResponse, getEmployeeSchedule } from '@/services';
import { Button, Chevron, DayItem, Header, Screen } from '@/ui';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
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

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduleInfo, setScheduleInfo] = useState<EmployeeScheduleResponse | null>(null);

  const today = useToday();

  const { selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle } =
    useDaySelectionTransition();
  const selectedDay = scheduleInfo?.schedule.find((d) => d.key === selectedDayKey) ?? null;

  const handlePrevWeek = () => {};

  const handleNextWeek = () => {};

  const handlePrevDay = () => {};

  const handleNextDay = () => {};

  const handleFullSchedule = () => {};

  const viewerId = '1';
  const startWeek = '2026-03-15';
  useEffect(() => {
    async function getSchedule() {
      try {
        setIsLoading(true);
        setError(null);

        const request = await getEmployeeSchedule(viewerId, startWeek);
        setScheduleInfo(request);
      } catch (err) {
        setError('Failed to retrieve schedule.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getSchedule();
  }, [viewerId, startWeek]);

  return (
    <Screen insetTop>
      <Header title="Schedule" />

      {scheduleInfo ? (
        <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Animated.View style={[{ flex: 1 }, weekFadeStyle]}>
            <ScheduleWeekView
              weekLabel={scheduleInfo.weekLabel}
              employeeShifts={scheduleInfo.schedule}
              totalHours={scheduleInfo.totalHours}
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
                    summary={selectedDay.summary}
                    barColor={scheduleInfo.color}
                    isToday={isToday(selectedDay.isoDate, today)}
                    onNextDay={handleNextDay}
                    onPreviousDay={handlePrevDay}
                  />
                </View>
                <View style={styles.bottomRow} />
              </View>
            </Animated.View>
          )}
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
