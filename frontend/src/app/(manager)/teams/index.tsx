import { TeamsView } from '@/features';
import { getRoster, TeamGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useEffect, useState } from 'react';

export default function Teams() {
  const [groups, setGroups] = useState<TeamGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const date = '2026-03-16';
  useEffect(() => {
    async function fetchRoster() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getRoster(date);
        setGroups(data);

        const initialExpandedState = Object.fromEntries(data.map((group) => [group.role, true]));
        setExpandedSections(initialExpandedState);
      } catch (err) {
        setError('Failed to load roster');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoster();
  }, [date]);

  return (
    <Screen insetTop>
      <Header title="Teams" />
      <TeamsView
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
