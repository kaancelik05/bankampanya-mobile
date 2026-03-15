import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import type { CampaignPreview } from '@/types/campaign';
import { TagPill } from '@/components/common/SurfaceCard';

type DiscoverCampaignCardProps = {
  campaign: CampaignPreview;
  onPress?: () => void;
};

export function DiscoverCampaignCard({ campaign, onPress }: DiscoverCampaignCardProps) {
  const progressText =
    campaign.isProgressive && campaign.progressCurrent != null && campaign.progressTarget != null
      ? `${campaign.progressCurrent}/${campaign.progressTarget} adım tamamlandı`
      : campaign.deadlineText;

  const accentTone = campaign.rewardType === 'cashback' ? '#8FF0A4' : campaign.rewardType === 'mil' ? '#AFC6E9' : '#FFB06A';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.bankWrap}>
            <Text style={styles.bankEyebrow}>{campaign.bankName}</Text>
            <Text style={styles.bankSubline}>{campaign.category}</Text>
          </View>
          <View style={[styles.rewardBadge, { backgroundColor: accentTone }]}>
            <Text style={styles.rewardText}>{campaign.rewardText}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.description}>{campaign.shortDescription}</Text>
        </View>

        <View style={styles.tagsRow}>
          {campaign.tags?.slice(0, 3).map((tag) => <TagPill key={tag.id} tag={tag} />)}
        </View>

        <View style={styles.footerCard}>
          <View style={styles.footerMeta}>
            <Text style={styles.footerLabel}>Takip durumu</Text>
            <Text style={styles.footerValue}>{progressText}</Text>
          </View>
          <View style={styles.footerMetaRight}>
            <Text style={styles.footerLabel}>Son tarih</Text>
            <Text style={styles.footerValueMuted}>{campaign.deadlineText}</Text>
          </View>
        </View>

        <View style={styles.bottomActionRow}>
          <Text style={styles.actionHint}>{campaign.isProgressive ? 'Aşamalı kampanya' : 'Standart kampanya'}</Text>
          <Text style={styles.actionText}>Detayı Aç</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.xl,
  },
  pressed: {
    transform: [{ scale: 0.992 }],
    opacity: 0.97,
  },
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  bankWrap: {
    flex: 1,
    gap: 2,
  },
  bankEyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  bankSubline: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  rewardBadge: {
    maxWidth: 128,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  rewardText: {
    color: '#173053',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  content: {
    gap: spacing.sm,
  },
  title: {
    color: colors.navy,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  footerMeta: {
    flex: 1,
    gap: 4,
  },
  footerMetaRight: {
    flex: 1,
    gap: 4,
    alignItems: 'flex-end',
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  footerValue: {
    color: colors.navy,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  footerValueMuted: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'right',
  },
  bottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionHint: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  actionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
});
