import { Avatar, Card } from '@/ui';
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
    <Card borderRadius={24}>
      <View style={styles.rowContainer}>
        <View style={{ width: '100%' }}>
          <Text style={styles.nameText}>{name}</Text>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={styles.profileContainer}>
              <Avatar name={name} img="" color={color} size="verySmall" />
            </View>
            <View style={styles.barContainer}>
              <ShiftBar
                color={color}
                startLabel={startLabel}
                endLabel={endLabel}
                style={styles.bar}
              />
            </View>
            <View style={{ width: 20 }} />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
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
    // paddingTop: 10,
  },
  bar: {
    width: '85%',
  },
});
