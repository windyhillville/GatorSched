import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export function Header({ title, left, right }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sideLeft}>{left}</View>
      <View style={styles.center}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.sideRight}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    // gap: 64,
  },
  sideLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    lineHeight: 40,
  },
});
