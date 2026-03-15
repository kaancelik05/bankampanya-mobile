import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { TrackingCampaignCard } from '@/components/common/TrackingCampaignCard';
import { StateCard } from '@/components/common/StateCard';
import type { TrackingStatus } from '@/types/tracking';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useTrackedCampaigns } from '@/hooks/useTracking';

const tabs: Array<{ key: TrackingStatus | 'all'; label: string }> = [
  { key: 'active', label: 'Aktif' },
  { key: 'near_complete', label: 'Tamamlanmaya Yakın' },
  { key: 'completed', label: 'Tamamlanan' },
];

export default function TrackingScreen() {
  const [selectedTab, setSelectedTab] = useState<TrackingStatus>('active');

  const { data: trackedCampaigns = [], isLoading, isError } = useTrackedCampaigns();

  const filteredCampaigns = useMemo(() => {
    return trackedCampaigns.filter((campaign) => campaign.status === selectedTab);
  }, [selectedTab, trackedCampaigns]);

  return (
    <AppScreen>
      <AppHeader title="Takip" subtitle="Katıldığın kampanyaları, ilerlemelerini ve son tarihleri buradan yönet." showBackButton={false} />

      <View style={styles.tabsRow}>
        {tabs.map((tab) => {
          const active = selectedTab === tab.key;
          return (
            <Pressable key={tab.key} style={[styles.tab, active && styles.tabActive]} onPress={() => setSelectedTab(tab.key as TrackingStatus)}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {isLoading ? <StateCard title="Yükleniyor" description="Takipteki kampanyaların hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Takip verileri alınamadı" description="Kampanya takibi şu an yüklenemedi." tone="danger" /> : null}
      {!isLoading && !isError && filteredCampaigns.length === 0 ? (
        <StateCard title="Bu bölümde kampanya yok" description="Seçtiğin sekmede gösterilecek kampanya bulunmuyor." tone="warning" />
      ) : null}

      <View style={styles.list}>
        {filteredCampaigns.map((campaign) => (
          <TrackingCampaignCard key={campaign.id} campaign={campaign} onPress={() => router.push(`/tracking/${campaign.id}`)} />
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  tabActive: {
    backgroundColor: colors.primarySoft,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.primary,
  },
  list: {
    gap: spacing.md,
  },
});
