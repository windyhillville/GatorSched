// import { useAuth } from '@/hooks';
// import { Slot, useRouter, useSegments } from 'expo-router';
import { Slot } from 'expo-router';
// import { useEffect } from 'react';

export default function TabsLayout() {
  // const { user } = useAuth();
  // const router = useRouter();
  // const segments = useSegments();

  // useEffect(() => {
  //   if (!user) return;

  //   if (segments.length === 1) {
  //     if (user?.accessLevel === 'manager') {
  //       router.replace('/(tabs)/(manager)/scheduler');
  //     } else {
  //       router.replace('/(tabs)/(employee)/schedule');
  //     }
  //   }
  // }, [user]);

  return <Slot />;
}
