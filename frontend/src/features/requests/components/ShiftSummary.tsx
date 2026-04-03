import { PersonData } from '@/features/types';
import { Avatar, DayIcon } from '@/ui';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type ShiftSummaryProps = {
  user: PersonData;
  textStyle?: StyleProp<TextStyle>;
};

export function ShiftSummary({ user, textStyle }: ShiftSummaryProps) {
  return (
    <View style={styles.shiftWrapper}>
      <Avatar name={user.name} img={user.avatarUrl} color={user.color} />
      <Text style={[styles.text, textStyle]}>{user.name}</Text>
      <DayIcon day="Su" timeRange="9 AM - 5 PM" size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  shiftWrapper: {
    alignItems: 'center',
    gap: 30,
  },
  text: {
    fontSize: 14,
  },
});
