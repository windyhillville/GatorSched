import { EmployeeRequestCard } from '@/services';
import { AccordionSection } from '@/ui';
import { FlatList, StyleSheet, View } from 'react-native';
import { CallOutRequestCard, SwapRequestCard } from './components';

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
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onCancel: (id: string) => void;
};

export function EmployeeRequestsView({
  sections,
  expandedSections,
  expandedCards,
  onToggleSection,
  onToggleCard,
  onAccept,
  onDecline,
  onCancel,
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
                    status={{
                      employeeStatus: request.employeeStatus,
                      managerStatus: request.managerStatus,
                    }}
                    purpose={section.title === 'Incoming' ? 'swap-in' : 'swap-out'}
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
                    onAccept={() => onAccept(request.id)}
                    onDecline={() => onDecline(request.id)}
                    onCancel={() => onCancel(request.id)}
                  />
                ) : (
                  <CallOutRequestCard
                    key={request.id}
                    purpose="callout-out"
                    user={{
                      name: request.employee.name,
                      color: request.employee.color,
                      avatarUrl: request.employee.avatarUrl,
                    }}
                    shift={{ day: request.shift.dayLabel, timeRange: request.shift.timeRange }}
                    status={{
                      employeeStatus: request.employeeStatus,
                      managerStatus: request.managerStatus,
                    }}
                    expanded={expandedCards[request.id] ?? false}
                    onToggle={() => onToggleCard(request.id)}
                    onAccept={() => onAccept(request.id)}
                    onDecline={() => onDecline(request.id)}
                    onCancel={() => onCancel(request.id)}
                  />
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
