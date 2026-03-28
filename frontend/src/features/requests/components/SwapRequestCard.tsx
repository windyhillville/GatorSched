import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
import { PersonData } from '../../types';
import { SwapRequestDetails, SwapRequestPurpose } from './SwapRequestDetails';

type SwapRequestCardProps = {
  purpose: SwapRequestPurpose;
  fromUser: PersonData;
  toUser: PersonData;
  expanded: boolean;
  onToggle: () => void;
};

export function SwapRequestCard({
  purpose,
  fromUser,
  toUser,
  expanded,
  onToggle,
}: SwapRequestCardProps) {
  return (
    <Card>
      {/* Temporary conditional rendering - will need to animate in future */}
      {expanded ? (
        <SwapRequestDetails purpose={purpose} fromUser={fromUser} toUser={toUser} />
      ) : (
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader title={fromUser.name} avatar={<Avatar name={fromUser.name} />} />
        </Pressable>
      )}

      {/* We will use this format when implementing animations */}
      {/* <ExpandableCardHeader
        title={fromUser.name}
        avatar={<Avatar name={fromUser.name} />}
        onToggle={onToggle}
      /> */}
      {/* {expanded && <SwapRequestDetails purpose={purpose} fromUser={fromUser} toUser={toUser} />} */}
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
