import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type ShiftNavIconProps = {
  Icon: any;
  size?: number;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ShiftNavIcon({ Icon, size = 36, onSelect, style }: ShiftNavIconProps) {
  return <Icon width={size} height={size} />;
}

const styles = StyleSheet.create({});
