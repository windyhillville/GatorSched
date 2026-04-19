import { Colors, SIZES } from '@/styles';
import { Image } from 'expo-image';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export type AvatarSize = 'xxSmall' | 'xSmall' | 'small' | 'medium' | 'large';

type AvatarProps = {
  img: string | null;
  name?: string;
  label?: string;
  size?: AvatarSize;
  color: string | null;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const sizeMap = {
  xxSmall: SIZES.avatar.xxSmall,
  xSmall: SIZES.avatar.xSmall,
  small: SIZES.avatar.small,
  medium: SIZES.avatar.medium,
  large: SIZES.avatar.large,
};

export function Avatar({
  img,
  name,
  label,
  size, // default size
  color,
  borderColor,
  style,
  textStyle,
}: AvatarProps) {
  const resolvedSize = sizeMap[size ?? 'medium'];
  const resolvedBackgroundColor = color ?? Colors.brandPrimary;

  const initials = name
    ? name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
    : '?';
  // profile image exists
  if (img) {
    return (
      <Image
        source={{ uri: img }}
        style={{
          width: resolvedSize,
          height: resolvedSize,
          borderRadius: resolvedSize / 2,
        }}
        contentFit="cover"
      />
    );
  }
  // profile image doesn't exist, fallback to initials

  const content = label || initials;

  return (
    <View
      style={[
        styles.fallback,
        {
          width: resolvedSize,
          height: resolvedSize,
          borderRadius: resolvedSize / 2,
          backgroundColor: resolvedBackgroundColor,
          borderWidth: borderColor ? 1 : 0,
          borderColor,
        },
        style,
      ]}
    >
      <Text style={[{ fontSize: resolvedSize * 0.4 }, textStyle]}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
