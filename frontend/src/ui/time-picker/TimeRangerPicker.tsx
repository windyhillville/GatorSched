import { StyleSheet, Text, View } from 'react-native';
import { TimePickerGroup } from './TimePickerGroup';
import { TimeValue } from './types';

type TimeRangePickerProps = {
  dayLabel?: string;
  start: TimeValue;
  end: TimeValue;
  isAvailable?: boolean;
  compact?: boolean;
  onChangeStart: (next: TimeValue) => void;
  onChangeEnd: (next: TimeValue) => void;
};

export function TimeRangePicker({
  dayLabel,
  start,
  end,
  isAvailable = true,
  compact = false,
  onChangeStart,
  onChangeEnd,
}: TimeRangePickerProps) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {dayLabel ? (
        <Text style={[styles.dayLabel, compact && styles.compactDayLabel]}>{dayLabel}</Text>
      ) : null}

      <View style={[styles.pickerRow, !isAvailable && styles.unavailable]}>
        <TimePickerGroup
          columnLabel="Start"
          hour={start.hour}
          minute={start.minute}
          period={start.period}
          isAvailable={isAvailable}
          onHourSelect={(value) => onChangeStart({ ...start, hour: value })}
          onMinuteSelect={(value) => onChangeStart({ ...start, minute: value })}
          onPeriodSelect={(value) => onChangeStart({ ...start, period: value })}
          compact={compact}
        />

        <TimePickerGroup
          columnLabel="End"
          hour={end.hour}
          minute={end.minute}
          period={end.period}
          isAvailable={isAvailable}
          onHourSelect={(value) => onChangeEnd({ ...end, hour: value })}
          onMinuteSelect={(value) => onChangeEnd({ ...end, minute: value })}
          onPeriodSelect={(value) => onChangeEnd({ ...end, period: value })}
          compact={compact}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 24,
  },
  compactContainer: {
    gap: 18,
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  compactDayLabel: {
    fontSize: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  unavailable: {
    opacity: 0.5,
  },
});
