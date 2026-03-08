import { DayGrid, DayItem, Screen } from '@/ui';
// import { Text } from 'react-native';

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
  return (
    <Screen centered>
      {/* <Text>This is the Schedule Screen!</Text> */}
      {/* <Button title="View Schedule" shape="pill" color="default" /> */}
      <DayGrid days={fullWeek} />
    </Screen>
  );
}
