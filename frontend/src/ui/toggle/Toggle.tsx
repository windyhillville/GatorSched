import { useEffect } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ToggleProps = {
  toggled?: boolean;
  switchSize?: number;
  onToggle?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({ toggled, switchSize = 40, onToggle, style }: ToggleProps) {
  const padding = 4;
  const trackWidth = switchSize * 1.75;
  const thumbSize = switchSize - padding * 2;
  const maxTranslateX = trackWidth - thumbSize - padding * 2;

  const toggleXPos = useSharedValue(toggled ? maxTranslateX : 0);
  const toggleBackgroundColor = useSharedValue(toggled ? '#3333c3' : '#75757a');

  useEffect(() => {
    toggleXPos.value = withTiming(toggled ? maxTranslateX : 0, { duration: 150 });
    toggleBackgroundColor.value = withTiming(toggled ? '#3333c3' : '#75757a', {
      duration: 150,
    });
  }, [toggled, maxTranslateX, toggleXPos, toggleBackgroundColor]);

  const outerContainerColorStyle = useAnimatedStyle(() => ({
    backgroundColor: toggleBackgroundColor.value,
  }));

  const switchToggleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: toggleXPos.value,
      },
    ],
  }));
  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          { height: switchSize, width: trackWidth, borderRadius: switchSize / 2, padding },
          styles.outerContainer,
          outerContainerColorStyle,
          style,
        ]}
      >
        <Animated.View style={switchToggleStyle}>
          <View
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
              },
            ]}
          ></View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center',
    backgroundColor: '#75757a',
  },
  thumb: {
    backgroundColor: '#fff',
  },
});
