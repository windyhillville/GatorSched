import { TeamGroup } from '@/services';
import { AccordionSection } from '@/ui';
import { FlatList, StyleSheet, View } from 'react-native';
import { ScheduleInfoCard } from './components/ScheduleInfoCard';

type TeamsViewProps = {
  groups: TeamGroup[];
  expandedSections: Record<string, boolean>;
  expandedCards: Record<string, boolean>;
  onToggleSection: (role: string) => void;
  onToggleCard: (id: string) => void;
};

export function TeamsView({
  groups,
  expandedSections,
  expandedCards,
  onToggleSection,
  onToggleCard,
}: TeamsViewProps) {
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
              {group.members.map((member) => (
                <ScheduleInfoCard
                  key={member.id}
                  user={{ name: member.name, avatarUrl: member.avatarUrl, color: member.color }}
                  totalHours={member.totalHours}
                  expanded={expandedCards[member.id] ?? false}
                  weeklySchedule={member.schedule}
                  onToggle={() => onToggleCard(member.id)}
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
});
