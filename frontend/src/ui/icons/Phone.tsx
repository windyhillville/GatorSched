import PhoneIcon from '@/assets/images/icons/phone.svg';
import { StyleProp, ViewStyle } from 'react-native';

type PhoneProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Phone({ size = 28, style }: PhoneProps) {
  return <PhoneIcon height={size} width={size} />;
}
