import { PersonData } from '@/features/types';
import { TeamMemberSchedule } from '@/services';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
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
  return (
    <Card>
      <Pressable onPress={onToggle} style={styles.pressable}>
        <ExpandableCardHeader
          title={user.name}
          avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
          trailingSpace="compact"
        />
      </Pressable>
      {expanded && (
        <ScheduleInfoDetails
          totalHours={totalHours}
          weeklySchedule={weeklySchedule}
          //   onViewSchedule={onViewSchedule}
          //   onSelectDay={onSelectDay}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  pressable: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 4,
    // paddingVertical: 5,

    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
