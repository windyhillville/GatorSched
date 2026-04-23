import { EmployeeRequestOptions, EmployeeRequestsView, RequestSection } from '@/features';
import { useAuth } from '@/hooks';
import { getEmployeeRequests } from '@/services';
import {
  CreateSwapRequestPayload,
  createSwapRequest,
  employeeAcceptSwapRequest,
  employeeCancelSwapRequest,
  employeeDeclineSwapRequest,
} from '@/services/requests';
import { Header, PlusSign, Screen } from '@/ui';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

// NOTE: Add success (or save) callback to fetch data again after creating request

export default function Requests() {
  const [isAddRequestPressed, setIsAddRequestPressed] = useState(false);
  const [sections, setSections] = useState<RequestSection[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const currentUserId = user?.id;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function fetchEmployeeRequests() {
        if (!currentUserId) return;

        try {
          setIsLoading(true);
          setError(null);

          const requests = await getEmployeeRequests(currentUserId);

          if (isActive) {
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
          }
        } catch (err) {
          if (isActive) {
            setError('Failed to load employee requests');
            console.error(err);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      fetchEmployeeRequests();

      return () => {
        isActive = false;
      };
    }, [currentUserId]),
  );

  async function handleCreateSwapRequest(payload: CreateSwapRequestPayload) {
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await createSwapRequest(payload);

      if (!response.success) {
        throw new Error();
      }

      const requests = await getEmployeeRequests(currentUserId);
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
      setIsAddRequestPressed(false);
    } catch (err) {
      setError('Failed to create swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAccept(id: string) {
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await employeeAcceptSwapRequest(id);

      if (!response.success) {
        throw new Error();
      }

      const requests = await getEmployeeRequests(currentUserId);
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
      setError('Failed to accept swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDecline(id: string) {
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await employeeDeclineSwapRequest(id);

      if (!response.success) {
        throw new Error();
      }

      const requests = await getEmployeeRequests(currentUserId);
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
      setError('Failed to decline swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCancel(id: string) {
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await employeeCancelSwapRequest(id);

      if (!response.success) {
        throw new Error();
      }

      const requests = await getEmployeeRequests(currentUserId);
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
      setError('Failed to cancel swap request');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Screen insetTop>
      <Header
        title="Requests"
        style={styles.header}
        right={
          <View style={{ paddingRight: 12 }}>
            <Pressable onPress={() => setIsAddRequestPressed(true)}>
              <PlusSign size={29} />
            </Pressable>
          </View>
        }
      />
      <EmployeeRequestsView
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
        onAccept={handleAccept}
        onDecline={handleDecline}
        onCancel={handleCancel}
      />

      {isAddRequestPressed && (
        <EmployeeRequestOptions
          isCreateRequestButtonPressed={isAddRequestPressed}
          onExit={() => setIsAddRequestPressed(false)}
          onCreateSwapRequest={handleCreateSwapRequest}
        />
      )}
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
