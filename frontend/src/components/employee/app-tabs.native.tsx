import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function AppTabs() {
  const scheduleIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/schedule.png')
      : require('@/assets/images/tabIcons/android/schedule.png');

  const availabilityIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/availability.png')
      : require('@/assets/images/tabIcons/android/availability.png');

  const requestsIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/requests.png')
      : require('@/assets/images/tabIcons/android/requests.png');

  const profileIcon =
    Platform.OS === 'ios'
      ? require('@/assets/images/tabIcons/ios/profile.png')
      : require('@/assets/images/tabIcons/android/profile.png');

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="schedule">
        <NativeTabs.Trigger.Label>Schedule</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={scheduleIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="availability">
        <NativeTabs.Trigger.Label>Availability</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={availabilityIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="requests">
        <NativeTabs.Trigger.Label>Requests</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={requestsIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={profileIcon} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
