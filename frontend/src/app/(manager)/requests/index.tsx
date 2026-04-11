import { ManagerRequestsView } from '@/features';
import { getManagerRequests, ManagerRequestCardGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useEffect, useState } from 'react';

export default function Requests() {
  const [groups, setGroups] = useState<ManagerRequestCardGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchManagerRequests() {
      try {
        setIsLoading(true);
        setError(null);

        const groups = await getManagerRequests();
        setGroups(groups);

        const initialExpandedState = Object.fromEntries(groups.map((group) => [group.role, true]));
        setExpandedSections(initialExpandedState);
      } catch (err) {
        setError('Failed to load manager requests');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchManagerRequests();
  }, []);

  return (
    <Screen insetTop>
      <Header title="Requests" />
      <ManagerRequestsView
        groups={groups}
        expandedSections={expandedSections}
        expandedCards={expandedCards}
        onToggleSection={(role) =>
          setExpandedSections((prev) => ({
            ...prev,
            [role]: !(prev[role] ?? false),
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
