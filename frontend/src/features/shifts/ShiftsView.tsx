import { ShiftsGroup } from '@/services';
import { AccordionSection } from '@/ui';
import { FlatList, StyleSheet, View } from 'react-native';
import { ShiftCard } from './card';

type ShiftsViewProps = {
  groups: ShiftsGroup[];
  expandedSections: Record<string, boolean>;
  expandedCards: Record<string, boolean>;
  onToggleSection: (role: string) => void;
  onToggleCard: (id: string) => void;
  onEditShift: (shiftId: string) => void;
  onManageAssignment: (shiftId: string) => void;
};

export function ShiftsView({
  groups,
  expandedSections,
  expandedCards,
  onToggleSection,
  onToggleCard,
  onEditShift,
  onManageAssignment,
}: ShiftsViewProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(group) => group.role}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item: group }) => (
          <AccordionSection
            title={group.role}
            expanded={expandedSections[group.role] ?? false}
            onToggle={() => onToggleSection(group.role)}
          >
            <View style={styles.cardsContainer}>
              {group.shifts.map((shift) => (
                <ShiftCard
                  key={shift.id}
                  shiftId={shift.id}
                  assignedEmployees={shift.assignedEmployees.map((e) => ({
                    id: e.employeeId,
                    name: e.employeeName,
                    color: e.color,
                    avatarUrl: e.avatarUrl,
                  }))}
                  fromTime={shift.fromTime}
                  toTime={shift.toTime}
                  longDayLabel={shift.longDayLabel}
                  roleColor={shift.role.color}
                  expanded={expandedCards[shift.id] ?? false}
                  staffingInfo={{
                    staffingRequirement: shift.staffingRequirement,
                    underStaffedAmount: shift.underStaffedAmount,
                    numberOfAssignments: shift.assignedEmployees.length,
                  }}
                  onToggle={() => onToggleCard(shift.id)}
                  onEditShift={onEditShift}
                  onManageAssignment={onManageAssignment}
                />
              ))}
            </View>
          </AccordionSection>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 24,
  },
  listContent: {
    // gap: 16,
    paddingBottom: 32,
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 8,
  },
  accordionContainer: {
    marginTop: 24,
    gap: 4,
  },
});
