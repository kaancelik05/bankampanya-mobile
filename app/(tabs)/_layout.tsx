import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { useAuthStore } from '@/store/auth-store';

type TabItemProps = {
  label: string;
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
};

function TabItem({ label, focused, icon }: TabItemProps) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        {focused ? <View style={styles.iconGlow} /> : null}
        <Ionicons name={icon} size={20} color={focused ? '#FFFFFF' : colors.textMuted} style={styles.icon} />
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  useEffect(() => {
    if (!isHydrating && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isHydrating]);

  if (isHydrating || !isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="for-you"
        options={{
          title: 'Senin İçin',
          tabBarIcon: ({ focused }) => <TabItem label="Senin İçin" focused={focused} icon="star-outline" />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ focused }) => <TabItem label="Keşfet" focused={focused} icon="compass-outline" />,
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Takip',
          tabBarIcon: ({ focused }) => <TabItem label="Takip" focused={focused} icon="checkbox-outline" />,
        }}
      />
      <Tabs.Screen
        name="credit"
        options={{
          title: 'Kredi',
          tabBarIcon: ({ focused }) => <TabItem label="Kredi" focused={focused} icon="cash-outline" />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Cüzdanım',
          tabBarIcon: ({ focused }) => <TabItem label="Cüzdanım" focused={focused} icon="wallet-outline" />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 92,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 0,
    backgroundColor: '#FDFEFF',
    shadowColor: '#0F1A2B',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    minWidth: 66,
    paddingTop: 6,
  },
  tabItemFocused: {
    transform: [{ translateY: -4 }],
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  iconWrapActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  iconGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  icon: {
    zIndex: 1,
  },
  tabLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 68,
  },
  tabLabelActive: {
    color: colors.navy,
    fontWeight: '800',
  },
});
