import ClipboardIcon from '@/assets/images/icons/clipboard.svg';
import { StyleProp, ViewStyle } from 'react-native';

type ClipboardProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Clipboard({ size = 28, style }: ClipboardProps) {
  return <ClipboardIcon height={size} width={size} />;
}
