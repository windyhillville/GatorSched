import { PersonData, ShiftData } from '@/features/types';
import { Avatar, DayIcon } from '@/ui';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type ShiftSummaryProps = {
  user: PersonData;
  shift: ShiftData;
  textStyle?: StyleProp<TextStyle>;
};

function ShiftSummary({ user, shift, textStyle }: ShiftSummaryProps) {
  return (
    <View style={styles.shiftWrapper}>
      <Avatar name={user.name} img={user.avatarUrl} color={user.color} />
      <Text style={[styles.text, textStyle]}>{user.name}</Text>
      <DayIcon day={shift.day} timeRange={shift.timeRange} size="small" />
    </View>
  );
}

const MemoizedShiftSummary = React.memo(ShiftSummary);

export { MemoizedShiftSummary as ShiftSummary };

const styles = StyleSheet.create({
  shiftWrapper: {
    alignItems: 'center',
    gap: 30,
  },
  text: {
    fontSize: 14,
  },
});
