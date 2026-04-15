import TrashCanIcon from '@/assets/images/icons/trashcan.svg';
import { StyleProp, ViewStyle } from 'react-native';

type TrashCanProps = {
  size?: number;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function TrashCan({ size = 28, style }: TrashCanProps) {
  return <TrashCanIcon height={size} width={size} />;
}
