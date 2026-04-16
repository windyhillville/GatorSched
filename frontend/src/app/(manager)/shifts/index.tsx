import { ShiftEditForm, ShiftInformation, ShiftsView } from '@/features';
import {
  createShift,
  editShift,
  EditShiftRequest,
  getShifts,
  RoleInfo,
  ShiftsGroup,
} from '@/services';
import { Header, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Shifts() {
  const [isModalPressed, setIsModalPressed] = useState(false);
  const [groups, setGroups] = useState<ShiftsGroup[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedShiftId, setSelectedShiftId] = useState<string | undefined>();
  const [createRole, setCreateRole] = useState<RoleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const date = '2026-03-15';
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchShifts() {
        try {
          setIsLoading(true);
          setError(null);

          const data = await getShifts(date);

          if (isActive) {
            setGroups(data.groups);
            setRoles(data.roles);

            const initialExpandedState = Object.fromEntries(
              data.groups.map((group) => [group.role, true]),
            );
            setExpandedSections(initialExpandedState);
          }
        } catch (err) {
          if (isActive) {
            setError('Failed to load roster');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      fetchShifts();

      return () => {
        isActive = false; // Prevents state updates after navigating away
      };
    }, [date]), // Refetches if the user changes the date while on the screen
  );

  async function handleSaveAllChanges(payload: EditShiftRequest, shiftId: string) {
    try {
      setIsLoading(true);
      setError(null);

      if (selectedShiftId) {
        await editShift(payload, shiftId);
      } else {
        await createShift(payload);
      }

      const data = await getShifts(date);
      setGroups(data.groups);
      setRoles(data.roles);

      const initialExpandedSections = Object.fromEntries(
        data.groups.map((group) => [group.role, true]),
      );
      setExpandedSections(initialExpandedSections);

      setExpandedCards((prev) => ({
        ...prev,
        [shiftId]: false,
      }));

      setIsModalPressed(false);
      setSelectedShiftId(undefined);
      setCreateRole(null);
    } catch (err) {
      setError('Failed to edit shift');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const rawShift = groups.flatMap((g) => g.shifts).find((s) => s.id === selectedShiftId);

  const selectedShiftInfo: ShiftInformation | null = rawShift
    ? {
        id: rawShift.id,
        dayKey: rawShift.dayKey,
        shortDayLabel: rawShift.shortDayLabel,
        longDayLabel: rawShift.longDayLabel,
        startTime: { ...rawShift.startTime },
        endTime: { ...rawShift.endTime },
        staffingRequirement: String(rawShift.staffingRequirement),
        roleId: rawShift.role.id,
        roleName: rawShift.role.name,
        roleColor: rawShift.role.color,
      }
    : null;

  const createShiftInfo: ShiftInformation | null = createRole
    ? {
        id: 'new-shift',
        dayKey: 'Sun',
        shortDayLabel: 'Su',
        longDayLabel: 'Sunday',
        startTime: { hour: '09', minute: '00', period: 'AM' },
        endTime: { hour: '05', minute: '00', period: 'PM' },
        staffingRequirement: '1',
        roleId: createRole.id,
        roleName: createRole.name,
        roleColor: createRole.color,
      }
    : null;

  const modalShiftInfo = selectedShiftInfo ?? createShiftInfo;

  return (
    <Screen insetTop>
      <Header title={'Shifts'} />
      {/* VIEW IS ONLY FOR DEBUGGING */}
      <ShiftsView
        groups={groups}
        expandedSections={expandedSections}
        expandedCards={expandedCards}
        onToggleSection={(role) =>
          setExpandedSections((prev) => ({
            ...prev,
            [role]: !(prev[role] ?? false),
          }))
        }
        onToggleCard={(id) =>
          setExpandedCards((prev) => ({
            ...prev,
            [id]: !(prev[id] ?? false),
          }))
        }
        onEditShift={(shiftId: string) => {
          setSelectedShiftId(shiftId);
          setIsModalPressed(true);
        }}
        onAddShift={(roleName: string) => {
          const matchedRole = roles.find((role) => role.name === roleName);
          if (!matchedRole) return;

          setSelectedShiftId(undefined);
          setCreateRole(matchedRole);
          setIsModalPressed(true);
        }}
      />
      {isModalPressed && modalShiftInfo && (
        <ShiftEditForm
          key={selectedShiftId ?? `create-${createRole?.id ?? 'none'}`}
          rolesInfo={roles}
          editButtonPressed={isModalPressed}
          shiftInfo={modalShiftInfo}
          targetDate={date}
          onSaveAllChanges={handleSaveAllChanges}
          onExit={() => {
            setIsModalPressed(false);
            setSelectedShiftId(undefined);
            setCreateRole(null);
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    marginTop: 24,
    gap: 4,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // button: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 80,
  //   width: 250,
  //   backgroundColor: 'lightblue',
  //   marginBottom: 32,
  // },
  // innerModalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
