import { AvatarOption, AvatarSelector, DayItem } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';
import { ShiftSelectionStep } from './ShiftSelectionStep';

type TeammateInfoStepProps = {
  teammates: AvatarOption[];
  shifts?: DayItem[];
  selectedTeammate?: string;
  onSelectTeammate: (id: string) => void;
  selectedAssignmentId?: string;
  onSelectShift?: (assignmentId: string) => void;
};

export function TeammateInfoStep({
  teammates,
  shifts,
  selectedTeammate,
  onSelectTeammate,
  selectedAssignmentId,
  onSelectShift,
}: TeammateInfoStepProps) {
  return (
    <View style={styles.container}>
      <AvatarSelector
        avatars={teammates}
        selectionType="single"
        selectedId={selectedTeammate}
        onChangeSelectedId={onSelectTeammate}
      />

      <View style={styles.teammateInfoContainer}>
        {!selectedTeammate ? (
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>Select a teammate to view available shifts</Text>
          </View>
        ) : shifts && shifts.length > 0 ? (
          <ShiftSelectionStep
            shifts={shifts}
            selectedAssignmentId={selectedAssignmentId}
            onSelectShift={onSelectShift}
          />
        ) : (
          <View style={styles.infoTextContainer}>
            <Text>No available shifts</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    // paddingVertical: 24,
  },
  teammateInfoContainer: {
    // backgroundColor: 'red',
    flexShrink: 1,
  },
  infoTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F4F5F7',
    borderColor: '#D0D5DD',
    padding: 12,
  },
  infoText: {
    color: '#344054',
  },
});
