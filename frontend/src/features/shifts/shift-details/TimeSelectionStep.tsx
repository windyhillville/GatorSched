import { TimeRangePicker, TimeValue } from '@/ui';
import { StyleSheet, View } from 'react-native';

type TimeSelectionStepProps = {
  dayLabel: string;
  start: TimeValue;
  end: TimeValue;
  onChangeStart: (startTime: TimeValue) => void;
  onChangeEnd: (endTime: TimeValue) => void;
};

export function TimeSelectionStep({
  dayLabel,
  start,
  end,
  onChangeStart,
  onChangeEnd,
}: TimeSelectionStepProps) {
  return (
    <View style={styles.container}>
      <TimeRangePicker
        dayLabel={dayLabel}
        start={start}
        end={end}
        compact
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  // dayEditorcontainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '90%',
  //   borderWidth: 0,
  // },
});
