import { PersonData, RequestStatus, ShiftData } from '@/features/types';
import { useCardSelectionTransition } from '@/hooks';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import Animate from 'react-native-reanimated';
import { CallOutRequestDetails, CallOutRequestPurpose } from './CallOutRequestDetails';

type CallOutRequestCardProps = {
  purpose: CallOutRequestPurpose;
  user: PersonData;
  shift: ShiftData;
  status: RequestStatus;
  expanded: boolean;
  onToggle: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
};

export function CallOutRequestCard({
  purpose,
  user,
  shift,
  status,
  expanded,
  onToggle,
  onAccept,
  onDecline,
  onApprove,
  onReject,
  onCancel,
}: CallOutRequestCardProps) {
  const { setMeasuredDetailHeight, setMeasuredHeaderHeight, detailStyle, headerStyle } =
    useCardSelectionTransition(expanded);

  return (
    <Card>
      <Animate.View style={[styles.animatedContainer, headerStyle]}>
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader
            title={user.name}
            avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
            trailingSpace="compact"
          />
        </Pressable>
      </Animate.View>

      <Animate.View style={[styles.animatedContainer, detailStyle]}>
        <CallOutRequestDetails purpose={purpose} user={user} shift={shift} status={status} />
      </Animate.View>

      {/* Hidden measurer for header height*/}
      <View
        onLayout={(e) => setMeasuredHeaderHeight(e.nativeEvent.layout.height)}
        style={styles.measurer}
      >
        <ExpandableCardHeader
          title={user.name}
          avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
          style={{ paddingHorizontal: 8, paddingVertical: 8 }}
          trailingSpace="compact"
        />
      </View>

      <View
        style={styles.measurer}
        onLayout={(e) => setMeasuredDetailHeight(e.nativeEvent.layout.height)}
        pointerEvents="none"
      >
        <CallOutRequestDetails
          purpose={purpose}
          user={user}
          shift={shift}
          status={status}
          onAccept={onAccept}
          onDecline={onDecline}
          onCancel={onCancel}
          onApprove={onApprove}
          onReject={onReject}
        />
      </View>

      {expanded && <Pressable style={styles.topHitArea} onPress={onToggle} />}

      {/* Temporary conditional rendering - will need to animate in future */}
      {/* {expanded ? (
        <CallOutRequestDetails purpose={purpose} user={user} shift={shift} />
      ) : (
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader
            title={user.name}
            avatar={<Avatar name={user.name} img={user.avatarUrl} color={user.color} />}
          />
        </Pressable>
      )} */}
    </Card>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  pressable: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  topHitArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  measurer: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
});
