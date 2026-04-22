import { AvailabilityDayEditorCard, AvailabilityToggle, AvailabilityWeekView } from '@/features';
import { useDaySelectionTransition } from '@/hooks';
import { EmployeeAvailability, getAvailabilities, setAvailability } from '@/services';
import { Button, Header, Screen } from '@/ui';
import { TimeValue } from '@/ui/time-picker/types';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const week: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

export default function Availability() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityInfo, setAvailabilityInfo] = useState<EmployeeAvailability[]>([]);
  const { selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle } =
    useDaySelectionTransition();
  const selectedDay = availabilityInfo.find((d) => d.key === selectedDayKey) ?? null;
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    async function fetchAvailabilities() {
      try {
        setIsLoading(true);
        setError(null);

        const request = await getAvailabilities('1');
        setAvailabilityInfo(request.availabilities);
      } catch (err) {
        setError('Failed to retrieve availabilities.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAvailabilities();
  }, []);

  useEffect(() => {
    setIsToggled(selectedDay?.isAvailable ?? false);
  }, [selectedDay]);

  const handleRequestTimeOff = () => {};

  const handleOnConfirm = async (payload: { start: TimeValue; end: TimeValue }) => {
    try {
      setIsLoading(true);
      setError(null);
      if (selectedDay !== null) {
        const response = await setAvailability(
          week[selectedDay.key],
          {
            startHour: payload.start.hour,
            startMinute: payload.start.minute,
            startTimePeriod: payload.start.period,
            endHour: payload.end.hour,
            endMinute: payload.end.minute,
            endTimePeriod: payload.end.period,
            isAvailable: isToggled,
          },
          '1',
        );
        setAvailabilityInfo((prev) =>
          prev.map((day) => (day.key === response.availability.key ? response.availability : day)),
        );
        setSelectedDayKey(null);
      }
    } catch (err) {
      setError('Failed to set availability.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen insetTop>
      <Header title="Availability" style={styles.header} />
      <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Animated.View style={[styles.weekContent, weekFadeStyle]}>
          <AvailabilityWeekView
            days={availabilityInfo.map((a) => ({
              key: a.key,
              label: a.shortLabel,
              timeRange: a.timeRange,
            }))}
            onDayPress={(dayKey) => setSelectedDayKey(dayKey)}
          />
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
              <Button title="Request Time Off" onPress={handleRequestTimeOff} />
            </View>
          </View>
        </Animated.View>

        {selectedDay && (
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.overlay, detailFadeStyle]}>
            <View style={styles.timePickerContainer}>
              <View style={styles.topRow} />
              <View style={styles.cardWrapper}>
                <AvailabilityDayEditorCard
                  dayLabel={selectedDay.longLabel}
                  startHour={selectedDay.timeWindow.startHour}
                  startMinute={selectedDay.timeWindow.startMinute}
                  startPeriod={selectedDay.timeWindow.startTimePeriod}
                  endHour={selectedDay.timeWindow.endHour}
                  endMinute={selectedDay.timeWindow.endMinute}
                  endPeriod={selectedDay.timeWindow.endTimePeriod}
                  headerRight={
                    <AvailabilityToggle
                      isToggled={isToggled}
                      size={20}
                      onToggle={() => setIsToggled((prev) => !prev)}
                    />
                  }
                  isAvailable={isToggled}
                  onBack={() => setSelectedDayKey(null)}
                  onConfirm={handleOnConfirm}
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
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
      },
      android: {
        paddingTop: 40,
      },
    }),
  },
  weekContent: {
    flex: 1,
  },
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
  timePickerContainer: {
    flex: 1,
    // backgroundColor: 'green',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  topRow: {
    height: 50,
    // backgroundColor: 'lightblue',
  },
  bottomRow: {
    height: 50,
    // backgroundColor: 'red',
  },
});
