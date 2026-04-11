import { StyleSheet, Text, View } from 'react-native';
import { TimeColumn } from './TimeColumn';
import { ITEM_SIZE, ROWS_ABOVE_SELECTED, SLOT_HEIGHT } from './constants';

const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

type TimePickerGroupProps = {
  columnLabel: 'Start' | 'End';
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
  isAvailable?: boolean;
  onHourSelect?: (value: string) => void;
  onMinuteSelect?: (value: string) => void;
  onPeriodSelect?: (value: 'AM' | 'PM') => void;
};
export function TimePickerGroup({
  columnLabel,
  hour,
  minute,
  period,
  isAvailable,
  onHourSelect,
  onMinuteSelect,
  onPeriodSelect,
}: TimePickerGroupProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.columnHeaderText}>{columnLabel}</Text>
      <View style={styles.groupWrapper}>
        <View style={styles.selectedRowOverlay} />
        <View style={styles.group}>
          <TimeColumn
            values={hours}
            selectedValue={hour}
            onSelectValue={onHourSelect}
            isAvailable={isAvailable}
          />

          <View style={styles.separatorWrapper}>
            <Text style={styles.separator}>:</Text>
          </View>
          <TimeColumn
            values={minutes}
            selectedValue={minute}
            onSelectValue={onMinuteSelect}
            isAvailable={isAvailable}
          />
          <TimeColumn
            values={periods}
            selectedValue={period}
            onSelectValue={(value) => onPeriodSelect?.(value as 'AM' | 'PM')}
            isAvailable={isAvailable}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  groupWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRowOverlay: {
    position: 'absolute',
    left: 6,
    right: 6,
    top: ROWS_ABOVE_SELECTED * ITEM_SIZE + (ITEM_SIZE - SLOT_HEIGHT) / 2,
    height: SLOT_HEIGHT,
    backgroundColor: '#cfe9ff50',
    borderRadius: 6,
    pointerEvents: 'none',
  },
  separatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  timeColumns: {
    flexDirection: 'row',
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
