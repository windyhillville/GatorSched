import { Toggle } from '@/ui';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
type AvailabilityProps = {
  isToggled: boolean;
  size?: number;
  onToggle: () => void;
};

export function AvailabilityToggle({ isToggled, size, onToggle }: AvailabilityProps) {
  const availableFade = useSharedValue(isToggled ? 1 : 0);
  const unavailableFade = useSharedValue(isToggled ? 0 : 1);

  useEffect(() => {
    availableFade.value = withTiming(isToggled ? 1 : 0, { duration: 150 });
    unavailableFade.value = withTiming(isToggled ? 0 : 1, { duration: 150 });
  }, [isToggled, availableFade, unavailableFade]);

  const availableFadeStyle = useAnimatedStyle(() => ({
    opacity: availableFade.value,
  }));

  const unavailableFadeStyle = useAnimatedStyle(() => ({
    opacity: unavailableFade.value,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Animated.Text style={[styles.text, styles.label, availableFadeStyle]}>
          Available
        </Animated.Text>
        <Animated.Text style={[styles.text, styles.label, unavailableFadeStyle]}>
          Unavailable
        </Animated.Text>
      </View>
      <Toggle toggled={isToggled} onToggle={onToggle} switchSize={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
  labelContainer: {
    height: 16,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  label: {
    position: 'absolute',
  },
  text: {
    fontSize: 12,
    fontWeight: 500,
  },
});
