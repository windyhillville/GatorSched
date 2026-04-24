import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function useDaySelectionTransition() {
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  const weekOpacity = useSharedValue(1);
  const detailOpacity = useSharedValue(0);

  useEffect(() => {
    if (selectedDayKey) {
      weekOpacity.value = withTiming(0, { duration: 150 });
      detailOpacity.value = withTiming(1, { duration: 500 });
    } else {
      weekOpacity.value = withTiming(1, { duration: 500 });
      detailOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [selectedDayKey, weekOpacity, detailOpacity]);

  const weekFadeStyle = useAnimatedStyle(() => ({
    opacity: weekOpacity.value,
    transform: [
      {
        translateY: (1 - weekOpacity.value) * -10,
      },
    ],
  }));

  const detailFadeStyle = useAnimatedStyle(() => ({
    opacity: detailOpacity.value,
    transform: [
      {
        translateY: (1 - detailOpacity.value) * 10,
      },
    ],
  }));

  return { selectedDayKey, setSelectedDayKey, weekFadeStyle, detailFadeStyle } as const;
}
