import { Stack } from 'expo-router';
import { SignupProvider } from '@/hooks';

export default function AuthLayout() {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SignupProvider>
  );
}
