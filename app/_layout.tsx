import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthBootstrapper } from '@/components/common/AuthBootstrapper';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrapper />
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
