import AppTabs from '@/components/manager/app-tabs';
// import { Tabs } from 'expo-router';

export default function ManagerTabLayout() {
  return <AppTabs />;
  // (
  //   <Tabs>
  //     <Tabs.Screen name="scheduler" options={{ title: 'Scheduler' }} />
  //     <Tabs.Screen name="teams" options={{ title: 'Teams' }} />
  //     <Tabs.Screen name="requests" options={{ title: 'Requests' }} />
  //     <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
  //   </Tabs>
  // );
}
