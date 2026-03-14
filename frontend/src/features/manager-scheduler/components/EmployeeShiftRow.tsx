import { StyleSheet, Text, View } from 'react-native';
import { ShiftBar } from './ShiftBar';
type EmployeeShiftRowProps = {
  name: string;
  avatarUri?: string;
  startLabel: string;
  endLabel: string;
  color: string;
};

export function EmployeeShiftRow({
  name,
  avatarUri,
  startLabel,
  endLabel,
  color,
}: EmployeeShiftRowProps) {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.profileContainer}>
        <View style={[styles.circle, { backgroundColor: color }]}></View>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.barContainer}>
        <ShiftBar color={color} startLabel={startLabel} endLabel={endLabel} style={styles.bar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    paddingVertical: 16,
    width: '100%',
  },
  profileContainer: {
    width: 88,
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  nameText: {
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  bar: {
    width: '85%',
  },
});
