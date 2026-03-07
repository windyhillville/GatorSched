import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="scheduler" href="/scheduler">
          Scheduler
        </TabTrigger>
        <TabTrigger name="teams" href="/teams">
          Teams
        </TabTrigger>
        <TabTrigger name="requests" href="/requests">
          Requests
        </TabTrigger>
        <TabTrigger name="settings" href="/settings">
          Settings
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
