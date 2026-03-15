import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
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
      <AppHeader title="Kredi" subtitle="Kredi, nakit avans ve taksitli nakit avans fırsatlarını tutara göre karşılaştır." />

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Tür Seçimi</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {creditTypes.map((type) => {
            const active = selectedType === type;
            return (
              <Pressable key={type} style={[styles.typeChip, active && styles.typeChipActive]} onPress={() => setSelectedType(type)}>
                <Text style={[styles.typeChipText, active && styles.typeChipTextActive]}>{type}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {selectedType === 'Kredi' ? (
          <View style={styles.subtypeWrap}>
            <Text style={styles.fieldLabel}>Kredi Türü</Text>
            <View style={styles.rowWrap}>
              {loanSubtypes.map((subtype) => {
                const active = selectedSubtype === subtype;
                return (
                  <Pressable key={subtype} style={[styles.subtypeChip, active && styles.subtypeChipActive]} onPress={() => setSelectedSubtype(subtype)}>
                    <Text style={[styles.subtypeChipText, active && styles.subtypeChipTextActive]}>{subtype}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        <View style={styles.amountSection}>
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

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Sonuçlar</Text>
        {filteredOffers.map((offer) => (
          <Pressable key={offer.id} onPress={() => router.push(`/credit/${offer.id}`)}>
            <SurfaceCard>
              <View style={styles.offerTopRow}>
                <Text style={styles.offerBank}>{offer.bankName}</Text>
                <TagPill tag={{ id: offer.id, label: offer.rate, tone: 'success' }} />
              </View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerMeta}>{offer.amountRange}</Text>
            </SurfaceCard>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  row: {
    gap: spacing.sm,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  typeChipActive: {
    backgroundColor: colors.primarySoft,
  },
  typeChipText: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 13,
  },
  typeChipTextActive: {
    color: colors.primary,
  },
  subtypeWrap: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  fieldLabel: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  subtypeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  subtypeChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  subtypeChipText: {
    color: colors.navy,
    fontWeight: '700',
    fontSize: 13,
  },
  subtypeChipTextActive: {
    color: colors.primary,
  },
  amountSection: {
    marginTop: spacing.lg,
    gap: spacing.sm,
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
  offerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  offerBank: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  offerTitle: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 6,
  },
  offerMeta: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
