import { Button, Header, TimeValue } from '@/ui';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ShiftModalShell } from '../ShiftModalShell';
import { DaySelectionStep } from './DaySelectionStep';
import { RoleStep } from './RoleStep';
import { ShiftModalNavigator } from './ShiftModalNavigator';
import { StaffingStep } from './StaffingStep';
import { TimeSelectionStep } from './TimeSelectionStep';
import { SHIFT_DAY_OPTIONS } from './dayOptions';

export type ActiveViewOption = 'day' | 'time' | 'staffing' | 'role';

type ShiftsDetailsFormProps = {
  editButtonPressed: boolean;
};

export function ShiftsDetailsForm({ editButtonPressed }: ShiftsDetailsFormProps) {
  // const [isModalPressed, setIsModalPressed] = useState(false);
  const [activeView, setActiveView] = useState<ActiveViewOption>('day');
  const [selectedDayKey, setSelectedDayKey] = useState<string | undefined>();
  const selectedDay = SHIFT_DAY_OPTIONS.find((day) => selectedDayKey === day.key);
  const [staffingRequirement, setStaffingRequirement] = useState('1');
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const [startTime, setStartTime] = useState<TimeValue>({
    // Will replace these with reponse after backend set up
    hour: '09',
    minute: '00',
    period: 'AM',
  });

  const [endTime, setEndTime] = useState<TimeValue>({
    // Will replace these with response after backend set up
    hour: '05',
    minute: '00',
    period: 'PM',
  });

  return (
    <ShiftModalShell isActivated={editButtonPressed}>
      <Header title="What would you like to change?" type={'small'} />
      <ShiftModalNavigator onSelectView={(icon) => setActiveView(icon)} selectedIcon={activeView} />

      <View style={styles.content}>
        {activeView === 'day' ? (
          <DaySelectionStep selectedDay={selectedDayKey} onSelectDay={setSelectedDayKey} />
        ) : activeView === 'time' ? (
          <TimeSelectionStep
            dayLabel={selectedDay?.label ?? 'No Day Selected'}
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
          <RoleStep selectedRoleId={selectedRoleId} onChangeId={setSelectedRoleId} />
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
          <Button title={'Save All Changes'} shape={'rounded'} />
        </View>
      </View>
    </ShiftModalShell>
  );
}

const styles = StyleSheet.create({
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
