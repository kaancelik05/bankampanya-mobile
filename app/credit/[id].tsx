import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SurfaceCard, TagPill } from '@/components/common/SurfaceCard';
import { StateCard } from '@/components/common/StateCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useCreditOfferDetail } from '@/hooks/useCredit';

export default function CreditDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: offer } = useCreditOfferDetail(id);

  if (!offer) {
    return (
      <AppScreen>
        <AppHeader title="Kredi Detayı" subtitle="Kayıt bulunamadı" />
        <StateCard title="Teklif bulunamadı" description="Bu kredi teklifi şu anda görüntülenemiyor veya artık aktif olmayabilir." tone="warning" />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppHeader title="Kredi Detayı" subtitle={offer.bankName} />

      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>{offer.type}</Text>
        <Text style={styles.heroTitle}>{offer.title}</Text>
        <Text style={styles.heroDescription}>{offer.detailSummary}</Text>
      </View>

      <SurfaceCard>
        <View style={styles.rateRow}>
          <Text style={styles.sectionTitle}>Faiz / Oran</Text>
          <TagPill tag={{ id: 'rate', label: offer.rate, tone: 'success' }} />
        </View>
        <Text style={styles.metaText}>{offer.amountRange}</Text>
        {offer.subtype ? <Text style={styles.metaText}>Tür: {offer.subtype}</Text> : null}
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Katılım Koşulları</Text>
        {offer.terms.map((term) => (
          <Text key={term} style={styles.rule}>
            • {term}
          </Text>
        ))}
      </SurfaceCard>

      <View style={styles.actions}>
        <PrimaryButton label="Bankaya Git" />
        <SecondaryButton label="Detayı Kaydet" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  heroEyebrow: {
    color: '#FFB06A',
    fontWeight: '800',
    fontSize: 13,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  heroDescription: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 6,
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
