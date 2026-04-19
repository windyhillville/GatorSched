import { useCardSelectionTransition } from '@/hooks';
import { AvatarOption, Card } from '@/ui';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StaffingInformation } from '../types';
import { ShiftCardHeader } from './ShiftCardHeader';
import { ShiftDetails } from './ShiftDetails';

type ShiftCardProps = {
  shiftId: string;
  assignedEmployees: AvatarOption[];
  fromTime: string;
  toTime: string;
  longDayLabel: string;
  roleColor: string;
  staffingInfo: StaffingInformation;
  expanded: boolean;
  onToggle?: () => void;
  onTapDelete?: (id: string) => void;
  onEditShift: (shiftId: string) => void;
  onManageAssignment: (shiftId: string) => void;
};

export function ShiftCard({
  shiftId,
  assignedEmployees,
  fromTime,
  toTime,
  longDayLabel,
  roleColor,
  expanded,
  staffingInfo,
  onToggle,
  onTapDelete,
  onEditShift,
  onManageAssignment,
}: ShiftCardProps) {
  const { setMeasuredDetailHeight, detailStyle } = useCardSelectionTransition(expanded);
  return (
    <Card borderRadius={16}>
      <ShiftCardHeader
        shiftId={shiftId}
        fromTime={fromTime}
        toTime={toTime}
        longDayLabel={longDayLabel}
        roleColor={roleColor}
        onTapHeader={onToggle}
        onTapDelete={onTapDelete}
        expanded={expanded}
        staffingInfo={staffingInfo}
      />
      <Animated.View style={[styles.animatedContainer, detailStyle]}>
        <ShiftDetails
          shiftId={shiftId}
          avatars={assignedEmployees}
          staffingInfo={staffingInfo}
          onEditShift={onEditShift}
          onManageAssignment={onManageAssignment}
        />
      </Animated.View>

      <View
        style={styles.measurer}
        onLayout={(e) => setMeasuredDetailHeight(e.nativeEvent.layout.height)}
        pointerEvents="none"
      >
        <ShiftDetails
          shiftId={shiftId}
          avatars={assignedEmployees}
          staffingInfo={staffingInfo}
          onEditShift={onEditShift}
          onManageAssignment={onManageAssignment}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  measurer: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
});
