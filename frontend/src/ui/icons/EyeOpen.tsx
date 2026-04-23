import EyeOpenIcon from '@/assets/images/icons/eyeopen.svg';
import { StyleProp, ViewStyle } from 'react-native';

type EyeOpenProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function EyeOpen({ size = 20, style }: EyeOpenProps) {
  return <EyeOpenIcon height={size} width={size} />;
}
