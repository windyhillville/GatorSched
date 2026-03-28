import { Avatar, DayIcon } from '@/ui';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { PersonData } from '../../types';

type ShiftSummaryProps = {
  user: PersonData;
  textStyle?: StyleProp<TextStyle>;
};

export function ShiftSummary({ user, textStyle }: ShiftSummaryProps) {
  return (
    <View style={styles.shiftWrapper}>
      <Avatar
        name={user.name}
        img={user.pfpImg}
        size={user.pfpSize}
        backgroundColor={user.pfpColor}
      />
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
