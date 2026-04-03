import { Colors } from '@/styles';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}
export function Card({ style, wrapperStyle, children }: CardProps) {
  return (
    <View style={[styles.shadowWrapper, wrapperStyle]}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    width: '100%',
    backgroundColor: Colors.baseWhite,
    borderRadius: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5, // 5 is the magic number I guess
      },
    }),
  },
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.baseWhite,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 60,
    minHeight: 48,
    minWidth: 64,
  },
});
