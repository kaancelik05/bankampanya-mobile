import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { CampaignPreviewCard } from '@/components/common/CampaignPreviewCard';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePersonalizedCampaigns } from '@/hooks/useCampaigns';

const categories = ['Market', 'Akaryakıt', 'Seyahat', 'Teknoloji', 'Online Alışveriş'];
const filters = ['Banka', 'Kart Türü', 'Cashback', 'Puan', 'Mil'];

export default function DiscoverScreen() {
  const { data: personalizedCampaigns = [], isLoading, isError } = usePersonalizedCampaigns();

  return (
    <AppScreen>
      <AppHeader title="Keşfet" subtitle="Kategori, kart türü ve ödül tipine göre fırsatları filtrele." showBackButton={false} />

      <Pressable style={styles.searchBox}>
        <Text style={styles.searchLabel}>Kampanya ara</Text>
        <Text style={styles.searchPlaceholder}>Örn: market, akaryakıt, mil kampanyası</Text>
      </Pressable>

      {isLoading ? <StateCard title="Yükleniyor" description="Keşfet ekranı için kampanyalar hazırlanıyor..." /> : null}
      {isError ? <StateCard title="Keşfet verileri alınamadı" description="Kampanyalar şu an listelenemiyor." tone="danger" /> : null}
      {!isLoading && !isError && personalizedCampaigns.length === 0 ? (
        <StateCard title="Gösterilecek kampanya yok" description="Filtrelerini değiştirerek tekrar deneyebilirsin." tone="warning" />
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {categories.map((category, index) => (
            <View key={category} style={[styles.filterChip, index === 1 && styles.filterChipActive]}>
              <Text style={[styles.filterChipText, index === 1 && styles.filterChipTextActive]}>{category}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filtreler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {filters.map((filter) => (
            <View key={filter} style={styles.filterChipMuted}>
              <Text style={styles.filterChipMutedText}>{filter}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <SurfaceCard>
        <View style={styles.featuredTopRow}>
          <Text style={styles.featuredEyebrow}>Öne Çıkan Fırsatlar</Text>
          <TagPill tag={{ id: 'featured', label: 'Kartına Uygun', tone: 'success' }} />
        </View>
        <Text style={styles.featuredTitle}>Seçili akaryakıt harcamalarında ek cashback fırsatları seni bekliyor.</Text>
        <Text style={styles.featuredDescription}>Kredi kartların ve tercih ettiğin markalara göre sana uygun kampanyaları öne çıkarıyoruz.</Text>
      </SurfaceCard>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kampanyalar</Text>
        {personalizedCampaigns.map((campaign) => (
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
