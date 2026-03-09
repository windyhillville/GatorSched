import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TimeSlot } from './TimeSlot';

type TimeColumnProps = {
  values: string[];
  selectedValue?: string;
  onSelectValue?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

function getVisibleWindow(values: string[], selectedValue: string, windowSize = 5) {
  const selectedIndex = values.indexOf(selectedValue);
  if (selectedIndex === -1) return values.slice(0, windowSize);

  const halfWindow = Math.floor(windowSize / 2);
  let start = selectedIndex - halfWindow;
  let end = selectedIndex + halfWindow + 1; // slice() is upper-end exclusive, so add 1

  // clamp to 0
  if (start < 0) {
    start = 0;
    end = windowSize;
  }

  if (end > values.length) {
    end = values.length;
    start = Math.max(0, end - windowSize); // clamp to 0 if start < 0
  }

  return values.slice(start, end);
}

export function TimeColumn({ values, selectedValue, onSelectValue, style }: TimeColumnProps) {
  const visibleValues = getVisibleWindow(values, selectedValue ?? values[0]);
  return (
    <View style={[styles.timeColumn, style]}>
      {visibleValues.map((value) => (
        <TimeSlot
          key={value}
          timeLabel={value}
          selected={value === selectedValue}
          onPress={() => onSelectValue?.(value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  timeColumn: {
    gap: 8,
  },
});
