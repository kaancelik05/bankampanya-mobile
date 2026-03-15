import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { CampaignPreviewCard } from '@/components/common/CampaignPreviewCard';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePersonalizedCampaigns } from '@/hooks/useCampaigns';

const categories = ['Tümü', 'Market', 'Akaryakıt', 'Seyahat', 'Teknoloji', 'Online Alışveriş'] as const;
const filters = ['Tümü', 'Banka', 'Kart Türü', 'Cashback', 'Puan', 'Mil'] as const;

const featuredIdeas = [
  {
    id: 'featured-1',
    eyebrow: 'Öne Çıkan Fırsatlar',
    title: 'Seçili akaryakıt harcamalarında ek cashback fırsatları seni bekliyor.',
    description: 'Kredi kartların ve tercih ettiğin markalara göre sana uygun kampanyaları öne çıkarıyoruz.',
    tag: { id: 'featured-cashback', label: 'Kartına Uygun', tone: 'success' as const },
  },
  {
    id: 'featured-2',
    eyebrow: 'Yeni Kampanyalar',
    title: 'Online alışverişte puan kazandıran fırsatları son günler bitmeden keşfet.',
    description: 'Seçili e-ticaret ve teknoloji kampanyalarını senin için hızlıca bir araya getirdik.',
    tag: { id: 'featured-points', label: 'Son Günler', tone: 'warning' as const },
  },
  {
    id: 'featured-3',
    eyebrow: 'Editörün Seçimi',
    title: 'Market ve günlük harcamalarda anında avantaj sunan kampanyalara göz at.',
    description: 'Sık kullanılan kart ve kategori kombinasyonlarına göre keşfet deneyimini kişiselleştiriyoruz.',
    tag: { id: 'featured-market', label: 'Popüler', tone: 'info' as const },
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

  const featuredCampaigns = useMemo(() => {
    return filteredCampaigns.slice(0, 3);
  }, [filteredCampaigns]);

  return (
    <AppScreen>
      <AppHeader title="Keşfet" subtitle="Kategori, kart türü ve ödül tipine göre fırsatları filtrele." showBackButton={false} />

      <Pressable style={styles.searchBox} onPress={() => setIsSearchOpen(true)}>
        <Text style={styles.searchLabel}>Kampanya ara</Text>
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
      </Pressable>

      {isLoading ? <StateCard title="Yükleniyor" description="Keşfet ekranı için kampanyalar hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Keşfet verileri alınamadı" description="Kampanyalar şu an listelenemiyor." tone="danger" /> : null}
      {!isLoading && !isError && filteredCampaigns.length === 0 ? (
        <StateCard title="Sonuç bulunamadı" description="Arama veya filtre kriterlerini değiştirerek tekrar deneyebilirsin." tone="warning" />
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <Pressable key={category} style={[styles.filterChip, active && styles.filterChipActive]} onPress={() => setSelectedCategory(category)}>
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filtreler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {filters.map((filter) => {
            const active = selectedFilter === filter;
            return (
              <Pressable key={filter} style={[styles.filterChipMuted, active && styles.filterChipActive]} onPress={() => setSelectedFilter(filter)}>
                <Text style={[styles.filterChipMutedText, active && styles.filterChipTextActive]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öne Çıkan Fırsatlar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {(featuredCampaigns.length > 0 ? featuredCampaigns : featuredIdeas).map((item) => {
            const featured = 'bankName' in item ? {
              id: item.id,
              eyebrow: item.bankName,
              title: item.title,
              description: item.shortDescription,
              tag: { id: `${item.id}-featured`, label: item.rewardText, tone: 'success' as const },
            } : item;

            return (
              <SurfaceCard key={featured.id}>
                <View style={styles.featuredCard}>
                  <View style={styles.featuredTopRow}>
                    <Text style={styles.featuredEyebrow}>{featured.eyebrow}</Text>
                    <TagPill tag={featured.tag} />
                  </View>
                  <Text style={styles.featuredTitle}>{featured.title}</Text>
                  <Text style={styles.featuredDescription}>{featured.description}</Text>
                </View>
              </SurfaceCard>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kampanyalar</Text>
        {filteredCampaigns.map((campaign) => (
          <CampaignPreviewCard key={campaign.id} campaign={campaign} onPress={() => router.push(campaign.isProgressive ? `/tracking/${campaign.id}` : `/campaigns/${campaign.id}`)} />
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  searchLabel: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  searchPlaceholder: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  horizontalRow: {
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  filterChipActive: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#FFD6B0',
  },
  filterChipText: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 13,
  },
  filterChipTextActive: {
    color: colors.primary,
  },
  filterChipMuted: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipMutedText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 13,
  },
  featuredRow: {
    gap: spacing.md,
  },
  featuredCard: {
    width: 300,
    gap: spacing.sm,
  },
  featuredTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featuredEyebrow: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  featuredTitle: {
    color: colors.navy,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  featuredDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});
