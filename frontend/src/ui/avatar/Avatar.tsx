import { Colors } from '@/styles';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type AvatarProps = {
  img?: any;
  name?: string;
  size?: number;
  backgroundColor?: string;
};

export function Avatar({
  img,
  name,
  size = 90, // default size
  backgroundColor = Colors.brandPrimary, // default background color
}: AvatarProps) {
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
        source={img}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
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
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.4 }}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
