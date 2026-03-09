import { Colors } from '@/styles';
import { Button } from '@/ui';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimePickerGroup } from './TimePickerGroup';

type TimeValue = {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
};

type AvailabilityDayEditorCardProps = {
  dayLabel: string;
  startHour: string;
  startMinute: string;
  startPeriod: 'AM' | 'PM';
  endHour: string;
  endMinute: string;
  endPeriod: 'AM' | 'PM';
  onBack?: () => void;
  onConfirm?: (payload: { start: TimeValue; end: TimeValue }) => void;
};

export function AvailabilityDayEditorCard({
  dayLabel,
  startHour,
  startMinute,
  startPeriod,
  endHour,
  endMinute,
  endPeriod,
  onBack,
  onConfirm,
}: AvailabilityDayEditorCardProps) {
  const [startTime, setStartTime] = useState<TimeValue>({
    hour: startHour,
    minute: startMinute,
    period: startPeriod,
  });

  const [endTime, setEndTime] = useState<TimeValue>({
    hour: endHour,
    minute: endMinute,
    period: endPeriod,
  });
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        {/* <Chevron direction="left" onPress={onBack} style={styles.chevron} /> */}
        <View style={styles.textContainer}>
          <Text style={styles.dayLabel}>{dayLabel}</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.pickerRow}>
        <TimePickerGroup
          columnLabel="Start"
          hour={startTime.hour}
          minute={startTime.minute}
          period={startTime.period}
          onHourSelect={(value) => setStartTime((prev) => ({ ...prev, hour: value }))}
          onMinuteSelect={(value) => setStartTime((prev) => ({ ...prev, minute: value }))}
          onPeriodSelect={(value) => setStartTime((prev) => ({ ...prev, period: value }))}
        />
        <TimePickerGroup
          columnLabel="End"
          hour={endTime.hour}
          minute={endTime.minute}
          period={endTime.period}
          onHourSelect={(value) => setEndTime((prev) => ({ ...prev, hour: value }))}
          onMinuteSelect={(value) => setEndTime((prev) => ({ ...prev, minute: value }))}
          onPeriodSelect={(value) => setEndTime((prev) => ({ ...prev, period: value }))}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            shape="rounded"
            color="default"
            onPress={() => onConfirm?.({ start: startTime, end: endTime })}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.buttonDefaultBorder,
    gap: 32,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    // flex: 1,
    // paddingLeft: 16,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
  spacer: {
    // width: 40,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 260,
  },
});
