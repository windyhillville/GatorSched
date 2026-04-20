import CalloutIcon from '@/assets/images/icons/callout.svg';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type CalloutProps = {
  size?: number;
  onPressCallout?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Callout({ size = 28, onPressCallout, style }: CalloutProps) {
  return (
    <Pressable onPress={onPressCallout}>
      <CalloutIcon height={size} width={size} />
    </Pressable>
  );
}
