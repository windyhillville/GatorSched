import { AvatarOption, AvatarSelector, Button, Checkmark, Exclamation } from '@/ui';
import { StyleSheet, Text, View } from 'react-native';
import { StaffingInformation } from '../types';

// MOCK DATA
// const EMPLOYEES_ASSIGNED: AvatarOption[] = [
//   { id: '1', name: 'Ben Davidson', color: '#ca5252' },
//   { id: '2', name: 'Dominick Consiglio', color: '#70ca52' },
//   { id: '3', name: 'Danieal Moody', color: '#ca52be' },
// ];

type ShiftDetailsProps = {
  shiftId: string;
  avatars: AvatarOption[];
  staffingInfo: StaffingInformation;
  onEditShift: (shiftId: string) => void;
};

export function ShiftDetails({ shiftId, avatars, staffingInfo, onEditShift }: ShiftDetailsProps) {
  const isFullyStaffed = staffingInfo.numberOfAssignments >= staffingInfo.staffingRequirement;

  const isUnassigned = staffingInfo.numberOfAssignments === 0;

  const isUnderstaffed = !isFullyStaffed && staffingInfo.numberOfAssignments > 0;

  const shortage = staffingInfo.underStaffedAmount;

  const icon =
    staffingInfo.numberOfAssignments >= staffingInfo.staffingRequirement ? (
      <Checkmark />
    ) : staffingInfo.numberOfAssignments === 0 ? (
      <Exclamation size={36} />
    ) : (
      <Exclamation size={36} color="#F16E00" />
    );
  return (
    <View style={styles.detailsWrapper}>
      {icon}

      <View
        style={
          isFullyStaffed ? styles.fullyStaffedDetailsContainer : styles.notStaffedDetailsContainer
        }
      >
        {isFullyStaffed ? (
          <AvatarSelector
            avatars={avatars}
            disabled={true}
            contentContainerStyle={styles.contentContainer}
          />
        ) : isUnassigned ? (
          <View>
            <Text style={styles.informationText}>No employees assigned yet</Text>
          </View>
        ) : (
          <View>
            <View style={{ gap: 24 }}>
              <Text style={styles.informationText}>
                <Text style={styles.boldText}>{shortage}</Text>{' '}
                {shortage === 1
                  ? 'more employee needs to be assigned'
                  : 'more employees need to be assigned'}
              </Text>
              <AvatarSelector
                avatars={avatars}
                disabled={true}
                contentContainerStyle={styles.contentContainer}
              />
            </View>
          </View>
        )}
      </View>

      <View
        style={isFullyStaffed ? styles.fullyStaffedButtonWrapper : styles.notStaffedButtonWrapper}
      >
        <View style={styles.buttonContainer}>
          <Button title="Edit Shift" shape="rounded" onPress={() => onEditShift(shiftId)} />
          <Button title="Manage Assignment" shape="rounded" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsWrapper: {
    alignItems: 'center',
    marginTop: 45,
  },
  fullyStaffedDetailsContainer: {
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  notStaffedDetailsContainer: {
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  informationText: {
    fontSize: 18,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  fullyStaffedButtonWrapper: {
    width: '100%',
    marginTop: 45,
    marginBottom: 24,
    alignItems: 'center',
  },
  notStaffedButtonWrapper: {
    width: '100%',
    marginTop: 45,
    marginBottom: 24,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 250,
    gap: 12,
  },
  boldText: {
    fontWeight: '700',
  },
});
