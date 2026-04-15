import ExclamationIcon from '@/assets/images/icons/exclamation.svg';
import { StyleProp, ViewStyle } from 'react-native';

type ExclamationProps = {
  size?: number;
  color?: string;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Exclamation({ size = 28, color = '#E33333', style }: ExclamationProps) {
  return <ExclamationIcon height={size} width={size} color={color} />;
}
