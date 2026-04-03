import { Colors, SIZES } from '@/styles';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type AvatarSize = 'small' | 'medium' | 'large';

type AvatarProps = {
  img: string | null;
  name?: string;
  size?: AvatarSize;
  color: string | null;
};

const sizeMap = {
  small: SIZES.avatar.small,
  medium: SIZES.avatar.medium,
  large: SIZES.avatar.large,
};

export function Avatar({
  img,
  name,
  size, // default size
  color,
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
  return (
    <View
      style={[
        styles.fallback,
        {
          width: resolvedSize,
          height: resolvedSize,
          borderRadius: resolvedSize / 2,
          backgroundColor: resolvedBackgroundColor,
        },
      ]}
    >
      <Text style={{ fontSize: resolvedSize * 0.4 }}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
