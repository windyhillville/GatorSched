import SkinnyChevronDown from '@/assets/images/icons/skinny-chevron-down.svg';
import SkinnyChevronLeft from '@/assets/images/icons/skinny-chevron-left.svg';
import SkinnyChevronRight from '@/assets/images/icons/skinny-chevron-right.svg';
import { Colors } from '@/styles';
import { useState } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type SkinnyChevronProps = {
  direction: 'left' | 'right' | 'down';
  stroke?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SkinnyChevron({
  direction,
  size = 24,
  stroke = Colors.chevronDefault,
  onPress,
  style,
}: SkinnyChevronProps) {
  const [pressed, setPressed] = useState(false);
  const Icon =
    direction === 'down'
      ? SkinnyChevronDown
      : direction === 'left'
        ? SkinnyChevronLeft
        : SkinnyChevronRight;

  const icon = (
    <Icon width={size} height={size} stroke={pressed ? Colors.chevronPressed : stroke} />
  );

  if (!onPress) {
    return icon;
  }

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress?.()}
      hitSlop={10}
      style={style}
    >
      {icon}
    </Pressable>
  );
}
