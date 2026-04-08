import { PersonData } from '@/features/types';
import { useCardSelectionTransition } from '@/hooks';
import { TeamMemberSchedule } from '@/services';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ScheduleInfoDetails } from './ScheduleInfoDetails';

type ScheduleInfoCardProps = {
  user: PersonData;
  totalHours: number;
  expanded: boolean;
  weeklySchedule: TeamMemberSchedule[];
  onToggle: () => void;
  //   onViewSchedule: () => void;
  //   onSelectDay: () => void;
};
export function ScheduleInfoCard({
  user,
  totalHours,
  expanded,
  weeklySchedule,
  onToggle,
  //   onViewSchedule,
  //   onSelectDay,
}: ScheduleInfoCardProps) {
  const { setMeasuredDetailHeight, detailStyle } = useCardSelectionTransition(expanded);
  return (
    <Card>
      <Pressable onPress={onToggle} style={styles.pressable}>
        <ExpandableCardHeader
          title={user.name}
          avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
          trailingSpace="compact"
        />
      </Pressable>

      <Animated.View style={[styles.animatedContainer, detailStyle]}>
        <ScheduleInfoDetails
          totalHours={totalHours}
          weeklySchedule={weeklySchedule}
          //   onViewSchedule={onViewSchedule}
          //   onSelectDay={onSelectDay}
        />
      </Animated.View>

      {/* Hidden measurer for detail height */}
      <View
        style={styles.measurer}
        onLayout={(e) => setMeasuredDetailHeight(e.nativeEvent.layout.height)}
        pointerEvents="none"
      >
        <ScheduleInfoDetails
          totalHours={totalHours}
          weeklySchedule={weeklySchedule}
          //   onViewSchedule={onViewSchedule}
          //   onSelectDay={onSelectDay}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  pressable: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 4,
    // paddingVertical: 5,

    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  measurer: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
});
