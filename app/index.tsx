import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  if (isHydrating) {
    return null;
  }

  return <Redirect href={isAuthenticated ? '/(tabs)/for-you' : '/(auth)/security-intro'} />;
}
