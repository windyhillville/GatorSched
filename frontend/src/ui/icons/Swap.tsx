import SwapIcon from '@/assets/images/icons/swap.svg';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type SwapProps = {
  size?: number;
  onPressSwap?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Swap({ size = 28, onPressSwap, style }: SwapProps) {
  return (
    <Pressable onPress={onPressSwap}>
      <SwapIcon height={size} width={size} />
    </Pressable>
  );
}
