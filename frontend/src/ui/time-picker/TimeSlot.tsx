import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { getTimePickerMetrics } from './metrics';

type TimeSlotProps = {
  timeLabel: string;
  compact?: boolean;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function TimeSlot({
  timeLabel,
  compact,
  selected = false,
  onPress,
  style,
  textStyle,
}: TimeSlotProps) {
  const { slotHeight } = getTimePickerMetrics(compact ? 'compact' : 'regular');

  let content = (
    <View style={[styles.timeSlot, { height: slotHeight }]}>
      <Text style={[styles.timeText, selected ? styles.selectedText : undefined, textStyle]}>
        {timeLabel}
      </Text>
    </View>
  );
  if (onPress) {
    content = <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  timeSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 44,
    // height: SLOT_HEIGHT,
  },
  timeText: {
    fontSize: 14,
    color: '#777',
  },
  selectedText: {
    fontWeight: '600',
    color: '#333',
  },
});
