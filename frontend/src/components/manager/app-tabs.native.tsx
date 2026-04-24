import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function AppTabs() {
  const schedulerIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/scheduler.png')
      : require('@/assets/images/tabIcons/android/scheduler.png');

  const teamsIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/teams.png')
      : require('@/assets/images/tabIcons/android/teams.png');

  const shiftsIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/shifts.png')
      : require('@/assets/images/tabIcons/android/shifts.png');

  const requestsIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/requests.png')
      : require('@/assets/images/tabIcons/android/requests.png');

  const settingsIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/settings.png')
      : require('@/assets/images/tabIcons/android/settings.png');
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="scheduler">
        <NativeTabs.Trigger.Label>Scheduler</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={schedulerIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="teams">
        <NativeTabs.Trigger.Label>Teams</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={teamsIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="shifts">
        <NativeTabs.Trigger.Label>Shifts</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={shiftsIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="requests">
        <NativeTabs.Trigger.Label>Requests</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={requestsIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={settingsIcon} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
