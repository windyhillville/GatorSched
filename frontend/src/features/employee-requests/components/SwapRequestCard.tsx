import { PersonData, ShiftData } from '@/features/types';
import { useCardSelectionTransition } from '@/hooks';
import { Avatar, Card, ExpandableCardHeader } from '@/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import Animate from 'react-native-reanimated';
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
  const { setMeasuredDetailHeight, setMeasuredHeaderHeight, detailStyle, headerStyle } =
    useCardSelectionTransition(expanded);
  return (
    <Card>
      {/* ANIMATED CONTENT */}
      <Animate.View style={[styles.animatedContainer, headerStyle]}>
        <Pressable onPress={onToggle} style={styles.pressable}>
          <ExpandableCardHeader
            title={fromUser.name}
            avatar={<Avatar name={fromUser.name} img={fromUser.avatarUrl} color={fromUser.color} />}
            trailingSpace="compact"
          />
        </Pressable>
      </Animate.View>

      {/* ANIMATED CONTENT */}
      <Animate.View style={[styles.animatedContainer, detailStyle]}>
        <SwapRequestDetails
          purpose={purpose}
          fromUser={fromUser}
          toUser={toUser}
          fromShift={fromShift}
          toShift={toShift}
        />
      </Animate.View>

      {/* Hidden measurer for header height*/}
      <View
        onLayout={(e) => setMeasuredHeaderHeight(e.nativeEvent.layout.height)}
        style={styles.measurer}
      >
        <ExpandableCardHeader
          title={fromUser.name}
          avatar={<Avatar name={fromUser.name} img={fromUser.avatarUrl} color={fromUser.color} />}
          style={{ paddingHorizontal: 8, paddingVertical: 8 }}
          trailingSpace="compact"
        />
      </View>

      {/* Hidden measurer for detail height */}
      <View
        style={styles.measurer}
        onLayout={(e) => setMeasuredDetailHeight(e.nativeEvent.layout.height)}
        pointerEvents="none"
      >
        <SwapRequestDetails
          purpose={purpose}
          fromUser={fromUser}
          toUser={toUser}
          fromShift={fromShift}
          toShift={toShift}
        />
      </View>

      {expanded && <Pressable style={styles.topHitArea} onPress={onToggle} />}
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
