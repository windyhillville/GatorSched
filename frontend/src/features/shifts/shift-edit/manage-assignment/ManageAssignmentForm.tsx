import { AssignmentInfo, ManageAssignmentRequest } from '@/services';
import { AvatarSelector, Button, ExitButton, Header } from '@/ui';
import { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ShiftModalShell } from '../../ShiftModalShell';

type ManageAssignmentFormProps = {
  assignedEmployees: AssignmentInfo[];
  availableEmployees: AssignmentInfo[];
  manageAssignmentPressed: boolean;
  selectedShiftId?: string;
  onSaveAssignment: (payload: ManageAssignmentRequest, shiftId: string) => Promise<void>;
  onExit: () => void;
};

export function ManageAssignmentForm({
  assignedEmployees,
  availableEmployees,
  manageAssignmentPressed,
  selectedShiftId,
  onSaveAssignment,
  onExit,
}: ManageAssignmentFormProps) {
  const [selectedAssignedIds, setSelectedAssignedIds] = useState<Record<string, boolean>>({});
  const [selectedAvailableIds, setSelectedAvailableIds] = useState<Record<string, boolean>>({});

  const originalAssignedIds = useMemo(
    () => assignedEmployees.map((employee) => employee.employeeId),
    [assignedEmployees],
  );

  const idsToRemove = Object.keys(selectedAssignedIds).filter((id) => selectedAssignedIds[id]);
  const idsToAdd = Object.keys(selectedAvailableIds).filter((id) => selectedAvailableIds[id]);

  const finalAssignedIds = [
    ...originalAssignedIds.filter((id) => !idsToRemove.includes(id)),
    ...idsToAdd,
  ];

  const hasChanges = idsToRemove.length > 0 || idsToAdd.length > 0;

  function handleSaveAllChanges() {
    if (!selectedShiftId) return;

    onSaveAssignment(
      {
        employeeIds: finalAssignedIds,
      },
      selectedShiftId,
    );
  }

  return (
    <ShiftModalShell isActivated={manageAssignmentPressed} style={{ height: 700 }}>
      <View style={styles.exitButtonWrapper}>
        <View style={styles.exitButtonInnerContainer}>
          <ExitButton size={20} onExit={onExit} />
        </View>
      </View>

      <Header title="Manage Assignment" type={'medium'} />

      <View style={styles.assignmentOuterContainer}>
        <View style={styles.assignmentCard}>
          <Text style={styles.assignmentText}>Remove Assignment</Text>
          {assignedEmployees.length === 0 ? (
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ opacity: 0.5 }}>No Assigned Employees</Text>
            </View>
          ) : (
            <AvatarSelector
              avatars={assignedEmployees.map((assigned) => ({
                id: assigned.employeeId,
                name: assigned.employeeName,
                color: assigned.color,
                avatarUrl: assigned.avatarUrl ?? '',
              }))}
              selectedIds={selectedAssignedIds}
              onChangeSelectedIds={setSelectedAssignedIds}
              size="xxSmall"
            />
          )}
        </View>

        <View style={styles.assignmentCard}>
          <Text style={styles.assignmentText}>Add Assignment</Text>
          {availableEmployees.length === 0 ? (
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ opacity: 0.5 }}>No Available Employees</Text>
            </View>
          ) : (
            <AvatarSelector
              avatars={availableEmployees.map((available) => ({
                id: available.employeeId,
                name: available.employeeName,
                color: available.color,
                avatarUrl: available.avatarUrl ?? '',
              }))}
              selectedIds={selectedAvailableIds}
              onChangeSelectedIds={setSelectedAvailableIds}
              size="xxSmall"
            />
          )}
        </View>
      </View>

      <View style={styles.buttonOuterContainer}>
        <View style={styles.buttonInnerContainer}>
          <Button
            title={'Save All Changes'}
            shape={'rounded'}
            onPress={handleSaveAllChanges}
            disabled={!hasChanges}
          />
        </View>
      </View>
    </ShiftModalShell>
  );
}

const styles = StyleSheet.create({
  exitButtonWrapper: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        // paddingTop: 10,
        left: 340,
      },
      android: {
        // paddingTop: 12,
        left: 330,
      },
    }),
  },
  exitButtonInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E33333',
  },

  assignmentOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  assignmentCard: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    paddingTop: 16,
    minHeight: 200,
  },
  assignmentTextContainer: {},
  assignmentText: {
    fontSize: 18,
    fontWeight: 500,
  },
  buttonOuterContainer: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInnerContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 32,
  },
  avatarStyle: {
    borderWidth: 0,
  },
});
