import { getDateFromDayKey } from '@/features/utils';
import { EditShiftRequest, RoleInfo } from '@/services';
import { Button, ExitButton, Header, TimeValue } from '@/ui';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ShiftModalShell } from '../ShiftModalShell';
import { ShiftInformation } from '../types';
import { DaySelectionStep } from './DaySelectionStep';
import { RoleStep } from './RoleStep';
import { ShiftModalNavigator } from './ShiftModalNavigator';
import { StaffingStep } from './StaffingStep';
import { TimeSelectionStep } from './TimeSelectionStep';
import { POSSIBLE_SELECTED_DAYS } from './dayOptions';

export type ActiveViewOption = 'day' | 'time' | 'staffing' | 'role';

type ShiftEditFormProps = {
  shiftInfo: ShiftInformation;
  rolesInfo: RoleInfo[];
  editButtonPressed: boolean;
  targetDate: string;
  onSaveAllChanges: (payload: EditShiftRequest, shiftId: string) => Promise<void>;
  onExit: () => void;
};

export function ShiftEditForm({
  shiftInfo,
  rolesInfo,
  editButtonPressed,
  targetDate,
  onSaveAllChanges,
  onExit,
}: ShiftEditFormProps) {
  // const [isModalPressed, setIsModalPressed] = useState(false);
  const [activeView, setActiveView] = useState<ActiveViewOption>('day');
  const [selectedDayKey, setSelectedDayKey] = useState<string | undefined>(shiftInfo.dayKey);
  const selectedDay = POSSIBLE_SELECTED_DAYS[selectedDayKey ?? 'None'];
  const [staffingRequirement, setStaffingRequirement] = useState(shiftInfo.staffingRequirement);
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(shiftInfo.roleId);
  const [startTime, setStartTime] = useState<TimeValue>({
    // Will replace these with reponse after backend set up
    hour: shiftInfo.startTime.hour,
    minute: shiftInfo.startTime.minute,
    period: shiftInfo.startTime.period,
  });

  const [endTime, setEndTime] = useState<TimeValue>({
    // Will replace these with response after backend set up
    hour: shiftInfo.endTime.hour,
    minute: shiftInfo.endTime.minute,
    period: shiftInfo.endTime.period,
  });

  function handleSavePress() {
    if (!selectedRoleId || !selectedDayKey) {
      return;
    }

    const computedDate = getDateFromDayKey(targetDate, selectedDayKey);
    onSaveAllChanges(
      {
        date: computedDate,
        startTime: {
          hour: startTime.hour,
          minute: startTime.minute,
          period: startTime.period,
        },
        endTime: {
          hour: endTime.hour,
          minute: endTime.minute,
          period: endTime.period,
        },
        roleId: selectedRoleId,
        staffingRequirement: parseInt(staffingRequirement || '1', 10),
      },
      shiftInfo.id,
    );
  }

  return (
    <ShiftModalShell isActivated={editButtonPressed}>
      <View style={styles.exitButtonWrapper}>
        <View style={styles.exitButtonInnerContainer}>
          <ExitButton size={20} onExit={onExit} />
        </View>
      </View>
      <Header title="What would you like to change?" type={'small'} />
      <ShiftModalNavigator onSelectView={(icon) => setActiveView(icon)} selectedIcon={activeView} />

      <View style={styles.content}>
        {activeView === 'day' ? (
          <DaySelectionStep selectedDay={selectedDayKey} onSelectDay={setSelectedDayKey} />
        ) : activeView === 'time' ? (
          <TimeSelectionStep
            dayLabel={selectedDay.longLabel}
            start={startTime}
            end={endTime}
            onChangeStart={setStartTime}
            onChangeEnd={setEndTime}
          />
        ) : activeView === 'staffing' ? (
          <StaffingStep
            value={staffingRequirement}
            onChangeStaffingRequirement={setStaffingRequirement}
          />
        ) : (
          <RoleStep
            selectedRoleId={selectedRoleId}
            onChangeId={setSelectedRoleId}
            roles={rolesInfo}
          />
        )}
      </View>

      {/* <View style={styles.innerModalContainer}>
        <Pressable onPress={() => setIsModalPressed(false)}>
          <View style={styles.button}>
            <Text>Close Modal</Text>
          </View>
        </Pressable>
      </View> */}
      <View style={styles.buttonOuterContainer}>
        <View style={styles.buttonInnerContainer}>
          <Button title={'Save All Changes'} shape={'rounded'} onPress={handleSavePress} />
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
        paddingTop: 10,
        left: 355,
      },
      android: {
        paddingTop: 12,
        left: 344,
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
  buttonOuterContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonInnerContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 32,
  },
  innerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
