import PersonIcon from '@/assets/images/icons/person.svg';
import { StyleProp, ViewStyle } from 'react-native';

type PersonProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Person({ size = 28, style }: PersonProps) {
  return <PersonIcon height={size} width={size} />;
}
