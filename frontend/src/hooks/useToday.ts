import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { AppState } from 'react-native';

export const useToday = () => {
  const [today, setToday] = useState(new Date().toLocaleDateString('en-CA'));

  useFocusEffect(
    useCallback(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState == 'active') {
          setToday(new Date().toLocaleDateString('en-CA'));
        }
      });
      return () => subscription.remove();
    }, []),
  );

  return today;
};
