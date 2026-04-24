import AppTabs from '@/components/employee/app-tabs';
// import {Tabs} from "expo-router"

export default function EmployeeTabLayout() {
  return <AppTabs />;
  // <Tabs>
  //   <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
  //   <Tabs.Screen name="availability" options={{ title: 'Availability' }} />
  //   <Tabs.Screen name="requests" options={{ title: 'Requests' }} />
  //   <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
  // </Tabs>
}
