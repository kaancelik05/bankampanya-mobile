import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useTrackedCampaignDetail } from '@/hooks/useTracking';

function getStatusTag(status: 'active' | 'near_complete' | 'completed') {
  if (status === 'near_complete') return { id: 'near_complete', label: 'Tamamlamaya Yakın', tone: 'warning' as const };
  if (status === 'completed') return { id: 'completed', label: 'Tamamlandı', tone: 'success' as const };
  return { id: 'active', label: 'Aktif', tone: 'info' as const };
}

export default function TrackingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: campaign, isLoading, isError } = useTrackedCampaignDetail(id);

  if (isLoading) {
    return (
      <AppScreen>
        <AppHeader title="Kampanya Takibi" subtitle="Takip verileri hazırlanıyor" />
        <StateCard title="Takip yükleniyor" description="Kampanya takibi ve işlem geçmişi hazırlanıyor..." />
      </AppScreen>
    );
  }

  if (isError || !campaign) {
    return (
      <AppScreen>
        <AppHeader title="Kampanya Takibi" subtitle="Kayıt bulunamadı" />
        <StateCard title="Takip bulunamadı" description="Bu takip kampanyası şu an görüntülenemiyor." tone="warning" />
      </AppScreen>
    );
  }

  const statusTag = getStatusTag(campaign.status);

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Kampanya Takibi" subtitle="Aşamalı kampanyalar için işlem takip detayları" />
      </AnimatedEntrance>

      <AnimatedEntrance delay={50}>
        <SurfaceCard>
          <View style={styles.topRow}>
            <Text style={styles.bank}>{campaign.bankName}</Text>
            <TagPill tag={statusTag} />
          </View>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.description}>{campaign.shortDescription}</Text>
          <View style={styles.progressSection}>
            <ProgressSteps current={campaign.progressCurrent} total={campaign.progressTarget} title="İlerleme" />
          </View>
          <Text style={styles.nextAction}>{campaign.nextActionText}</Text>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={100}>
        <SurfaceCard>
          <Text style={styles.sectionTitle}>Kampanya Koşulları</Text>
          {campaign.requirements.map((requirement) => (
            <Text key={requirement} style={styles.rule}>
              • {requirement}
            </Text>
          ))}
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={150}>
        <SurfaceCard>
          <Text style={styles.sectionTitle}>Eklenen İşlemler</Text>
          {campaign.events.length === 0 ? (
            <StateCard title="Henüz işlem yok" description="İlk uygun işlemini ekleyerek ilerlemeyi başlat." />
          ) : (
            <View style={styles.timeline}>
              {campaign.events.map((event, index) => (
                <AnimatedEntrance key={event.id} delay={180 + index * 35}>
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineMeta}>
                      <Text style={styles.timelineDate}>{event.dateLabel}</Text>
                      <Text style={styles.timelineAmount}>{event.amountText}</Text>
                    </View>
                    <Text style={styles.timelineMerchant}>{event.merchantName}</Text>
                    <Text style={[styles.timelineStatus, event.qualified && styles.timelineStatusQualified]}>{event.qualified ? 'Uygun işlem' : 'Uygun değil'}</Text>
                  </View>
                </AnimatedEntrance>
              ))}
            </View>
          )}
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={210}>
        <View style={styles.actions}>
          <PrimaryButton label="İşlem Ekle" onPress={() => router.push(`/tracking/add-event?id=${campaign.id}`)} />
          <SecondaryButton label="Bankaya Git" />
        </View>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bank: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 32,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  progressSection: {
    marginTop: spacing.lg,
  },
  nextAction: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: spacing.md,
  },
  rule: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  timeline: {
    gap: spacing.md,
  },
  timelineItem: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 6,
  },
  timelineMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineDate: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  timelineAmount: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 14,
  },
  timelineMerchant: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  timelineStatus: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  timelineStatusQualified: {
    color: colors.success,
  },
  actions: {
    gap: spacing.md,
  },
});
