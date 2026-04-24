import { SignupProvider } from '@/hooks';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SignupProvider>
  );
}
