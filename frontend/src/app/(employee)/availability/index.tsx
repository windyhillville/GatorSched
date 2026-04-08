import { AvailabilityDayEditorCard, AvailabilityWeekView } from '@/features';
import { useDaySelectionTransition } from '@/hooks';
import { Button, DayItem, Header, Screen } from '@/ui';
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

export default function Availability() {
  const { selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle } =
    useDaySelectionTransition();
  const selectedDay = fullWeek.find((d) => d.key === selectedDayKey) ?? null;

  const handleDayPress = () => {};
  const handleRequestTimeOff = () => {};
  const handleOnBack = () => {};
  const handleOnConfirm = () => {};

  return (
    <Screen insetTop>
      <Header title="Availability" style={styles.header} />
      <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Animated.View style={[styles.weekContent, weekFadeStyle]}>
          <AvailabilityWeekView
            days={fullWeek}
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
                  dayLabel="Monday"
                  startHour="07"
                  startMinute="30"
                  startPeriod="AM"
                  endHour="09"
                  endMinute="00"
                  endPeriod="PM"
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
