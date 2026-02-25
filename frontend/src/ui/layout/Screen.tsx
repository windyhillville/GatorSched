import { StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Colors, Spacing } from "@tokens";
import { Colors, Spacing } from '../../styles/';

export type ScreenProps = ViewProps & {
  padded?: boolean | number;
  centered?: boolean;
  backgroundColor?: string;
  insetTop?: boolean;
  insetBottom?: boolean;
  insetLeft?: boolean;
  insetRight?: boolean;
};

export function Screen({
  padded = false,
  centered = false,
  backgroundColor = Colors.bg,
  insetTop = false,
  insetBottom = true,
  insetLeft = true,
  insetRight = true,
  style,
  children,
  ...rest
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const pad = typeof padded === 'number' ? padded : padded ? Spacing.md : 0;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
          paddingTop: (insetTop ? insets.top : 0) + pad,
          paddingBottom: (insetBottom ? insets.bottom : 0) + pad,
          paddingLeft: (insetLeft ? insets.left : 0) + pad,
          paddingRight: (insetRight ? insets.right : 0) + pad,
        },
        centered && styles.centered,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
