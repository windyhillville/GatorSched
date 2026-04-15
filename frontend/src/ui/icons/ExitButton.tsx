import ExitIcon from '@/assets/images/icons/exit.svg';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type ExitButtonProps = {
  size?: number;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
  onExit?: () => void;
};

export function ExitButton({ onExit, size = 28, style }: ExitButtonProps) {
  return (
    <Pressable hitSlop={10} onPress={onExit}>
      <ExitIcon height={size} width={size} />
    </Pressable>
  );
}
