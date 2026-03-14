import { AvailabilityDayEditorCard } from '@/features';
import { Header, Screen } from '@/ui';
import { Platform, StyleSheet, View } from 'react-native';

// const fullWeek: DayItem[] = [
//   { key: 'sun', label: 'Su', timeRange: '7 AM - 3 PM' },
//   { key: 'mon', label: 'Mo', timeRange: '9 AM - 5 PM' },
//   { key: 'tue', label: 'Tu', timeRange: '9 AM - 5 PM' },
//   { key: 'wed', label: 'We', timeRange: '9 AM - 5 PM' },
//   { key: 'thur', label: 'Th', timeRange: '9 AM - 5 PM' },
//   { key: 'fri', label: 'Fr', timeRange: '6 PM - 2 AM' },
//   { key: 'sat', label: 'Sa', timeRange: '12 PM - 8 PM' },
// ];

export default function Availability() {
  // const handleDayPress = () => {};
  // const handleRequestTimeOff = () => {};
  const handleOnBack = () => {};
  const handleOnConfirm = () => {};

  return (
    <Screen insetTop>
      <Header title="Availability" style={styles.header} />
      {/* <AvailabilityWeekView days={fullWeek} onDayPress={handleDayPress} />
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button title="Request Time Off" onPress={handleRequestTimeOff} />
        </View>
      </View> */}
      <View style={styles.cardWrapper}>
        <AvailabilityDayEditorCard
          dayLabel="Monday"
          startHour="07"
          startMinute="30"
          startPeriod="AM"
          endHour="09"
          endMinute="00"
          endPeriod="PM"
          onBack={handleOnBack}
          onConfirm={handleOnConfirm}
        />
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
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
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
  editorContainer: {},
});
