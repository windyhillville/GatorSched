import CheckmarkIcon from '@/assets/images/icons/checkmark.svg';
import { StyleProp, ViewStyle } from 'react-native';

type CheckmarkProps = {
  size?: number;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Checkmark({ size = 28, style }: CheckmarkProps) {
  return <CheckmarkIcon height={size} width={size} />;
}
