import { CreateSwapRequestPayload } from '@/services/requests';
import { AvatarOption, Button, DayItem, Header } from '@/ui';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ShiftSelectionStep } from './ShiftSelectionStep';
import { SwapRequestModalNav } from './SwapRequestModalNav';
import { TeammateInfoStep } from './TeammateInfoStep';
import { SwapRequestActiveOption } from './types';

export type TeammateShiftOptionGroup = {
  teammateId: string;
  shifts: DayItem[];
};

export type CreateSwapRequestFormProps = {
  requesterShifts: DayItem[];
  teammateShiftGroups: TeammateShiftOptionGroup[];
  eligibleTeammates: AvatarOption[];
  onCreateSwap: (payload: CreateSwapRequestPayload) => void;
};

export function CreateSwapRequestForm({
  requesterShifts,
  teammateShiftGroups,
  eligibleTeammates,
  onCreateSwap,
}: CreateSwapRequestFormProps) {
  const [activeView, setActiveView] = useState<SwapRequestActiveOption>('shift');
  const [selectedRequesterAssignmentId, setSelectedRequesterAssignmentId] = useState<
    string | undefined
  >(undefined);
  const [selectedTeammateAssignmentId, setSelectedTeammateAssignmentId] = useState<
    string | undefined
  >(undefined);
  const [selectedTeammateId, setSelectedTeammateId] = useState<string | undefined>(undefined);

  const selectedTeammateShifts =
    teammateShiftGroups.find((group) => group.teammateId === selectedTeammateId)?.shifts ?? [];

  function handleCreateSwap() {
    if (!selectedRequesterAssignmentId || !selectedTeammateAssignmentId) return;

    onCreateSwap({
      requesterAssignmentId: selectedRequesterAssignmentId,
      coverAssignmentId: selectedTeammateAssignmentId,
    });
  }

  const hasFormBeenCompleted =
    selectedRequesterAssignmentId && selectedTeammateAssignmentId ? true : false;

  return (
    <View style={styles.container}>
      <Header title="Create a Swap Request" type="medium" />

      <View style={styles.navWrapper}>
        <SwapRequestModalNav
          selectedIcon={activeView}
          onSelectView={(icon: SwapRequestActiveOption) => setActiveView(icon)}
        />
      </View>

      <View style={styles.contentWrapper}>
        {activeView === 'shift' ? (
          <ShiftSelectionStep
            shifts={requesterShifts}
            selectedAssignmentId={selectedRequesterAssignmentId}
            onSelectShift={(assignmentId: string) => setSelectedRequesterAssignmentId(assignmentId)}
          />
        ) : (
          <TeammateInfoStep
            teammates={eligibleTeammates}
            selectedTeammate={selectedTeammateId}
            shifts={selectedTeammateShifts}
            selectedAssignmentId={selectedTeammateAssignmentId}
            onSelectTeammate={(id) => {
              setSelectedTeammateId(id);
              setSelectedTeammateAssignmentId(undefined);
            }}
            onSelectShift={setSelectedTeammateAssignmentId}
          />
        )}
      </View>

      <View style={styles.buttonOuterContainer}>
        <View style={styles.buttonInnerContainer}>
          <Button
            title="Submit Request"
            shape="rounded"
            onPress={handleCreateSwap}
            disabled={!hasFormBeenCompleted}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
  },
  navWrapper: {
    alignItems: 'center',
    marginTop: 12,
  },
  contentWrapper: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 48,
    // paddingTop: 20,
  },
  buttonOuterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 20,
    paddingBottom: 24,
  },
  buttonInnerContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
