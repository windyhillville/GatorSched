import PickupIcon from '@/assets/images/icons/pickup.svg';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type PickupProps = {
  size?: number;
  onPressPickup?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Pickup({ size = 28, onPressPickup, style }: PickupProps) {
  return (
    <Pressable onPress={onPressPickup}>
      <PickupIcon height={size} width={size} />
    </Pressable>
  );
}
