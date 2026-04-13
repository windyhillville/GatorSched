import { DayGrid } from '@/ui';
import { StyleSheet, View } from 'react-native';
import { SHIFT_DAY_OPTIONS } from './dayOptions';

type DaySelectionStepProps = {
  selectedDay?: string;
  onSelectDay?: (dayKey: string) => void;
};

export function DaySelectionStep({ selectedDay, onSelectDay }: DaySelectionStepProps) {
  return (
    <View style={styles.container}>
      <DayGrid
        days={SHIFT_DAY_OPTIONS}
        selectedDay={selectedDay}
        showTime={false}
        onDayPress={onSelectDay}
        size={'medium'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
