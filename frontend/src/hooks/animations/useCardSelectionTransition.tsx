import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function useCardSelectionTransition(expanded: boolean) {
  const [measuredDetailHeight, setMeasuredDetailHeight] = useState<number>(0);
  const [measuredHeaderHeight, setMeasuredHeaderHeight] = useState<number>(0);

  const headerOpacity = useSharedValue<number>(1);
  const detailOpacity = useSharedValue<number>(0);
  const headerHeight = useSharedValue<number>(0);
  const detailHeight = useSharedValue<number>(0);

  useEffect(() => {
    if (expanded) {
      detailHeight.value = withTiming(measuredDetailHeight, { duration: 250 });
      detailOpacity.value = withTiming(1, { duration: 250 });
      headerOpacity.value = withTiming(0, { duration: 100 });
      headerHeight.value = withTiming(0, { duration: 250 });
    } else {
      detailHeight.value = withTiming(0, { duration: 250 });
      detailOpacity.value = withTiming(0, { duration: 200 });
      headerOpacity.value = withTiming(1, { duration: 200 });
      headerHeight.value = withTiming(measuredHeaderHeight, { duration: 250 });
      // console.log(measuredHeaderHeight);
    }
  }, [expanded, measuredDetailHeight, measuredHeaderHeight]);

  const detailStyle = useAnimatedStyle(() => ({
    height: detailHeight.value,
    opacity: detailOpacity.value,
    transform: [
      {
        translateY: (1 - detailOpacity.value) * 10,
      },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
    opacity: headerOpacity.value,
  }));

  return {
    setMeasuredDetailHeight,
    setMeasuredHeaderHeight,
    detailStyle,
    headerStyle,
  };
}
