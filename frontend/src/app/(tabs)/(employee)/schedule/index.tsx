import { ScheduleDaySummaryCard, ScheduleWeekView, UnscheduledDayCard } from '@/features';
import {
  getDateFromWeekStartAndIndex,
  getDayIndexFromKey,
  getMonthAndDayLabel,
  getNextDayKey,
  getNextWeekStart,
  getPreviousDayKey,
  getPreviousWeekStart,
  getWeekBoundsLabel,
  getWeekStart,
  isToday,
} from '@/features/utils';
import { useAuth, useDaySelectionTransition, useToday } from '@/hooks';
import { EmployeeScheduleResponse, getEmployeeSchedule } from '@/services';
import { Button, Chevron, Header, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduleInfo, setScheduleInfo] = useState<EmployeeScheduleResponse | null>(null);

  const { selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle } =
    useDaySelectionTransition();
  const selectedDay = scheduleInfo?.schedule.find((d) => d.key === selectedDayKey) ?? null;
  const isDetailOpen = selectedDayKey !== null;

  const today = useToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));

  const { user } = useAuth();
  const currentUserId = user?.id;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function getSchedule() {
        if (!currentUserId) return;
        try {
          setIsLoading(true);
          setError(null);

          const request = await getEmployeeSchedule(currentUserId, currentWeekStart);

          if (isActive) {
            setScheduleInfo(request);
          }
        } catch (err) {
          if (isActive) {
            setError('Failed to retrieve schedule.');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }
      getSchedule();
      return () => {
        isActive = false;
      };
    }, [currentUserId, currentWeekStart]),
  );
  // useEffect(() => {
  //   async function getSchedule() {
  //     if (!currentUserId) return;
  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const request = await getEmployeeSchedule(currentUserId, currentWeekStart);
  //       setScheduleInfo(request);
  //     } catch (err) {
  //       setError('Failed to retrieve schedule.');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getSchedule();
  // }, [currentUserId, currentWeekStart]);

  const handleFullSchedule = () => {};

  const handlePreviousDay = () => {
    if (!selectedDayKey) return;

    if (selectedDayKey === 'Sun') {
      setCurrentWeekStart((prevWeek) => getPreviousWeekStart(prevWeek));
      setSelectedDayKey('Sat');
      return;
    }

    setSelectedDayKey(getPreviousDayKey(selectedDayKey));
  };

  const handleNextDay = () => {
    if (!selectedDayKey) return;

    if (selectedDayKey === 'Sat') {
      setCurrentWeekStart((prevWeek) => getNextWeekStart(prevWeek));
      setSelectedDayKey('Sun');
      return;
    }

    setSelectedDayKey(getNextDayKey(selectedDayKey));
  };

  const selectedDayIndex = getDayIndexFromKey(selectedDayKey);
  const selectedDateObj = getDateFromWeekStartAndIndex(currentWeekStart, selectedDayIndex);
  const unscheduledDateLabel = getMonthAndDayLabel(selectedDateObj.toLocaleDateString('en-CA'));

  return (
    <Screen insetTop>
      <Header title="Schedule" />

      {scheduleInfo ? (
        <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Animated.View style={[{ flex: 1 }, weekFadeStyle]}>
            <ScheduleWeekView
              weekLabel={getWeekBoundsLabel(currentWeekStart)}
              employeeShifts={scheduleInfo.schedule}
              totalHours={scheduleInfo.totalHours}
              onPreviousWeek={() =>
                setCurrentWeekStart((prevWeek) => getPreviousWeekStart(prevWeek))
              }
              onNextWeek={() => setCurrentWeekStart((prevWeek) => getNextWeekStart(prevWeek))}
              onDayPress={(dayKey) => setSelectedDayKey(dayKey)}
            />

            <View style={styles.buttonWrapper}>
              <View style={styles.buttonContainer}>
                <Button title="View Full Schedule" onPress={handleFullSchedule} />
              </View>
            </View>
          </Animated.View>

          {isDetailOpen && (
            <Animated.View style={[StyleSheet.absoluteFillObject, styles.overlay, detailFadeStyle]}>
              <View style={styles.summaryContainer}>
                <View style={styles.topRow}>
                  <Chevron direction="left" size={28} onPress={() => setSelectedDayKey(null)} />
                </View>
                <View style={styles.middleRow}>
                  {selectedDay ? (
                    <ScheduleDaySummaryCard
                      summary={selectedDay.summary}
                      dateLabel={getMonthAndDayLabel(selectedDay.isoDate)}
                      barColor={scheduleInfo.color}
                      isToday={isToday(selectedDay.isoDate, today)}
                      onPreviousDay={handlePreviousDay}
                      onNextDay={handleNextDay}
                    />
                  ) : (
                    <UnscheduledDayCard
                      dateLabel={unscheduledDateLabel}
                      isToday={isToday(selectedDateObj.toLocaleDateString('en-CA'), today)}
                      onPreviousDay={handlePreviousDay}
                      onNextDay={handleNextDay}
                    />
                  )}
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
