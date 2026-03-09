import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type TimeSlotProps = {
  timeLabel: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function TimeSlot({
  timeLabel,
  selected = false,
  onPress,
  style,
  textStyle,
}: TimeSlotProps) {
  let content = (
    <View style={[styles.timeSlot, selected ? styles.selectedSlot : undefined, style]}>
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
    height: 34,
  },
  timeText: {
    fontSize: 14,
    color: '#777',
  },
  selectedSlot: {
    backgroundColor: '#cfe9ff21',
    fontWeight: '600',
  },
  selectedText: {
    fontWeight: '600',
    color: '#333',
  },
});
