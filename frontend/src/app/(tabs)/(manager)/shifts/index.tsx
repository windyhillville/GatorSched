import { ManageAssignmentForm, ShiftEditForm, ShiftInformation, ShiftsView } from '@/features';
import {
  // formatDisplayDate,
  // getDateFromWeekStartAndIndex,
  getNextWeekStart,
  getPreviousWeekStart,
  getWeekBoundsLabel,
  getWeekStart,
} from '@/features/utils';
import { useToday } from '@/hooks';
import {
  createShift,
  editShift,
  EditShiftRequest,
  getShifts,
  manageAssignment,
  ManageAssignmentRequest,
  RoleInfo,
  ShiftsGroup,
} from '@/services';
import { DateNavigator, Header, PlusSign, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

export default function Shifts() {
  const [isEditShiftModalPressed, setIsEditShiftModalPressed] = useState(false);
  const [isManageAssignmentModalPressed, setIsManageAssignmentModalPressed] = useState(false);
  const [groups, setGroups] = useState<ShiftsGroup[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedShiftId, setSelectedShiftId] = useState<string | undefined>();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));

  // const date = '2026-03-15';
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchShifts() {
        try {
          setIsLoading(true);
          setError(null);

          const data = await getShifts(currentWeekStart);

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
            setError('Failed to load shifts');
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
    }, [currentWeekStart]), // Refetches if the user changes the date while on the screen
  );

  async function handleSaveShiftChanges(payload: EditShiftRequest, shiftId: string) {
    try {
      setIsLoading(true);
      setError(null);

      if (selectedShiftId && isEditShiftModalPressed) {
        await editShift(payload, shiftId);
      } else {
        await createShift(payload);
      }

      const data = await getShifts(currentWeekStart);
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

      setIsEditShiftModalPressed(false);
      setIsManageAssignmentModalPressed(false);
      setSelectedShiftId(undefined);
      setIsCreateMode(false);
    } catch (err) {
      setError(selectedShiftId ? 'Failed to edit shift' : 'Failed to create shift');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveAssignmentChanges(payload: ManageAssignmentRequest, shiftId: string) {
    try {
      setIsLoading(true);
      setError(null);

      await manageAssignment(payload, shiftId);

      const data = await getShifts(currentWeekStart);
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

      setIsEditShiftModalPressed(false);
      setIsManageAssignmentModalPressed(false);
      setSelectedShiftId(undefined);
      setIsCreateMode(false);
    } catch (err) {
      setError('Failed to edit assignment');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const rawShift = groups.flatMap((g) => g.shifts).find((s) => s.id === selectedShiftId);
  const defaultRole = roles[0] ?? null;

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

  const createShiftInfo: ShiftInformation | null =
    isCreateMode && defaultRole
      ? {
          id: 'new-shift',
          dayKey: 'Sun',
          shortDayLabel: 'Su',
          longDayLabel: 'Sunday',
          startTime: { hour: '09', minute: '00', period: 'AM' },
          endTime: { hour: '05', minute: '00', period: 'PM' },
          staffingRequirement: '1',
          roleId: defaultRole.id,
          roleName: defaultRole.name,
          roleColor: defaultRole.color,
        }
      : null;

  const manageAssignmentInfo = rawShift && {
    assignedEmployees: rawShift.assignedEmployees,
    availableEmployees: rawShift.availableEmployees,
  };

  const modalShiftInfo = selectedShiftInfo ?? createShiftInfo;

  return (
    <Screen insetTop>
      <Header
        title={'Shifts'}
        right={
          <View style={{ paddingRight: 12 }}>
            <Pressable
              onPress={() => {
                setSelectedShiftId(undefined);
                setIsCreateMode(true);
                setIsEditShiftModalPressed(true);
              }}
            >
              <PlusSign size={29} />
            </Pressable>
          </View>
        }
      />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={36} />
        </View>
      ) : (
        <>
          <View style={{ paddingTop: 32 }}>
            <DateNavigator
              label={getWeekBoundsLabel(currentWeekStart)}
              onPrevious={() => setCurrentWeekStart((prevWeek) => getPreviousWeekStart(prevWeek))}
              onNext={() => setCurrentWeekStart((prevWeek) => getNextWeekStart(prevWeek))}
            />
          </View>
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
              setIsCreateMode(false);
              setSelectedShiftId(shiftId);
              setIsManageAssignmentModalPressed(false);
              setIsEditShiftModalPressed(true);
            }}
            onManageAssignment={(shiftId: string) => {
              setIsCreateMode(false);
              setSelectedShiftId(shiftId);
              setIsEditShiftModalPressed(false);
              setIsManageAssignmentModalPressed(true);
            }}
          />
        </>
      )}

      {isEditShiftModalPressed && modalShiftInfo && (
        <ShiftEditForm
          key={selectedShiftId ?? (isCreateMode ? 'create' : 'none')}
          rolesInfo={roles}
          editButtonPressed={isEditShiftModalPressed}
          shiftInfo={modalShiftInfo}
          targetDate={currentWeekStart}
          isCreatingShift={isCreateMode}
          onSaveShift={handleSaveShiftChanges}
          onExit={() => {
            setIsEditShiftModalPressed(false);
            setSelectedShiftId(undefined);
            setIsCreateMode(false);
          }}
        />
      )}

      {isManageAssignmentModalPressed && manageAssignmentInfo && (
        <ManageAssignmentForm
          assignedEmployees={manageAssignmentInfo.assignedEmployees}
          availableEmployees={manageAssignmentInfo.availableEmployees}
          manageAssignmentPressed={isManageAssignmentModalPressed}
          selectedShiftId={selectedShiftId}
          onSaveAssignment={handleSaveAssignmentChanges}
          onExit={() => {
            setIsManageAssignmentModalPressed(false);
            setSelectedShiftId(undefined);
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
});
