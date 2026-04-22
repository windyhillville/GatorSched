import { ManagerRequestsView } from '@/features';
import {
  getManagerRequests,
  managerApproveSwapRequest,
  managerRejectSwapRequest,
  ManagerRequestCardGroup,
} from '@/services';
import { Header, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function Requests() {
  const [groups, setGroups] = useState<ManagerRequestCardGroup[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchManagerRequests() {
        setIsLoading(true);
        setError(null);

        try {
          const groups = await getManagerRequests();

          if (isActive) {
            setGroups(groups);
            const initialExpandedState = Object.fromEntries(
              groups.map((group) => [group.role, true]),
            );
            setExpandedSections(initialExpandedState);
          }
        } catch (err) {
          if (isActive) {
            setError('Failed to load manager requests');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      fetchManagerRequests();

      return () => {
        isActive = false;
      };
    }, []),
  );

  async function handleApprove(id: string) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await managerApproveSwapRequest(id);

      if (!data.success) {
        throw new Error();
      }

      const groups = await getManagerRequests();

      setGroups(groups);
      const initialExpandedState = Object.fromEntries(groups.map((group) => [group.role, true]));
      setExpandedSections(initialExpandedState);
    } catch (err) {
      setError('Failed to approve swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReject(id: string) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await managerRejectSwapRequest(id);

      if (!data.success) {
        throw new Error();
      }

      const groups = await getManagerRequests();

      setGroups(groups);
      const initialExpandedState = Object.fromEntries(groups.map((group) => [group.role, true]));
      setExpandedSections(initialExpandedState);
    } catch (err) {
      setError('Failed to reject swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

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
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </Screen>
  );
}
