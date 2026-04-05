import { RequestSection, RequestsView } from '@/features';
import { getEmployeeRequests } from '@/services';
import { Header, Screen } from '@/ui';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

export default function Requests() {
  const [sections, setSections] = useState<RequestSection[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const viewerId = '1';

  useEffect(() => {
    async function fetchRequests() {
      try {
        setIsLoading(true);
        setError(null);

        const requests = await getEmployeeRequests(viewerId);
        const sections: RequestSection[] = [
          {
            title: 'Incoming',
            requests: requests.incoming,
          },
          {
            title: 'Outgoing',
            requests: requests.outgoing,
          },
        ];
        setSections(sections);

        const initialExpandedState = Object.fromEntries(
          sections.map((section) => [section.title, true]),
        );
        setExpandedSections(initialExpandedState);
      } catch (err) {
        setError('Failed to load requests');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequests();
  }, [viewerId]);

  return (
    <Screen insetTop>
      <Header title="Requests" style={styles.header} />
      <RequestsView
        sections={sections}
        expandedSections={expandedSections}
        expandedCards={expandedCards}
        onToggleSection={(title) =>
          setExpandedSections((prev) => ({
            ...prev,
            [title]: !(prev[title] ?? false),
          }))
        }
        onToggleCard={(id) =>
          setExpandedCards((prev) => ({
            ...prev,
            [id]: !(prev[id] ?? false),
          }))
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
      },
      android: {
        paddingTop: 40,
      },
    }),
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
    ...Platform.select({
      ios: {
        paddingBottom: 40,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
});
