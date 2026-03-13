import { DaySchedulerView, RoleGroup } from '@/features/manager-scheduler';
import { Header, Screen } from '@/ui';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

// MOCK DATA
const groups: RoleGroup[] = [
  {
    role: 'Server',
    shifts: [
      {
        id: '1',
        employeeName: 'Benjamin Davidson',
        startLabel: '6 AM',
        endLabel: '1 PM',
        color: 'lightblue',
      },
      {
        id: '2',
        employeeName: 'Dominick Consiglio',
        startLabel: '11 AM',
        endLabel: '5 PM',
        color: 'lightgreen',
      },
      {
        id: '3',
        employeeName: 'Daniel Moody',
        startLabel: '1 PM',
        endLabel: '8 PM',
        color: 'skyblue',
      },
    ],
  },
  {
    role: 'Cook',
    shifts: [
      {
        id: '4',
        employeeName: 'Ron Don',
        startLabel: '7 AM',
        endLabel: '2 PM',
        color: 'lightpink',
      },
      {
        id: '5',
        employeeName: 'Johnny Johnson',
        startLabel: '2 PM',
        endLabel: '10 PM',
        color: 'peachpuff',
      },
    ],
  },
];

export default function Scheduler() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Server: true,
    Cook: true,
  });
  return (
    <Screen insetTop>
      <Header title="Scheduler" />
      <DaySchedulerView
        groups={groups}
        dayLabel="Sunday"
        dateLabel="March 15th"
        expandedSections={expandedSections}
        onToggleSection={(role) =>
          setExpandedSections((prev) => ({
            ...prev,
            [role]: !(prev[role] ?? false),
          }))
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  schedulerWrapper: {
    paddingVertical: 24,
    gap: 16,
  },
});
