import { EmployeeRequestCard } from '@/services';
import { AccordionSection } from '@/ui';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SwapRequestCard } from './components';

export type RequestSection = {
  title: 'Incoming' | 'Outgoing';
  requests: EmployeeRequestCard[];
};

type EmployeeRequestsViewProps = {
  sections: RequestSection[];
  expandedSections: Record<string, boolean>;
  expandedCards: Record<string, boolean>;
  onToggleSection: (title: string) => void;
  onToggleCard: (id: string) => void;
};

export function EmployeeRequestsView({
  sections,
  expandedSections,
  expandedCards,
  onToggleSection,
  onToggleCard,
}: EmployeeRequestsViewProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        extraData={{ expandedSections, expandedCards }}
        keyExtractor={(section) => section.title}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item: section }) => (
          <AccordionSection
            title={section.title}
            expanded={expandedSections[section.title] ?? false}
            onToggle={() => onToggleSection(section.title)}
          >
            <View style={styles.cardsContainer}>
              {section.requests.map((request) =>
                request.type === 'swap' ? (
                  <SwapRequestCard
                    key={request.id}
                    fromUser={{
                      name: request.requester.name,
                      avatarUrl: request.requester.avatarUrl,
                      color: request.requester.color,
                    }}
                    toUser={{
                      name: request.coverEmployee.name,
                      avatarUrl: request.coverEmployee.avatarUrl,
                      color: request.coverEmployee.color,
                    }}
                    fromShift={{
                      day: request.requesterShift.dayLabel,
                      timeRange: request.requesterShift.timeRange,
                    }}
                    toShift={{
                      day: request.coverShift.dayLabel,
                      timeRange: request.coverShift.timeRange,
                    }}
                    expanded={expandedCards[request.id] ?? false}
                    onToggle={() => onToggleCard(request.id)}
                    purpose={section.title === 'Incoming' ? 'swap-in' : 'swap-out'}
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
