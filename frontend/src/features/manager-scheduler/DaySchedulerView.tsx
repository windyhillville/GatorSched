import { RoleGroup } from '@/services';
import { AccordionSection, DateNavigator } from '@/ui';
import { FlatList, StyleSheet, View } from 'react-native';
import { EmployeeShiftRow } from './components';

// type ShiftItem = {
//   id: string;
//   employeeName: string;
//   avatarUri?: string;
//   startLabel: string;
//   endLabel: string;
//   color: string;
// };

// export type RoleGroup = {
//   role: string;
//   shifts: ShiftItem[];
// };

type DaySchedulerViewProps = {
  dateLabel: string;
  dayLabel: string;
  groups: RoleGroup[];
  expandedSections: Record<string, boolean>;
  onToggleSection: (role: string) => void;
  onPreviousDay?: () => void;
  onNextDay?: () => void;
};

export function DaySchedulerView({
  dateLabel,
  dayLabel,
  groups,
  expandedSections,
  onToggleSection,
  onPreviousDay,
  onNextDay,
}: DaySchedulerViewProps) {
  return (
    <View style={styles.container}>
      <DateNavigator
        label={dayLabel}
        subLabel={dateLabel}
        onPrevious={onPreviousDay}
        onNext={onNextDay}
      />
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
            {group.shifts.map((shift) => (
              <EmployeeShiftRow
                key={shift.id}
                name={shift.employeeName}
                startLabel={shift.startLabel}
                endLabel={shift.endLabel}
                color={shift.color}
              />
            ))}
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
});
