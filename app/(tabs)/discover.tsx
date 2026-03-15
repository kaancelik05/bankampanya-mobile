import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { DiscoverCampaignCard } from '@/components/common/DiscoverCampaignCard';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePersonalizedCampaigns } from '@/hooks/useCampaigns';

const categories = ['Tümü', 'Market', 'Akaryakıt', 'Seyahat', 'Teknoloji', 'Online Alışveriş'] as const;
const filters = ['Tümü', 'Banka', 'Kart Türü', 'Cashback', 'Puan', 'Mil'] as const;

const categoryMeta: Record<string, { icon: string; description: string }> = {
  Tümü: { icon: '✦', description: 'Tüm kampanya akışı' },
  Market: { icon: '🛒', description: 'Günlük harcama fırsatları' },
  Akaryakıt: { icon: '⛽', description: 'Yakıt ve istasyon indirimleri' },
  Seyahat: { icon: '✈️', description: 'Mil ve bilet avantajları' },
  Teknoloji: { icon: '⌘', description: 'Elektronik ve cihaz kampanyaları' },
  'Online Alışveriş': { icon: '◌', description: 'E-ticaret odaklı teklifler' },
};

const featuredIdeas = [
  {
    id: 'featured-1',
    eyebrow: 'Bugünün Önerisi',
    title: 'Akaryakıt harcamalarında kartına uygun en yüksek cashback fırsatlarını öne çıkardık.',
    description: 'Yakında sona erecek kampanyaları, ödül tipi ve kullanım alışkanlığına göre tek bakışta keşfet.',
    tag: { id: 'featured-cashback', label: 'Kartına Uygun', tone: 'success' as const },
    accent: '#8FF0A4',
    metaLeft: 'Yakıt ve istasyon indirimleri',
    metaRight: 'Son günler',
  },
  {
    id: 'featured-2',
    eyebrow: 'Hızlı Keşif',
    title: 'Online alışverişte puan kazandıran yeni kampanyaları son günler bitmeden yakala.',
    description: 'Kategori, kart türü ve reward tipine göre dağılmadan filtreleyebileceğin daha temiz bir akış hazırladık.',
    tag: { id: 'featured-points', label: 'Son Günler', tone: 'warning' as const },
    accent: '#FFB06A',
    metaLeft: 'E-ticaret odaklı teklifler',
    metaRight: 'Yüksek puan potansiyeli',
  },
  {
    id: 'featured-3',
    eyebrow: 'Seçili Fırsatlar',
    title: 'Market ve günlük harcamalarda görünür kazanç sağlayan kampanyaları önceliklendir.',
    description: 'Sık kullanılan kartlarınla en uyumlu fırsatları üst sıraya taşıyarak keşfet deneyimini sadeleştiriyoruz.',
    tag: { id: 'featured-market', label: 'Popüler', tone: 'info' as const },
    accent: '#AFC6E9',
    metaLeft: 'Günlük harcama fırsatları',
    metaRight: 'Hızlı inceleme',
  },
];

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('Tümü');
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>('Tümü');

  const { data: personalizedCampaigns = [], isLoading, isError } = usePersonalizedCampaigns();

  const filteredCampaigns = useMemo(() => {
    return personalizedCampaigns.filter((campaign) => {
      const normalizedSearch = searchText.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [campaign.title, campaign.bankName, campaign.shortDescription, campaign.category, campaign.rewardText]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory = selectedCategory === 'Tümü' || campaign.category === selectedCategory;

      const matchesFilter =
        selectedFilter === 'Tümü' ||
        (selectedFilter === 'Cashback' && campaign.rewardType === 'cashback') ||
        (selectedFilter === 'Puan' && campaign.rewardType === 'puan') ||
        (selectedFilter === 'Mil' && campaign.rewardType === 'mil') ||
        (selectedFilter === 'Banka' && campaign.bankName.length > 0) ||
        (selectedFilter === 'Kart Türü' && Boolean(campaign.tags?.some((tag) => tag.label.includes('Kart') || tag.label.includes('Uygun'))));

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [personalizedCampaigns, searchText, selectedCategory, selectedFilter]);

  const featuredCampaigns = useMemo(() => filteredCampaigns.slice(0, 3), [filteredCampaigns]);
  const selectedCategoryMeta = categoryMeta[selectedCategory] ?? categoryMeta.Tümü;
  const activeFilterCount = Number(selectedCategory !== 'Tümü') + Number(selectedFilter !== 'Tümü') + Number(searchText.trim().length > 0);

  const handleClearSearch = () => {
    setSearchText('');
    setIsSearchOpen(false);
  };

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Keşfet" subtitle="Fırsatları daha hızlı bul, filtrele ve sana en uygun kampanyaları öne çıkar." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Akıllı keşif alanı</Text>
              <Text style={styles.heroTitle}>Kartına en uygun fırsatları dağılmadan bul.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{filteredCampaigns.length}</Text>
              <Text style={styles.heroBadgeLabel}>sonuç</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>
            {activeFilterCount > 0
              ? `${selectedCategoryMeta.description} için sonuçları senin seçimine göre daralttık.`
              : 'Kategori, ödül tipi ve kart yapısına göre rafine edilmiş kampanyaları tek akışta incele.'}
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Seçili kategori</Text>
              <Text style={styles.heroStatValue}>{selectedCategory}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Aktif filtre</Text>
              <Text style={styles.heroStatValue}>{activeFilterCount}</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={80}>
        <View style={styles.searchShell}>
          <View style={styles.searchHeadRow}>
            <Text style={styles.searchLabel}>Kampanya ara</Text>
            {isSearchOpen || searchText.trim().length > 0 ? (
              <Pressable style={({ pressed }) => [styles.clearButton, pressed && styles.pressablePressed]} onPress={handleClearSearch}>
                <Text style={styles.clearText}>Temizle</Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable style={({ pressed }) => [styles.searchBox, pressed && styles.pressablePressed]} onPress={() => setIsSearchOpen(true)}>
            <View style={styles.searchRow}>
              <Text style={styles.searchIcon}>⌕</Text>
              {isSearchOpen ? (
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Örn: market, akaryakıt, mil kampanyası"
                  placeholderTextColor={colors.textMuted}
                  style={styles.searchInput}
                  autoFocus
                />
              ) : (
                <Text style={styles.searchPlaceholder}>Örn: market, akaryakıt, mil kampanyası</Text>
              )}
            </View>
          </Pressable>
        </View>
      </AnimatedEntrance>

      {isLoading ? <StateCard title="Yükleniyor" description="Keşfet ekranı için kampanyalar hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Keşfet verileri alınamadı" description="Kampanyalar şu an listelenemiyor." tone="danger" /> : null}
      {!isLoading && !isError && filteredCampaigns.length === 0 ? (
        <View style={styles.emptyStateWrap}>
          <StateCard title="Sonuç bulunamadı" description="Arama veya filtre kriterlerini değiştirerek tekrar deneyebilirsin." tone="warning" />
          <Pressable style={({ pressed }) => [styles.emptyStateAction, pressed && styles.pressablePressed]} onPress={() => router.push('/(tabs)/for-you')}>
            <Text style={styles.emptyStateActionText}>Senin İçin'e Dön</Text>
          </Pressable>
        </View>
      ) : null}

      <AnimatedEntrance delay={120}>
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Kategoriler</Text>
            <Text style={styles.sectionMeta}>{selectedCategoryMeta.description}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((category) => {
              const active = selectedCategory === category;
              const meta = categoryMeta[category] ?? categoryMeta.Tümü;

              return (
                <Pressable
                  key={category}
                  style={({ pressed }) => [styles.categoryCard, active && styles.categoryCardActive, pressed && styles.pressablePressed]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={styles.categoryIcon}>{meta.icon}</Text>
                  <Text style={[styles.categoryTitle, active && styles.categoryTitleActive]}>{category}</Text>
                  <Text style={[styles.categoryDescription, active && styles.categoryDescriptionActive]}>{meta.description}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={170}>
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Filtreler</Text>
            <Text style={styles.sectionMeta}>Ödül tipine göre daralt</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
            {filters.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <Pressable
                  key={filter}
                  style={({ pressed }) => [styles.filterChip, active && styles.filterChipActive, pressed && styles.pressablePressed]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{filter}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={220}>
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Öne Çıkan Fırsatlar</Text>
            <Text style={styles.sectionMeta}>Keşfet kartlarıyla aynı editoryal dil</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
            {(featuredCampaigns.length > 0 ? featuredCampaigns : featuredIdeas).map((item) => {
              const featured =
                'bankName' in item
                  ? {
                      id: item.id,
                      eyebrow: item.bankName,
                      title: item.title,
                      description: item.shortDescription,
                      tag: { id: `${item.id}-featured`, label: item.rewardText, tone: 'success' as const },
                      accent: item.rewardType === 'cashback' ? '#8FF0A4' : item.rewardType === 'mil' ? '#AFC6E9' : '#FFB06A',
                      metaLeft: item.category,
                      metaRight: item.deadlineText,
                    }
                  : item;

              return (
                <Pressable key={featured.id} style={({ pressed }) => [pressed && styles.pressablePressed]}>
                  <LinearGradient colors={['#132B4E', '#244677']} style={styles.featuredGradientCard}>
                    <View style={[styles.featuredAccent, { backgroundColor: featured.accent }]} />
                    <View style={styles.featuredTopRow}>
                      <View style={styles.featuredBankWrap}>
                        <Text style={styles.featuredEyebrow}>{featured.eyebrow}</Text>
                        <Text style={styles.featuredSubline}>{featured.metaLeft}</Text>
                      </View>
                      <TagPill tag={featured.tag} />
                    </View>
                    <Text style={styles.featuredTitle}>{featured.title}</Text>
                    <Text style={styles.featuredDescription}>{featured.description}</Text>

                    <View style={styles.featuredFooterCard}>
                      <View style={styles.featuredFooterMeta}>
                        <Text style={styles.featuredFooterLabel}>Öne çıkan alan</Text>
                        <Text style={styles.featuredFooterValue}>{featured.metaLeft}</Text>
                      </View>
                      <View style={styles.featuredFooterMetaRight}>
                        <Text style={styles.featuredFooterLabel}>Durum</Text>
                        <Text style={styles.featuredFooterValueRight}>{featured.metaRight}</Text>
                      </View>
                    </View>

                    <View style={styles.featuredBottomActionRow}>
                      <Text style={styles.featuredActionHint}>Editoryal seçki</Text>
                      <Text style={styles.featuredActionText}>İncele</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </AnimatedEntrance>

      <AnimatedEntrance delay={270}>
        <View style={styles.section}>
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.sectionTitle}>Kampanyalar</Text>
              <Text style={styles.sectionMeta}>{filteredCampaigns.length} sonuç listeleniyor</Text>
            </View>
            <SurfaceCard>
              <View style={styles.resultSummaryCard}>
                <Text style={styles.resultSummaryEyebrow}>Seçili filtre</Text>
                <Text style={styles.resultSummaryValue}>{selectedFilter}</Text>
              </View>
            </SurfaceCard>
          </View>

          {filteredCampaigns.map((campaign) => (
            <DiscoverCampaignCard
              key={campaign.id}
              campaign={campaign}
              onPress={() => router.push(campaign.isProgressive ? `/tracking/${campaign.id}` : `/campaigns/${campaign.id}`)}
            />
          ))}
        </View>
      </AnimatedEntrance>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
  searchShell: {
    gap: spacing.sm,
  },
  searchHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchLabel: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  clearText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  searchBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  searchIcon: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  searchPlaceholder: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  searchInput: {
    flex: 1,
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
    paddingVertical: 0,
  },
  pressablePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  emptyStateWrap: {
    gap: spacing.sm,
  },
  emptyStateAction: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  emptyStateActionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  section: {
    gap: spacing.md,
  },
  sectionHeadingRow: {
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
    flexShrink: 1,
    textAlign: 'right',
  },
  categoryRow: {
    gap: spacing.md,
  },
  categoryCard: {
    width: 144,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  categoryCardActive: {
    borderColor: '#FFD6B0',
    backgroundColor: colors.primarySoft,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '800',
  },
  categoryTitleActive: {
    color: colors.primary,
  },
  categoryDescription: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  categoryDescriptionActive: {
    color: colors.navy,
  },
  horizontalRow: {
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 13,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  featuredRow: {
    gap: spacing.md,
  },
  featuredGradientCard: {
    width: 312,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  featuredAccent: {
    width: 48,
    height: 6,
    borderRadius: radius.pill,
  },
  featuredTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  featuredBankWrap: {
    flex: 1,
    gap: 2,
  },
  featuredEyebrow: {
    color: '#D6E3F5',
    fontWeight: '800',
    fontSize: 13,
  },
  featuredSubline: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '900',
  },
  featuredDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 21,
  },
  featuredFooterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  featuredFooterMeta: {
    flex: 1,
    gap: 4,
  },
  featuredFooterMetaRight: {
    flex: 1,
    gap: 4,
    alignItems: 'flex-end',
  },
  featuredFooterLabel: {
    color: '#AFC6E9',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  featuredFooterValue: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  featuredFooterValueRight: {
    color: '#FFB06A',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    textAlign: 'right',
  },
  featuredBottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredActionHint: {
    color: '#AFC6E9',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  resultSummaryCard: {
    minWidth: 112,
    gap: 4,
  },
  resultSummaryEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  resultSummaryValue: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '900',
  },
});
