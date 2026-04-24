import { DayGrid, DayItem } from '@/ui';
import { StyleSheet, View } from 'react-native';

type ShiftSelectionStepProps = {
  shifts: DayItem[];
  selectedAssignmentId?: string;
  onSelectShift?: (assignmentId: string) => void;
};

export function ShiftSelectionStep({
  shifts,
  selectedAssignmentId,
  onSelectShift,
}: ShiftSelectionStepProps) {
  return (
    <View style={styles.container}>
      <DayGrid
        days={shifts}
        size={'medium'}
        selectedDay={selectedAssignmentId}
        onDayPress={onSelectShift}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
});
