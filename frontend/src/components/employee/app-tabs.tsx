import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="schedule" href="/schedule">
          Schedule
        </TabTrigger>
        <TabTrigger name="availability" href="/availability">
          Availability
        </TabTrigger>
        <TabTrigger name="requests" href="/requests">
          Requests
        </TabTrigger>
        <TabTrigger name="profile" href="/profile">
          Profile
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
