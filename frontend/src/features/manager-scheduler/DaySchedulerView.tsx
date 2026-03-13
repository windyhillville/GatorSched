import { AccordionSection, DateNavigator } from '@/ui';
import { StyleSheet, View } from 'react-native';
import { EmployeeShiftRow } from './components';

type ShiftItem = {
  id: string;
  employeeName: string;
  avatarUri?: string;
  startLabel: string;
  endLabel: string;
  color: string;
};

export type RoleGroup = {
  role: string;
  shifts: ShiftItem[];
};

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
      <View style={styles.accordionGroup}>
        {groups.map((group) => (
          <AccordionSection
            key={group.role}
            title={group.role}
            expanded={expandedSections[group.role]}
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
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingTop: 24,
  },
  accordionGroup: {
    gap: 16,
    // width: '100%',
  },
});
