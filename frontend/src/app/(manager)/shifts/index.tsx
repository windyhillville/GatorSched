import { ShiftEditForm, ShiftInformation, ShiftsView } from '@/features';
import { editShift, EditShiftRequest, getShifts, RoleInfo, ShiftsGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Shifts() {
  const [isModalPressed, setIsModalPressed] = useState(false);
  const [groups, setGroups] = useState<ShiftsGroup[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedShiftId, setSelectedShiftId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const date = '2026-03-15';
  useEffect(() => {
    async function fetchRoster() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getShifts(date);
        setGroups(data.groups);
        setRoles(data.roles);

        const initialExpandedState = Object.fromEntries(
          data.groups.map((group) => [group.role, true]),
        );
        setExpandedSections(initialExpandedState);
      } catch (err) {
        setError('Failed to load roster');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoster();
  }, [date]);

  async function handleSaveAllChanges(payload: EditShiftRequest, shiftId: string) {
    try {
      setIsLoading(true);
      setError(null);

      await editShift(payload, shiftId);

      const data = await getShifts(date);
      setGroups(data.groups);

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
      />
      {isModalPressed && selectedShiftInfo && (
        <ShiftEditForm
          key={selectedShiftInfo.id}
          rolesInfo={roles}
          editButtonPressed={isModalPressed}
          shiftInfo={selectedShiftInfo}
          targetDate={date}
          onSaveAllChanges={handleSaveAllChanges}
          onExit={() => {
            setIsModalPressed(false);
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
