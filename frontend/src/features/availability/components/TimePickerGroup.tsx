import { StyleSheet, Text, View } from 'react-native';
import { TimeColumn } from './TimeColumn';

const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

type TimePickerGroupProps = {
  columnLabel: 'Start' | 'End';
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
  onHourSelect?: (value: string) => void;
  onMinuteSelect?: (value: string) => void;
  onPeriodSelect?: (value: 'AM' | 'PM') => void;
};
export function TimePickerGroup({
  columnLabel,
  hour,
  minute,
  period,
  onHourSelect,
  onMinuteSelect,
  onPeriodSelect,
}: TimePickerGroupProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.columnHeaderText}>{columnLabel}</Text>
      <View style={styles.group}>
        <TimeColumn values={hours} selectedValue={hour} onSelectValue={onHourSelect} />
        <TimeColumn values={minutes} selectedValue={minute} onSelectValue={onMinuteSelect} />
        <TimeColumn
          values={periods}
          selectedValue={period}
          onSelectValue={(value) => onPeriodSelect?.(value as 'AM' | 'PM')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  group: {
    flexDirection: 'row',
    gap: 6,
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
