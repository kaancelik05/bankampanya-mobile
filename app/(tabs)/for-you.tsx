import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { DiscoverCampaignCard } from '@/components/common/DiscoverCampaignCard';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePersonalizedCampaigns, useFeaturedCampaignSummary } from '@/hooks/useCampaigns';

export default function ForYouScreen() {
  const { data: campaigns = [], isLoading: campaignsLoading, isError: campaignsError } = usePersonalizedCampaigns();
  const { data: featuredCampaignSummary, isLoading: summaryLoading, isError: summaryError } = useFeaturedCampaignSummary();

  const nearCompletion = campaigns.filter((campaign) => campaign.isProgressive);
  const expiringSoon = campaigns.filter((campaign) => campaign.tags?.some((tag) => tag.id === 'expiring'));
  const highlightedCampaigns = campaigns.slice(0, 3);
  const totalPotential = campaigns.length;
  const progressiveCount = nearCompletion.length;

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Senin İçin" subtitle="Kartlarına ve tercih ettiğin markalara göre seçilmiş fırsatlar burada." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Kişisel fırsat alanın</Text>
              <Text style={styles.heroTitle}>Bugün senin için en doğru kampanyaları öncelik sırasıyla hazırladık.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{totalPotential}</Text>
              <Text style={styles.heroBadgeLabel}>öneri</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>
            Dağınık liste yerine, kartların ve kullanım alışkanlıklarınla en uyumlu fırsatları önce gösteren daha sade bir akış oluşturduk.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Aktif takip</Text>
              <Text style={styles.heroStatValue}>{progressiveCount}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Son gün fırsatı</Text>
              <Text style={styles.heroStatValue}>{expiringSoon.length}</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={80}>
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Bugün Ne Yapmak İstersin?</Text>
          <View style={styles.quickActionGrid}>
            <Pressable style={({ pressed }) => [styles.quickActionCard, pressed && styles.pressablePressed]} onPress={() => router.push('/assistant')}>
              <Text style={styles.quickActionEyebrow}>AI Arama</Text>
              <Text style={styles.quickActionTitle}>Hangi kartla daha çok kazanırım?</Text>
              <Text style={styles.quickActionHint}>Akıllı öneri al</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.quickActionCard, pressed && styles.pressablePressed]} onPress={() => router.push('/earnings')}>
              <Text style={styles.quickActionEyebrow}>Kazanç</Text>
              <Text style={styles.quickActionTitle}>Bu ay ne kadar potansiyelin var?</Text>
              <Text style={styles.quickActionHint}>Paneli aç</Text>
            </Pressable>
          </View>
        </View>
      </AnimatedEntrance>

      {campaignsLoading || summaryLoading ? <StateCard title="Yükleniyor" description="Sana uygun fırsatları hazırlıyoruz..." /> : null}
      {campaignsError || summaryError ? <StateCard title="Veriler alınamadı" description="Kampanyalar şu an yüklenemedi. Lütfen tekrar dene." tone="danger" /> : null}
      {!campaignsLoading && !campaignsError && campaigns.length === 0 ? (
        <StateCard title="Henüz fırsat bulunamadı" description="Kartlarını ve tercihlerini güncellediğinde sana daha fazla kampanya gösterebiliriz." tone="warning" />
      ) : null}

      {featuredCampaignSummary ? (
        <AnimatedEntrance delay={120}>
          <LinearGradient colors={['#132B4E', '#244677']} style={styles.summaryCard}>
            <View style={styles.summaryTopRow}>
              <View style={styles.summaryCopyWrap}>
                <Text style={styles.summaryEyebrow}>Kişisel özet</Text>
                <Text style={styles.summaryTitle}>{featuredCampaignSummary.title}</Text>
              </View>
              <View style={styles.summaryValueWrap}>
                <Text style={styles.summaryValue}>{featuredCampaignSummary.monthlyPotentialText}</Text>
                <Text style={styles.summaryValueLabel}>potansiyel</Text>
              </View>
            </View>

            <Text style={styles.summaryDescription}>{featuredCampaignSummary.description}</Text>

            <View style={styles.summaryFooterCard}>
              <View style={styles.summaryFooterMeta}>
                <Text style={styles.summaryFooterLabel}>Öncelik</Text>
                <Text style={styles.summaryFooterValue}>Görünür kazanç ve hızlı aksiyon</Text>
              </View>
              <View style={styles.summaryFooterMetaRight}>
                <Text style={styles.summaryFooterLabel}>Sonraki adım</Text>
                <Text style={styles.summaryFooterValueRight}>Kazanç Paneli</Text>
              </View>
            </View>

            <View style={styles.summaryBottomActionRow}>
              <Text style={styles.summaryActionHint}>Tek bakışta özet</Text>
              <Pressable style={({ pressed }) => [styles.summaryAction, pressed && styles.pressablePressed]} onPress={() => router.push('/earnings')}>
                <Text style={styles.summaryActionText}>Kazanç Panelini Gör</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </AnimatedEntrance>
      ) : null}

      <AnimatedEntrance delay={170}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Bugün Öne Çıkanlar</Text>
              <Text style={styles.sectionMeta}>En yüksek uyumlu 3 fırsat</Text>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/discover')}>
              <Text style={styles.sectionLink}>Tümünü Gör</Text>
            </Pressable>
          </View>

          <View style={styles.highlightedList}>
            {highlightedCampaigns.map((campaign) => (
              <DiscoverCampaignCard
                key={campaign.id}
                campaign={campaign}
                onPress={() => router.push(campaign.isProgressive ? `/tracking/${campaign.id}` : `/campaigns/${campaign.id}`)}
              />
            ))}
          </View>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={220}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Tamamlamaya Yakın</Text>
              <Text style={styles.sectionMeta}>Bitirmene az kalan takipler</Text>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/tracking')}>
              <Text style={styles.sectionLink}>Takibe Git</Text>
            </Pressable>
          </View>

          <FlatList
            data={nearCompletion}
            horizontal
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.carouselCard}>
                <DiscoverCampaignCard campaign={item} onPress={() => router.push(`/tracking/${item.id}`)} />
              </View>
            )}
          />
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={270}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Son Günler</Text>
              <Text style={styles.sectionMeta}>Kaçırmaman gereken hızlı fırsatlar</Text>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/discover')}>
              <Text style={styles.sectionLink}>Keşfet</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expiringRow}>
            {expiringSoon.map((campaign) => (
              <LinearGradient key={campaign.id} colors={['#132B4E', '#244677']} style={styles.expiringCard}>
                <View style={styles.expiringTopRow}>
                  <View style={styles.expiringBankWrap}>
                    <Text style={styles.expiringBank}>{campaign.bankName}</Text>
                    <Text style={styles.expiringSubline}>{campaign.category}</Text>
                  </View>
                  {campaign.tags?.[0] ? <TagPill tag={campaign.tags[0]} /> : null}
                </View>
                <Text style={styles.expiringTitle}>{campaign.title}</Text>
                <Text style={styles.expiringDescription}>{campaign.shortDescription}</Text>
                <View style={styles.expiringFooterCard}>
                  <View style={styles.expiringFooterMeta}>
                    <Text style={styles.expiringFooterLabel}>Durum</Text>
                    <Text style={styles.expiringFooterValue}>Yakında bitiyor</Text>
                  </View>
                  <View style={styles.expiringFooterMetaRight}>
                    <Text style={styles.expiringFooterLabel}>Son tarih</Text>
                    <Text style={styles.expiringFooterValueRight}>{campaign.deadlineText}</Text>
                  </View>
                </View>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={320}>
        <View style={styles.section}>
          <LinearGradient colors={['#F7F9FC', '#EEF3F8']} style={styles.recommendationShell}>
            <View style={styles.recommendationHeader}>
              <View style={styles.recommendationHeaderCopy}>
                <Text style={styles.recommendationEyebrow}>Daha Fazla Öneri</Text>
                <Text style={styles.recommendationTitle}>Sana uygun diğer kampanyalar</Text>
                <Text style={styles.recommendationDescription}>
                  İlk öneriler dışında kalan, profilinle uyumlu fırsatları daha sade bir akışta burada tutuyoruz.
                </Text>
              </View>
              <View style={styles.recommendationBadge}>
                <Text style={styles.recommendationBadgeValue}>{Math.max(campaigns.length - 3, 0)}</Text>
                <Text style={styles.recommendationBadgeLabel}>öneri</Text>
              </View>
            </View>

            <View style={styles.recommendationInfoRow}>
              <View style={styles.recommendationInfoCard}>
                <Text style={styles.recommendationInfoLabel}>Akış türü</Text>
                <Text style={styles.recommendationInfoValue}>Kişisel eşleşme</Text>
              </View>
              <View style={styles.recommendationInfoCard}>
                <Text style={styles.recommendationInfoLabel}>Gösterim mantığı</Text>
                <Text style={styles.recommendationInfoValue}>Öncelik sonrası liste</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.otherCampaignsList}>
            {campaigns.slice(3).map((campaign) => (
              <DiscoverCampaignCard
                key={campaign.id}
                campaign={campaign}
                onPress={() => router.push(campaign.isProgressive ? `/tracking/${campaign.id}` : `/campaigns/${campaign.id}`)}
              />
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
  quickActionsSection: {
    gap: spacing.md,
  },
  quickActionGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  quickActionEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  quickActionTitle: {
    color: colors.navy,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
  },
  quickActionHint: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  summaryCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  summaryCopyWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  summaryEyebrow: {
    color: '#D6E3F5',
    fontWeight: '800',
    fontSize: 13,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  summaryValueWrap: {
    alignItems: 'flex-end',
    gap: 2,
  },
  summaryValue: {
    color: '#8FF0A4',
    fontSize: 26,
    fontWeight: '900',
  },
  summaryValueLabel: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  summaryFooterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  summaryFooterMeta: {
    flex: 1,
    gap: 4,
  },
  summaryFooterMetaRight: {
    flex: 1,
    gap: 4,
    alignItems: 'flex-end',
  },
  summaryFooterLabel: {
    color: '#AFC6E9',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  summaryFooterValue: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  summaryFooterValueRight: {
    color: '#FFB06A',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'right',
  },
  summaryBottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryActionHint: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryAction: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  summaryActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 2,
  },
  sectionLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  highlightedList: {
    gap: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
  },
  carouselCard: {
    width: 312,
  },
  expiringRow: {
    gap: spacing.md,
  },
  expiringCard: {
    width: 300,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  expiringTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  expiringBankWrap: {
    flex: 1,
    gap: 2,
  },
  expiringBank: {
    color: '#D6E3F5',
    fontWeight: '800',
    fontSize: 13,
  },
  expiringSubline: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  expiringTitle: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '900',
  },
  expiringDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  expiringFooterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  expiringFooterMeta: {
    flex: 1,
    gap: 4,
  },
  expiringFooterMetaRight: {
    flex: 1,
    gap: 4,
    alignItems: 'flex-end',
  },
  expiringFooterLabel: {
    color: '#AFC6E9',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  expiringFooterValue: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  expiringFooterValueRight: {
    color: '#FFB06A',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'right',
  },
  otherCampaignsList: {
    gap: spacing.md,
  },
  recommendationShell: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  recommendationHeaderCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  recommendationEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  recommendationTitle: {
    color: colors.navy,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  recommendationDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  recommendationBadge: {
    minWidth: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4EAF2',
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  recommendationBadgeValue: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  recommendationBadgeLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  recommendationInfoRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  recommendationInfoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4EAF2',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 4,
  },
  recommendationInfoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  recommendationInfoValue: {
    color: colors.navy,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
});
