import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
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
  const { data: campaign } = useTrackedCampaignDetail(id);

  if (!campaign) {
    return (
      <AppScreen>
        <AppHeader title="Kampanya Takibi" subtitle="Kayıt bulunamadı" />
      </AppScreen>
    );
  }

  const statusTag = getStatusTag(campaign.status);

  return (
    <AppScreen>
      <AppHeader title="Kampanya Takibi" subtitle="Aşamalı kampanyalar için işlem takip detayları" />

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

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Kampanya Koşulları</Text>
        {campaign.requirements.map((requirement) => (
          <Text key={requirement} style={styles.rule}>
            • {requirement}
          </Text>
        ))}
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Eklenen İşlemler</Text>
        <View style={styles.timeline}>
          {campaign.events.map((event) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.timelineMeta}>
                <Text style={styles.timelineDate}>{event.dateLabel}</Text>
                <Text style={styles.timelineAmount}>{event.amountText}</Text>
              </View>
              <Text style={styles.timelineMerchant}>{event.merchantName}</Text>
              <Text style={[styles.timelineStatus, event.qualified && styles.timelineStatusQualified]}>
                {event.qualified ? 'Uygun işlem' : 'Uygun değil'}
              </Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <View style={styles.actions}>
        <PrimaryButton label="İşlem Ekle" onPress={() => router.push('/tracking/add-event')} />
        <SecondaryButton label="Bankaya Git" />
      </View>
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
