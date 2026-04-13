import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="scheduler" href="/(manager)/scheduler">
          Scheduler
        </TabTrigger>
        <TabTrigger name="teams" href="/(manager)/teams">
          Teams
        </TabTrigger>
        <TabTrigger name="shifts" href="/(manager)/shifts">
          Shifts
        </TabTrigger>
        <TabTrigger name="requests" href="/(manager)/requests">
          Requests
        </TabTrigger>
        <TabTrigger name="settings" href="/(manager)/settings">
          Settings
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
