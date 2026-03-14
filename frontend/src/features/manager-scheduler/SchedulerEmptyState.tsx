import { Button, DateNavigator } from '@/ui';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type SchedulerEmptyStateProps = {
  dayLabel: string;
  dateLabel: string;
  isLoading: boolean;
  onGenerateSchedule: () => void;
};

export function SchedulerEmptyState({
  dayLabel,
  dateLabel,
  isLoading,
  onGenerateSchedule,
}: SchedulerEmptyStateProps) {
  return (
    <View style={styles.emptyContainer}>
      <DateNavigator label={dayLabel} subLabel={dateLabel} />
      <View style={styles.textBlock}>
        <Text style={styles.emptyTitle}>No Schedule Yet</Text>
        <Text style={styles.emptySubtitle}>
          Generate a schedule to view role assignments for the selected day.
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Auto Schedule" shape="pill" color="default" onPress={onGenerateSchedule} />
        )}
      </View>
    </View>
  );
}

// FIXME:: STYLES JUST FOR PRESENTATION
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: 'center',
    gap: 32,
  },
  textBlock: {
    alignItems: 'center',
    gap: 12,
    marginTop: 81, // Needs to be fixed
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 320,
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 220,
  },
});
