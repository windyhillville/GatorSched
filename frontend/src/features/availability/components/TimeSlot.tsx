import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { SLOT_HEIGHT } from './constants';

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
    <View style={styles.timeSlot}>
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
    height: SLOT_HEIGHT,
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
