import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="schedule" href="/(employee)/schedule">
          Schedule
        </TabTrigger>
        <TabTrigger name="availability" href="/(employee)/availability">
          Availability
        </TabTrigger>
        <TabTrigger name="requests" href="/(employee)/requests">
          Requests
        </TabTrigger>
        <TabTrigger name="profile" href="/(employee)/profile">
          Profile
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
