import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  useEffect(() => {
    if (!isHydrating && isAuthenticated) {
      router.replace('/(tabs)/for-you');
    }
  }, [isAuthenticated, isHydrating]);

  if (isHydrating) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    />
  );
}
