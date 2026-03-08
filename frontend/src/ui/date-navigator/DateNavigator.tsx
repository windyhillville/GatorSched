import ChevronLeft from '@/assets/images/icons/chevron-left.svg';
import ChevronRight from '@/assets/images/icons/chevron-right.svg';
import { Colors } from '@/styles';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type DateNavigatorProps = {
  label: string;
  // subLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  // disabledPrevious?: boolean;
  // disablednext?: boolean;
};

export function DateNavigator({ label, onPrevious, onNext }: DateNavigatorProps) {
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => setIsLeftPressed(true)}
        onPressOut={() => setIsLeftPressed(false)}
        onPress={() => onPrevious?.()}
        hitSlop={8}
      >
        <ChevronLeft
          width={24}
          height={24}
          stroke={isLeftPressed ? Colors.chevronPressed : Colors.chevronDefault}
        />
      </Pressable>
      <Text style={styles.text}>{label}</Text>
      <Pressable
        onPressIn={() => setIsRightPressed(true)}
        onPressOut={() => setIsRightPressed(false)}
        onPress={() => onNext?.()}
        hitSlop={8}
      >
        <ChevronRight
          width={24}
          height={24}
          stroke={isRightPressed ? Colors.chevronPressed : Colors.chevronDefault}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
  },
});
