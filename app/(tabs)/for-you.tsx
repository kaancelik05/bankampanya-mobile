import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { CampaignPreviewCard } from '@/components/common/CampaignPreviewCard';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePersonalizedCampaigns, useFeaturedCampaignSummary } from '@/hooks/useCampaigns';
import { useNotificationsList } from '@/hooks/useNotifications';

export default function ForYouScreen() {
  const { data: campaigns = [], isLoading: campaignsLoading, isError: campaignsError } = usePersonalizedCampaigns();
  const { data: notifications = [] } = useNotificationsList();

  const { data: featuredCampaignSummary, isLoading: summaryLoading, isError: summaryError } = useFeaturedCampaignSummary();

  const nearCompletion = campaigns.filter((campaign) => campaign.isProgressive);
  const expiringSoon = campaigns.filter((campaign) => campaign.tags?.some((tag) => tag.id === 'expiring'));

  return (
    <AppScreen>
      <AppHeader
        title="Senin İçin"
        subtitle="Kartlarına ve tercih ettiğin markalara göre seçilmiş fırsatlar burada."
        showBackButton={false}
        rightActions={[
          { icon: 'notifications-outline', label: 'Bildirimler', onPress: () => router.push('/notifications'), badgeCount: notifications.length },
          { icon: 'person-circle-outline', label: 'Profil', onPress: () => router.push('/profile') },
        ]}
      />

      <Pressable style={styles.aiSearchBox} onPress={() => router.push('/assistant')}>
        <Text style={styles.aiSearchTitle}>AI destekli arama</Text>
        <Text style={styles.aiSearchText}>Örn: Akaryakıtta en çok hangi kartımla kazanırım?</Text>
      </Pressable>

      {campaignsLoading || summaryLoading ? (
        <StateCard title="Yükleniyor" description="Sana uygun fırsatları hazırlıyoruz..." />
      ) : null}

      {campaignsError || summaryError ? (
        <StateCard title="Veriler alınamadı" description="Kampanyalar şu an yüklenemedi. Lütfen tekrar dene." tone="danger" />
      ) : null}

      {!campaignsLoading && !campaignsError && campaigns.length === 0 ? (
        <StateCard title="Henüz fırsat bulunamadı" description="Kartlarını ve tercihlerini güncellediğinde sana daha fazla kampanya gösterebiliriz." tone="warning" />
      ) : null}

      {featuredCampaignSummary ? (
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>{featuredCampaignSummary.title}</Text>
            <Text style={styles.heroValue}>{featuredCampaignSummary.monthlyPotentialText}</Text>
          </View>
          <Text style={styles.heroText}>{featuredCampaignSummary.description}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tamamlamaya Yakın</Text>
          <Text style={styles.sectionLink}>Takipe Git</Text>
        </View>
        <FlatList
          data={nearCompletion}
          horizontal
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.carouselCard}>
              <CampaignPreviewCard campaign={item} onPress={() => router.push(`/tracking/${item.id}`)} />
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Günler</Text>
          <Text style={styles.sectionLink}>Keşfet</Text>
        </View>
        {expiringSoon.map((campaign) => (
          <SurfaceCard key={campaign.id}>
            <View style={styles.rowTop}>
              <Text style={styles.bank}>{campaign.bankName}</Text>
              {campaign.tags?.[0] ? <TagPill tag={campaign.tags[0]} /> : null}
            </View>
            <Text style={styles.cardTitle}>{campaign.title}</Text>
            <Text style={styles.cardDescription}>{campaign.shortDescription}</Text>
            <Text style={styles.deadline}>{campaign.deadlineText}</Text>
          </SurfaceCard>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kartlarına Uygun Kampanyalar</Text>
        {campaigns.map((campaign) => (
          <CampaignPreviewCard
            key={campaign.id}
            campaign={campaign}
            onPress={() => router.push(campaign.isProgressive ? `/tracking/${campaign.id}` : `/campaigns/${campaign.id}`)}
          />
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  aiSearchBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: 6,
  },
  aiSearchTitle: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  aiSearchText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 15,
  },
  heroCard: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    gap: spacing.lg,
  },
  heroTopRow: {
    gap: spacing.sm,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '900',
  },
  heroValue: {
    color: '#8FF0A4',
    fontSize: 28,
    fontWeight: '900',
  },
  heroText: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  horizontalList: {
    gap: spacing.md,
  },
  carouselCard: {
    width: 320,
  },
  rowTop: {
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
  cardTitle: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 6,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  deadline: {
    color: colors.warning,
    fontWeight: '700',
    marginTop: spacing.md,
    fontSize: 13,
  },
});
