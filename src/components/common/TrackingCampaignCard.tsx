import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import type { TrackedCampaign } from '@/types/tracking';

function getStatusTag(status: TrackedCampaign['status']) {
  if (status === 'near_complete') return { id: 'near_complete', label: 'Tamamlamaya Yakın', tone: 'warning' as const };
  if (status === 'completed') return { id: 'completed', label: 'Tamamlandı', tone: 'success' as const };
  return { id: 'active', label: 'Aktif', tone: 'info' as const };
}

export function TrackingCampaignCard({
  campaign,
  onPress,
}: {
  campaign: TrackedCampaign;
  onPress?: () => void;
}) {
  const statusTag = getStatusTag(campaign.status);

  return (
    <Pressable onPress={onPress}>
      <SurfaceCard>
        <View style={styles.topRow}>
          <Text style={styles.bank}>{campaign.bankName}</Text>
          <TagPill tag={statusTag} />
        </View>

        <Text style={styles.title}>{campaign.title}</Text>
        <Text style={styles.description}>{campaign.shortDescription}</Text>

        <View style={styles.progressWrap}>
          <ProgressSteps current={campaign.progressCurrent} total={campaign.progressTarget} />
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.reward}>{campaign.rewardText}</Text>
          <Text style={styles.deadline}>{campaign.deadlineText}</Text>
        </View>
      </SurfaceCard>
    </Pressable>
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
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  progressWrap: {
    marginTop: spacing.lg,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  reward: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 15,
  },
  deadline: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
});
