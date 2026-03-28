import { PersonData } from '@/features/types';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
import { ScheduleInfoDetails } from './ScheduleInfoDetails';

type ScheduleInfoCardProps = {
  user: PersonData;
  totalHours: number;
  expanded: boolean;
  onToggle: () => void;
  //   onViewSchedule: () => void;
  //   onSelectDay: () => void;
};
export function ScheduleInfoCard({
  user,
  totalHours,
  expanded,
  onToggle,
  //   onViewSchedule,
  //   onSelectDay,
}: ScheduleInfoCardProps) {
  return (
    <Card>
      <Pressable onPress={onToggle} style={styles.pressable}>
        <ExpandableCardHeader title={user.name} avatar={<Avatar name={user.name} />} />
      </Pressable>
      {expanded && (
        <ScheduleInfoDetails
          name={user.name}
          totalHours={totalHours}
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
