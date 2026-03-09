import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Header({ title, left, right, style }: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>{left}</View>
      <View style={styles.center}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.side}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    // gap: 64,
  },
  side: {
    // flex: 1,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    flexShrink: 1,
  },
});
