import { DaySchedulerView, SchedulerEmptyState } from '@/features';
import {
  formatDisplayDate,
  getDateFromWeekStartAndIndex,
  getNextWeekStart,
  getPreviousWeekStart,
  getWeekBoundsLabel,
  getWeekStart,
} from '@/features/utils';
import { useToday } from '@/hooks';
import { DaySchedule, generateSchedule, renderSchedule, RoleGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Scheduler() {
  const [weekDays, setWeekDays] = useState<DaySchedule[]>([]);
  const [groups, setGroups] = useState<RoleGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useToday();

  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState<DaySchedule | null>(null);

  function applyDay(day: DaySchedule | null) {
    setCurrentDay(day);
    setGroups(day?.groups ?? []);

    const initialExpandedState = Object.fromEntries(
      (day?.groups ?? []).map((group) => [group.role, true]),
    );
    setExpandedSections(initialExpandedState);
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function fetchSchedule() {
        try {
          setIsLoading(true);
          setError(null);

          const data = await renderSchedule(currentWeekStart);
          setWeekDays(data.days);

          const safeIndex = currentDayIndex < data.days.length ? currentDayIndex : 0;
          setCurrentDayIndex(safeIndex);
          applyDay(data.days[safeIndex] ?? null);
        } catch (err) {
          if (isActive) {
            setError('Failed to load schedule.');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }
      fetchSchedule();
    }, [currentWeekStart]),
  );

  async function handleAutoSchedule() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await generateSchedule(currentWeekStart);
      setWeekDays(data.days);

      const firstDay = data.days[0] ?? null;
      setCurrentDayIndex(0);
      applyDay(firstDay);
    } catch (err) {
      setError('Failed to generate schedule.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const currentDateObj = getDateFromWeekStartAndIndex(currentWeekStart, currentDayIndex);
  const displayDate = formatDisplayDate(currentDateObj);

  const weekHasScheduleData = weekDays.some((day) => day.groups.length > 0);

  const content = !weekHasScheduleData ? (
    <View style={styles.emptyStateWrapper}>
      <SchedulerEmptyState
        // dayLabel={displayDate.dayLabel}
        dateLabel={getWeekBoundsLabel(currentWeekStart)}
        isLoading={isLoading}
        onGenerateSchedule={handleAutoSchedule}
        onPreviousWeek={() => {
          setCurrentDayIndex(0);
          setCurrentWeekStart((prevWeek) => getPreviousWeekStart(prevWeek));
        }}
        onNextWeek={() => {
          setCurrentDayIndex(0);
          setCurrentWeekStart((prevWeek) => getNextWeekStart(prevWeek));
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  ) : currentDay ? (
    <DaySchedulerView
      groups={groups}
      dayLabel={displayDate.dayLabel}
      dateLabel={displayDate.dateLabel}
      expandedSections={expandedSections}
      onToggleSection={(role) =>
        setExpandedSections((prev) => ({
          ...prev,
          [role]: !(prev[role] ?? false),
        }))
      }
      onPreviousDay={() =>
        setCurrentDayIndex((prev) => {
          const nextIndex = prev - 1;

          if (nextIndex < 0) {
            setCurrentWeekStart((prevWeek) => getPreviousWeekStart(prevWeek));
            return 6;
          }

          applyDay(weekDays[nextIndex] ?? null);
          return nextIndex;
        })
      }
      onNextDay={() =>
        setCurrentDayIndex((prev) => {
          const nextIndex = prev + 1;

          if (nextIndex >= weekDays.length) {
            setCurrentWeekStart((prevWeek) => getNextWeekStart(prevWeek));
            return 0;
          }

          applyDay(weekDays[nextIndex] ?? null);
          return nextIndex;
        })
      }
    />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={36} />
    </View>
  );

  return (
    <Screen insetTop>
      <Header title="Scheduler" />
      {content}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyStateWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
