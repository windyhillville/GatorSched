import EmailIcon from '@/assets/images/icons/email.svg';
import { StyleProp, ViewStyle } from 'react-native';

type EmailProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Email({ size = 28, style }: EmailProps) {
  return <EmailIcon height={size} width={size} />;
}
