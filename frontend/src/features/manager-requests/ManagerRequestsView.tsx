import { ManagerRequestCardGroup } from '@/services';
import { AccordionSection } from '@/ui';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SwapRequestCard } from '../employee-requests';

type ManagerRequestsViewProps = {
  groups: ManagerRequestCardGroup[];
  expandedSections: Record<string, boolean>;
  expandedCards: Record<string, boolean>;
  onToggleSection: (role: string) => void;
  onToggleCard: (id: string) => void;
};

export function ManagerRequestsView({
  groups,
  expandedSections,
  expandedCards,
  onToggleSection,
  onToggleCard,
}: ManagerRequestsViewProps) {
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
              {group.requests.map((request) =>
                request.type === 'swap' ? (
                  <SwapRequestCard
                    key={request.id}
                    fromUser={{
                      name: request.requester.name,
                      avatarUrl: request.requester.avatarUrl,
                      color: request.requester.color,
                    }}
                    fromShift={{
                      day: request.requesterShift.dayLabel,
                      timeRange: request.requesterShift.timeRange,
                    }}
                    toUser={{
                      name: request.coverEmployee.name,
                      avatarUrl: request.coverEmployee.avatarUrl,
                      color: request.coverEmployee.color,
                    }}
                    toShift={{
                      day: request.coverShift.dayLabel,
                      timeRange: request.coverShift.timeRange,
                    }}
                    expanded={expandedCards[request.id] ?? false}
                    onToggle={() => onToggleCard(request.id)}
                    purpose="manager-approval"
                  />
                ) : (
                  <Text key={request.id}>Other Request Types...</Text>
                ),
              )}
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
