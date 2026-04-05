import { PersonData, ShiftData } from '@/features/types';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet } from 'react-native';
import { SwapRequestDetails, SwapRequestPurpose } from './SwapRequestDetails';

type SwapRequestCardProps = {
  purpose: SwapRequestPurpose;
  fromUser: PersonData;
  toUser: PersonData;
  fromShift: ShiftData;
  toShift: ShiftData;
  expanded: boolean;
  onToggle: () => void;
};

export function SwapRequestCard({
  purpose,
  fromUser,
  toUser,
  fromShift,
  toShift,
  expanded,
  onToggle,
}: SwapRequestCardProps) {
  return (
    <Card>
      {/* Temporary conditional rendering - will need to animate in future */}
      <Pressable onPress={onToggle} style={[styles.pressable, expanded && styles.expanded]}>
        <ExpandableCardHeader
          title={fromUser.name}
          avatar={<Avatar name={fromUser.name} img={fromUser.avatarUrl} color={fromUser.color} />}
        />
      </Pressable>
      {expanded && (
        <SwapRequestDetails
          purpose={purpose}
          fromUser={fromUser}
          toUser={toUser}
          fromShift={fromShift}
          toShift={toShift}
        />
      )}
      {/* Temporary conditional rendering - will need to animate in future */}
      {/* {expanded ? (
        <SwapRequestDetails
          purpose={purpose}
          fromUser={fromUser}
          toUser={toUser}
          fromShift={fromShift}
          toShift={toShift}
        />
      ) : (
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader
            title={fromUser.name}
            avatar={<Avatar name={fromUser.name} img={fromUser.avatarUrl} color={fromUser.color} />}
          />
        </Pressable>
      )} */}

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
  expanded: {
    position: 'absolute',
    opacity: 0,
  },
});
