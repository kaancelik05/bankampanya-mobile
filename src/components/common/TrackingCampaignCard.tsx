import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { TagPill } from '@/components/common/SurfaceCard';
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
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.bankWrap}>
            <Text style={styles.bank}>{campaign.bankName}</Text>
            <Text style={styles.bankSubline}>{campaign.deadlineText}</Text>
          </View>
          <TagPill tag={statusTag} />
        </View>

        <Text style={styles.title}>{campaign.title}</Text>
        <Text style={styles.description}>{campaign.shortDescription}</Text>

        <View style={styles.progressShell}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>İlerleme durumu</Text>
            <Text style={styles.progressValue}>
              {campaign.progressCurrent}/{campaign.progressTarget}
            </Text>
          </View>
          <ProgressSteps current={campaign.progressCurrent} total={campaign.progressTarget} />
        </View>

        <View style={styles.nextActionCard}>
          <Text style={styles.nextActionLabel}>Sonraki adım</Text>
          <Text style={styles.nextActionText}>{campaign.nextActionText}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.bottomMeta}>
            <Text style={styles.bottomLabel}>Ödül</Text>
            <Text style={styles.reward}>{campaign.rewardText}</Text>
          </View>
          <View style={styles.bottomMetaRight}>
            <Text style={styles.bottomLabel}>Durum</Text>
            <Text style={styles.deadline}>{campaign.deadlineText}</Text>
          </View>
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
  bank: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  bankSubline: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 30,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  progressShell: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  progressValue: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  nextActionCard: {
    backgroundColor: '#FFF6E8',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 4,
  },
  nextActionLabel: {
    color: colors.warning,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  nextActionText: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  bottomMeta: {
    flex: 1,
    gap: 4,
  },
  bottomMetaRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  bottomLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  reward: {
    color: colors.success,
    fontWeight: '900',
    fontSize: 18,
  },
  deadline: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
});
