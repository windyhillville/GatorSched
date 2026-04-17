import { TeamsView } from '@/features';
import {
  // formatDisplayDate,
  // getDateFromWeekStartAndIndex,
  // getNextWeekStart,
  // getPreviousWeekStart,
  // getWeekBoundsLabel,
  getWeekStart,
} from '@/features/utils';
import { useToday } from '@/hooks';
import { getRoster, TeamGroup } from '@/services';
import { Header, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function Teams() {
  const [groups, setGroups] = useState<TeamGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(today));

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchRoster() {
        try {
          setIsLoading(true);
          setError(null);

          const data = await getRoster(currentWeekStart);

          if (isActive) {
            setGroups(data);
            const initialExpandedState = Object.fromEntries(
              data.map((group) => [group.role, true]),
            );
            setExpandedSections(initialExpandedState);
          }
        } catch (err) {
          if (isActive) {
            setError('Failed to load roster');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      fetchRoster();

      return () => {
        isActive = false;
      };
    }, [currentWeekStart]),
  );

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
