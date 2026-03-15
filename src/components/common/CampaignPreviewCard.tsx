import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { CampaignPreview } from '@/types/campaign';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';

export function CampaignPreviewCard({
  campaign,
  onPress,
}: {
  campaign: CampaignPreview;
  onPress?: () => void;
}) {
  const progressText =
    campaign.isProgressive && campaign.progressCurrent != null && campaign.progressTarget != null
      ? `${campaign.progressCurrent}/${campaign.progressTarget} tamamlandı`
      : campaign.deadlineText;

  return (
    <Pressable onPress={onPress}>
      <SurfaceCard>
        <View style={styles.header}>
          <Text style={styles.bank}>{campaign.bankName}</Text>
          <Text style={styles.reward}>{campaign.rewardText}</Text>
        </View>

        <Text style={styles.title}>{campaign.title}</Text>
        <Text style={styles.description}>{campaign.shortDescription}</Text>

        <View style={styles.tags}>
          {campaign.tags?.map((tag) => <TagPill key={tag.id} tag={tag} />)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.meta}>{progressText}</Text>
          <Text style={styles.deadline}>{campaign.deadlineText}</Text>
        </View>
      </SurfaceCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bank: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  reward: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 14,
  },
  title: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 6,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  meta: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  deadline: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});
