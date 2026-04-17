import { ShiftEditForm, ShiftInformation, ShiftsView } from '@/features';
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
  RoleInfo,
  ShiftsGroup,
} from '@/services';
import { DateNavigator, Header, PlusSign, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function Shifts() {
  const [isModalPressed, setIsModalPressed] = useState(false);
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

  async function handleSaveAllChanges(payload: EditShiftRequest, shiftId: string) {
    try {
      setIsLoading(true);
      setError(null);

      if (selectedShiftId) {
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

      setIsModalPressed(false);
      setSelectedShiftId(undefined);
      setIsCreateMode(false);
    } catch (err) {
      setError(selectedShiftId ? 'Failed to edit shift' : 'Failed to create shift');
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
                setIsModalPressed(true);
              }}
            >
              <PlusSign size={29} />
            </Pressable>
          </View>
        }
      />
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
          setIsModalPressed(true);
        }}
      />
      {isModalPressed && modalShiftInfo && (
        <ShiftEditForm
          key={selectedShiftId ?? (isCreateMode ? 'create' : 'none')}
          rolesInfo={roles}
          editButtonPressed={isModalPressed}
          shiftInfo={modalShiftInfo}
          targetDate={currentWeekStart}
          onSaveAllChanges={handleSaveAllChanges}
          onExit={() => {
            setIsModalPressed(false);
            setSelectedShiftId(undefined);
            setIsCreateMode(false);
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
