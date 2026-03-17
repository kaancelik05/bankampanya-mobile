import { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { TrackingCampaignCard } from '@/components/common/TrackingCampaignCard';
import { StateCard } from '@/components/common/StateCard';
import type { TrackingStatus } from '@/types/tracking';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useTrackedCampaigns } from '@/hooks/useTracking';

const tabs: Array<{ key: TrackingStatus; label: string; helper: string }> = [
  { key: 'active', label: 'Aktif', helper: 'Devam eden takipler' },
  { key: 'near_complete', label: 'Tamamlamaya Yakın', helper: 'Bitirmene az kaldı' },
  { key: 'completed', label: 'Tamamlanan', helper: 'Ödül bekleyenler dahil' },
];

export default function TrackingScreen() {
  const [selectedTab, setSelectedTab] = useState<TrackingStatus>('active');

  const { data: trackedCampaigns = [], isLoading, isError } = useTrackedCampaigns();

  useEffect(() => {
    if (trackedCampaigns.length === 0) {
      return;
    }

    if (trackedCampaigns.some((campaign) => campaign.status === selectedTab)) {
      return;
    }

    if (trackedCampaigns.some((campaign) => campaign.status === 'near_complete')) {
      setSelectedTab('near_complete');
      return;
    }

    if (trackedCampaigns.some((campaign) => campaign.status === 'active')) {
      setSelectedTab('active');
      return;
    }

    if (trackedCampaigns.some((campaign) => campaign.status === 'completed')) {
      setSelectedTab('completed');
    }
  }, [selectedTab, trackedCampaigns]);

  const filteredCampaigns = useMemo(() => trackedCampaigns.filter((campaign) => campaign.status === selectedTab), [selectedTab, trackedCampaigns]);
  const activeCount = trackedCampaigns.filter((campaign) => campaign.status === 'active').length;
  const nearCompleteCount = trackedCampaigns.filter((campaign) => campaign.status === 'near_complete').length;
  const completedCount = trackedCampaigns.filter((campaign) => campaign.status === 'completed').length;
  const selectedTabMeta = tabs.find((tab) => tab.key === selectedTab);
  const highlightedTracking = filteredCampaigns[0];

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Takip" subtitle="Katıldığın kampanyaları, ilerlemelerini ve son tarihleri daha net bir akışla yönet." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Aşamalı kampanya alanın</Text>
              <Text style={styles.heroTitle}>Takibini yaptığın fırsatları sırayla bitir, ödülü kaçırma.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{trackedCampaigns.length}</Text>
              <Text style={styles.heroBadgeLabel}>takip</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>
            Aktif kampanyaları, bitirmene az kalanları ve tamamladığın işlemleri tek bakışta ayırarak daha az eforla yönetmeni sağlıyoruz.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Aktif</Text>
              <Text style={styles.heroStatValue}>{activeCount}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Yakın</Text>
              <Text style={styles.heroStatValue}>{nearCompleteCount}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Tamamlanan</Text>
              <Text style={styles.heroStatValue}>{completedCount}</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={90}>
        <View style={styles.tabsSection}>
          <View style={styles.tabsHeader}>
            <Text style={styles.sectionTitle}>Takip Görünümü</Text>
            <Text style={styles.sectionMeta}>{selectedTabMeta?.helper}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
            {tabs.map((tab) => {
              const active = selectedTab === tab.key;
              const count =
                tab.key === 'active' ? activeCount : tab.key === 'near_complete' ? nearCompleteCount : completedCount;

              return (
                <Pressable key={tab.key} style={({ pressed }) => [styles.tabCard, active && styles.tabCardActive, pressed && styles.pressablePressed]} onPress={() => setSelectedTab(tab.key)}>
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
                  <Text style={[styles.tabHelper, active && styles.tabHelperActive]}>{tab.helper}</Text>
                  <Text style={[styles.tabCount, active && styles.tabCountActive]}>{count}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      {isLoading ? <StateCard title="Yükleniyor" description="Takipteki kampanyaların hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Takip verileri alınamadı" description="Kampanya takibi şu an yüklenemedi." tone="danger" /> : null}
      {!isLoading && !isError && filteredCampaigns.length === 0 ? (
        <StateCard title="Bu bölümde kampanya yok" description="Seçtiğin sekmede gösterilecek kampanya bulunmuyor." tone="warning" />
      ) : null}

      {highlightedTracking ? (
        <AnimatedEntrance delay={140}>
          <LinearGradient colors={['#132B4E', '#244677']} style={styles.highlightCard}>
            <View style={styles.highlightTopRow}>
              <View style={styles.highlightCopyWrap}>
                <Text style={styles.highlightEyebrow}>Öncelikli takip</Text>
                <Text style={styles.highlightTitle}>{highlightedTracking.title}</Text>
              </View>
              <View style={styles.highlightBadge}>
                <Text style={styles.highlightBadgeValue}>{highlightedTracking.progressCurrent}/{highlightedTracking.progressTarget}</Text>
                <Text style={styles.highlightBadgeLabel}>ilerleme</Text>
              </View>
            </View>

            <Text style={styles.highlightDescription}>{highlightedTracking.shortDescription}</Text>

            <View style={styles.highlightFooterCard}>
              <View style={styles.highlightFooterMeta}>
                <Text style={styles.highlightFooterLabel}>Sonraki adım</Text>
                <Text style={styles.highlightFooterValue}>{highlightedTracking.nextActionText}</Text>
              </View>
              <View style={styles.highlightFooterMetaRight}>
                <Text style={styles.highlightFooterLabel}>Ödül</Text>
                <Text style={styles.highlightFooterValueRight}>{highlightedTracking.rewardText}</Text>
              </View>
            </View>

            <View style={styles.highlightActionRow}>
              <Text style={styles.highlightActionHint}>{highlightedTracking.deadlineText}</Text>
              <Pressable style={({ pressed }) => [styles.highlightAction, pressed && styles.pressablePressed]} onPress={() => router.push(`/tracking/${highlightedTracking.id}`)}>
                <Text style={styles.highlightActionText}>Takibi Aç</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </AnimatedEntrance>
      ) : null}

      <AnimatedEntrance delay={190}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Takipteki Kampanyalar</Text>
              <Text style={styles.sectionMeta}>{filteredCampaigns.length} kampanya gösteriliyor</Text>
            </View>
            <View style={styles.infoBadge}>
              <Text style={styles.infoBadgeEyebrow}>Filtre</Text>
              <Text style={styles.infoBadgeValue}>{selectedTabMeta?.label}</Text>
            </View>
          </View>

          <View style={styles.list}>
            {filteredCampaigns.map((campaign) => (
              <TrackingCampaignCard key={campaign.id} campaign={campaign} onPress={() => router.push(`/tracking/${campaign.id}`)} />
            ))}
          </View>
        </View>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  heroCopyWrap: {
    flex: 1,
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: '#FFB06A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  heroBadge: {
    minWidth: 84,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  heroBadgeValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  heroBadgeLabel: {
    color: '#D6E3F5',
    fontSize: 12,
    fontWeight: '700',
  },
  heroDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 6,
  },
  heroStatLabel: {
    color: '#D6E3F5',
    fontSize: 12,
    fontWeight: '700',
  },
  heroStatValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  tabsSection: {
    gap: spacing.md,
  },
  tabsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  tabsRow: {
    gap: spacing.md,
  },
  tabCard: {
    width: 156,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  tabCardActive: {
    backgroundColor: colors.primarySoft,
    borderColor: '#FFD6B0',
  },
  tabLabel: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabHelper: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  tabHelperActive: {
    color: colors.navy,
  },
  tabCount: {
    color: colors.textMuted,
    fontSize: 22,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  tabCountActive: {
    color: colors.primary,
  },
  highlightCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  highlightTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  highlightCopyWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  highlightEyebrow: {
    color: '#D6E3F5',
    fontWeight: '800',
    fontSize: 13,
  },
  highlightTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  highlightBadge: {
    minWidth: 88,
    alignItems: 'center',
    gap: 2,
  },
  highlightBadgeValue: {
    color: '#8FF0A4',
    fontSize: 24,
    fontWeight: '900',
  },
  highlightBadgeLabel: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  highlightDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  highlightFooterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  highlightFooterMeta: {
    flex: 1,
    gap: 4,
  },
  highlightFooterMetaRight: {
    width: 88,
    gap: 4,
    alignItems: 'flex-end',
  },
  highlightFooterLabel: {
    color: '#AFC6E9',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  highlightFooterValue: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  highlightFooterValueRight: {
    color: '#FFB06A',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
    textAlign: 'right',
  },
  highlightActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightActionHint: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  highlightAction: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  highlightActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  infoBadge: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 2,
    minWidth: 96,
  },
  infoBadgeEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  infoBadgeValue: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
  },
  list: {
    gap: spacing.md,
  },
});
