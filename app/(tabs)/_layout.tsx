import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

type TabMarkerProps = {
  label: string;
  focused: boolean;
};

function TabMarker({ label, focused }: TabMarkerProps) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.tabIndicator, focused && styles.tabIndicatorActive]} />
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
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
          tabBarIcon: ({ focused }) => <TabMarker label="Senin İçin" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ focused }) => <TabMarker label="Keşfet" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Takip',
          tabBarIcon: ({ focused }) => <TabMarker label="Takip" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="credit"
        options={{
          title: 'Kredi',
          tabBarIcon: ({ focused }) => <TabMarker label="Kredi" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Cüzdanım',
          tabBarIcon: ({ focused }) => <TabMarker label="Cüzdanım" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 82,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minWidth: 64,
  },
  tabIndicator: {
    width: 20,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: 'transparent',
  },
  tabIndicatorActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
