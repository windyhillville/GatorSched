import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type DurationBarProps = {
  color: string;
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export function DurationBar({ color, width = '100%', height = 40, style }: DurationBarProps) {
  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: color, width, height, borderRadius: height / 2 },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bar: {},
});
