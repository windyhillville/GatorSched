import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HeaderProps = {
  title: string;
  type?: 'large' | 'medium' | 'small';
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Header({ title, type = 'large', left, right, style }: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>{left}</View>
      <View style={styles.center}>
        <Text style={styles[`${type}Text`]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.side}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
      },
      android: {
        paddingTop: 40,
      },
    }),
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
  largeText: {
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    flexShrink: 1,
  },
  mediumText: {
    fontSize: 24,
    lineHeight: 40,
    textAlign: 'center',
    flexShrink: 1,
  },
  smallText: {
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    flexShrink: 1,
  },
});
