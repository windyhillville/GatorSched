import { PersonData, ShiftData } from '@/features/types';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
import { CallOutRequestDetails, CallOutRequestPurpose } from './CallOutRequestDetails';

type CallOutRequestCardProps = {
  purpose: CallOutRequestPurpose;
  user: PersonData;
  shift: ShiftData;
  expanded: boolean;
  onToggle: () => void;
};

export function CallOutRequestCard({
  purpose,
  user,
  shift,
  expanded,
  onToggle,
}: CallOutRequestCardProps) {
  return (
    <Card>
      {/* Temporary conditional rendering - will need to animate in future */}
      {expanded ? (
        <CallOutRequestDetails purpose={purpose} user={user} shift={shift} />
      ) : (
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader
            title={user.name}
            avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
          />
        </Pressable>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
