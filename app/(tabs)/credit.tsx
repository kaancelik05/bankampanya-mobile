import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AnimatedEntrance } from '@/components/common/AnimatedEntrance';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useCreditOffers } from '@/hooks/useCredit';

const creditTypes = ['Kredi', 'Nakit Avans', 'Taksitli Nakit Avans'] as const;
const loanSubtypes = ['İhtiyaç', 'Konut', 'Taşıt'];

export default function CreditScreen() {
  const [selectedType, setSelectedType] = useState<(typeof creditTypes)[number]>('Kredi');
  const [selectedSubtype, setSelectedSubtype] = useState('İhtiyaç');
  const [amount, setAmount] = useState('50000');

  const { data: creditOffers = [] } = useCreditOffers();

  const filteredOffers = useMemo(() => {
    return creditOffers.filter((offer) => {
      if (selectedType === 'Kredi') return offer.title.toLowerCase().includes(selectedSubtype.toLowerCase()) || offer.title.toLowerCase().includes('kredi');
      if (selectedType === 'Nakit Avans') return offer.title.toLowerCase().includes('nakit avans');
      return offer.title.toLowerCase().includes('taksitli');
    });
  }, [creditOffers, selectedSubtype, selectedType]);

  return (
    <AppScreen>
      <AnimatedEntrance delay={0}>
        <AppHeader title="Kredi" subtitle="Kredi, nakit avans ve taksitli nakit avans fırsatlarını daha net bir karşılaştırma akışında incele." showBackButton={false} />
      </AnimatedEntrance>

      <AnimatedEntrance delay={40}>
        <LinearGradient colors={[colors.navy, '#274A78']} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroCopyWrap}>
              <Text style={styles.heroEyebrow}>Finansman karşılaştırma alanı</Text>
              <Text style={styles.heroTitle}>İhtiyacına uygun kredi tekliflerini daha hızlı filtrele ve karşılaştır.</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeValue}>{filteredOffers.length}</Text>
              <Text style={styles.heroBadgeLabel}>teklif</Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>Ürün tipi, alt tür ve tutara göre sana daha uygun teklifleri tek ekranda daha şık ve net bir yapıda sunuyoruz.</Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Ürün tipi</Text>
              <Text style={styles.heroStatValue}>{selectedType}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Tutar</Text>
              <Text style={styles.heroStatValue}>{amount} TL</Text>
            </View>
          </View>
        </LinearGradient>
      </AnimatedEntrance>

      <AnimatedEntrance delay={90}>
        <SurfaceCard>
          <View style={styles.filterHeader}>
            <View>
              <Text style={styles.sectionTitle}>Filtreler</Text>
              <Text style={styles.sectionMeta}>Kredi türünü ve tutarı belirle</Text>
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.fieldLabel}>Tür Seçimi</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeRow}>
              {creditTypes.map((type) => {
                const active = selectedType === type;
                return (
                  <Pressable key={type} style={({ pressed }) => [styles.typeCard, active && styles.typeCardActive, pressed && styles.pressablePressed]} onPress={() => setSelectedType(type)}>
                    <Text style={[styles.typeCardText, active && styles.typeCardTextActive]}>{type}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {selectedType === 'Kredi' ? (
            <View style={styles.filterSection}>
              <Text style={styles.fieldLabel}>Kredi Türü</Text>
              <View style={styles.subtypeGrid}>
                {loanSubtypes.map((subtype) => {
                  const active = selectedSubtype === subtype;
                  return (
                    <Pressable key={subtype} style={({ pressed }) => [styles.subtypeCard, active && styles.subtypeCardActive, pressed && styles.pressablePressed]} onPress={() => setSelectedSubtype(subtype)}>
                      <Text style={[styles.subtypeCardText, active && styles.subtypeCardTextActive]}>{subtype}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          <View style={styles.filterSection}>
            <Text style={styles.fieldLabel}>Tutar</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.amountInput}
              placeholder="0 - 10.000.000 TL"
              placeholderTextColor={colors.textMuted}
            />
            <Text style={styles.helperText}>0 TL ile 10 milyon TL arasında seçim yapabilirsin.</Text>
          </View>
        </SurfaceCard>
      </AnimatedEntrance>

      <AnimatedEntrance delay={140}>
        <View style={styles.listSection}>
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.sectionTitle}>Sonuçlar</Text>
              <Text style={styles.sectionMeta}>{filteredOffers.length} teklif listeleniyor</Text>
            </View>
            <View style={styles.infoBadge}>
              <Text style={styles.infoBadgeEyebrow}>Seçim</Text>
              <Text style={styles.infoBadgeValue}>{selectedType}</Text>
            </View>
          </View>

          {filteredOffers.map((offer) => (
            <Pressable key={offer.id} style={({ pressed }) => [pressed && styles.pressablePressed]} onPress={() => router.push(`/credit/${offer.id}`)}>
              <LinearGradient colors={['#FFFFFF', '#F7F9FC']} style={styles.offerCard}>
                <View style={styles.offerTopRow}>
                  <View style={styles.offerBankWrap}>
                    <Text style={styles.offerBank}>{offer.bankName}</Text>
                    <Text style={styles.offerSubline}>{offer.amountRange}</Text>
                  </View>
                  <TagPill tag={{ id: offer.id, label: offer.rate, tone: 'success' }} />
                </View>

                <Text style={styles.offerTitle}>{offer.title}</Text>

                <View style={styles.offerFooterCard}>
                  <View style={styles.offerFooterMeta}>
                    <Text style={styles.offerFooterLabel}>Tutar aralığı</Text>
                    <Text style={styles.offerFooterValue}>{offer.amountRange}</Text>
                  </View>
                  <View style={styles.offerFooterMetaRight}>
                    <Text style={styles.offerFooterLabel}>Karşılaştır</Text>
                    <Text style={styles.offerFooterValueRight}>Detayı Aç</Text>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
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
  filterHeader: {
    marginBottom: spacing.lg,
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
  filterSection: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  fieldLabel: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  typeRow: {
    gap: spacing.sm,
  },
  typeCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  typeCardActive: {
    backgroundColor: colors.primary,
  },
  typeCardText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 13,
  },
  typeCardTextActive: {
    color: '#fff',
  },
  subtypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  subtypeCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  subtypeCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  subtypeCardText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 13,
  },
  subtypeCardTextActive: {
    color: colors.primary,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  listSection: {
    gap: spacing.md,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoBadge: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 2,
    minWidth: 96,
  },
  infoBadgeEyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  infoBadgeValue: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
  },
  offerCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#E4EAF2',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  offerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  offerBankWrap: {
    flex: 1,
    gap: 2,
  },
  offerBank: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  offerSubline: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  offerTitle: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 30,
  },
  offerFooterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  offerFooterMeta: {
    flex: 1,
    gap: 4,
  },
  offerFooterMetaRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  offerFooterLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  offerFooterValue: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  offerFooterValueRight: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '900',
    textAlign: 'right',
  },
});
