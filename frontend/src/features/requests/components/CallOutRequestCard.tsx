import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
import { PersonData } from '../../types';
import { CallOutRequestDetails, CallOutRequestPurpose } from './CallOutRequestDetails';

type CallOutRequestCardProps = {
  purpose: CallOutRequestPurpose;
  user: PersonData;
  expanded: boolean;
  onToggle: () => void;
};

export function CallOutRequestCard({ purpose, user, expanded, onToggle }: CallOutRequestCardProps) {
  return (
    <Card>
      {/* Temporary conditional rendering - will need to animate in future */}
      {expanded ? (
        <CallOutRequestDetails purpose={purpose} user={user} />
      ) : (
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader title={user.name} avatar={<Avatar name={user.name} />} />
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
