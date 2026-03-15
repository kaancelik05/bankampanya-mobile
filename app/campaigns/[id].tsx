import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useQuery } from '@tanstack/react-query';
import { getCampaignDetailById } from '@/services/api/campaigns';

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: campaign } = useQuery({
    queryKey: ['campaigns', 'detail', id],
    queryFn: () => getCampaignDetailById(id || ''),
    enabled: !!id,
  });

  if (!campaign) {
    return (
      <AppScreen>
        <AppHeader title="Kampanya Detayı" subtitle="Kayıt bulunamadı" />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader title="Kampanya Detayı" subtitle={campaign.bankName} />

      <View style={styles.banner}>
        <Text style={styles.bannerEyebrow}>{campaign.category}</Text>
        <Text style={styles.bannerTitle}>{campaign.title}</Text>
        <Text style={styles.bannerSubtitle}>{campaign.shortDescription}</Text>
      </View>

      <SurfaceCard>
        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>Ödül</Text>
          <TagPill tag={{ id: 'reward', label: campaign.rewardText, tone: 'success' }} />
        </View>
        <Text style={styles.dateText}>{campaign.validDateRange}</Text>
        <Text style={styles.metaText}>{campaign.deadlineText}</Text>
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Kampanya Koşulları</Text>
        {campaign.terms.map((term) => (
          <Text key={term} style={styles.rule}>
            • {term}
          </Text>
        ))}
      </SurfaceCard>

      <View style={styles.actions}>
        <PrimaryButton label="Bankaya Git" />
        <SecondaryButton label={campaign.isJoined ? 'Katıldım' : 'Kampanyalarıma Ekle'} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  bannerEyebrow: {
    color: '#FFB06A',
    fontWeight: '800',
    fontSize: 13,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  bannerSubtitle: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rewardLabel: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '800',
  },
  dateText: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '800',
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  rule: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  actions: {
    gap: spacing.md,
  },
});
