import { Checkmark, Exclamation, ShiftDurationBar, TrashCan } from '@/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import { StaffingInformation } from '../types';

type ShiftCardHeader = {
  shiftId: string;
  fromTime: string;
  toTime: string;
  longDayLabel: string;
  roleColor: string;
  expanded?: boolean;
  staffingInfo: StaffingInformation;
  onTapHeader?: () => void;
  onTapDelete?: (id: string) => void;
};

export function ShiftCardHeader({
  shiftId,
  fromTime,
  toTime,
  longDayLabel,
  roleColor,
  expanded,
  staffingInfo,
  onTapHeader,
  onTapDelete,
}: ShiftCardHeader) {
  const icon =
    staffingInfo.numberOfAssignments >= staffingInfo.staffingRequirement ? (
      <Checkmark />
    ) : staffingInfo.numberOfAssignments === 0 ? (
      <Exclamation size={36} />
    ) : (
      <Exclamation size={36} color="#F16E00" />
    );
  return (
    <View style={styles.container}>
      <Pressable style={styles.leftSlot} onPress={onTapHeader}>
        {!expanded && icon}
      </Pressable>

      <Pressable style={styles.centerPressable} onPress={onTapHeader}>
        <ShiftDurationBar
          fromTime={fromTime}
          toTime={toTime}
          longLabel={longDayLabel}
          barColor={roleColor}
          compact
          barHeight={24}
          dayTextStyle={styles.dayText}
        />
      </Pressable>

      {/* WILL need shift/assignment id for deletion */}
      <Pressable style={styles.rightSlot} onPress={() => onTapDelete?.(shiftId)}>
        {!expanded && <TrashCan />}
        {/* <View style={styles.debugBox} /> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  leftSlot: {
    width: 50,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSlot: {
    width: 50,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debugBox: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
  },
  dayText: {
    fontSize: 21,
    fontWeight: '600',
  },
});
