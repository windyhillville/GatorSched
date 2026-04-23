import EyeShutIcon from '@/assets/images/icons/eyeshut.svg';
import { StyleProp, ViewStyle } from 'react-native';

type EyeShutProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function EyeShut({ size = 20, style }: EyeShutProps) {
  return <EyeShutIcon height={size} width={size} />;
}
