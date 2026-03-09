import ChevronLeft from '@/assets/images/icons/chevron-left.svg';
import ChevronRight from '@/assets/images/icons/chevron-right.svg';
import { Colors } from '@/styles';
import { useState } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type ChevronProps = {
  direction: 'left' | 'right';
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Chevron({ direction, onPress, size = 24, style }: ChevronProps) {
  const [pressed, setPressed] = useState(false);
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress?.()}
      hitSlop={10}
      style={style}
    >
      <Icon
        width={size}
        height={size}
        stroke={pressed ? Colors.chevronPressed : Colors.chevronDefault}
      />
    </Pressable>
  );
}
