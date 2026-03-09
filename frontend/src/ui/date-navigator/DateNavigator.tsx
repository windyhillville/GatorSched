import { StyleSheet, Text, View } from 'react-native';
import { Chevron } from '../chevron';

type DateNavigatorProps = {
  label: string;
  // subLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  // disabledPrevious?: boolean;
  // disablednext?: boolean;
};

export function DateNavigator({ label, onPrevious, onNext }: DateNavigatorProps) {
  return (
    <View style={styles.container}>
      <Chevron direction="left" onPress={onPrevious} />
      <Text style={styles.text}>{label}</Text>
      <Chevron direction="right" onPress={onNext} />
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
