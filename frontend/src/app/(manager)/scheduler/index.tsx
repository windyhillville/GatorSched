import { DaySchedulerView, SchedulerEmptyState } from '@/features';
import { generateSchedule, RoleGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Scheduler() {
  const [groups, setGroups] = useState<RoleGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetDate = '2026-03-15';

  async function handleAutoSchedule() {
    try {
      setIsLoading(true);
      setError(null);

      const generatedGroups = await generateSchedule(targetDate);
      setGroups(generatedGroups);

      const initialExpandedState = Object.fromEntries(
        generatedGroups.map((group) => [group.role, true]),
      );
      setExpandedSections(initialExpandedState);
    } catch (err) {
      setError('Failed to generate schedule.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const content =
    groups.length === 0 ? (
      <View style={styles.emptyStateWrapper}>
        <SchedulerEmptyState
          dayLabel="Sunday"
          dateLabel="March 15th"
          isLoading={isLoading}
          onGenerateSchedule={handleAutoSchedule}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    ) : (
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
    );

  return (
    <Screen insetTop>
      <Header title="Scheduler" />
      {content}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyStateWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
