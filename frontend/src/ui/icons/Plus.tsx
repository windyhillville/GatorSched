import PlusSignIcon from '@/assets/images/icons/plus.svg';
import { StyleProp, ViewStyle } from 'react-native';

type PlusSignProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function PlusSign({ size = 28, style }: PlusSignProps) {
  return <PlusSignIcon height={size} width={size} />;
}
