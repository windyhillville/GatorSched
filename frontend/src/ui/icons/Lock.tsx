import LockIcon from '@/assets/images/icons/lock.svg';
import { StyleProp, ViewStyle } from 'react-native';

type LockProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Lock({ size = 28, style }: LockProps) {
  return <LockIcon height={size} width={size} />;
}
