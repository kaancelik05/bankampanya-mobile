import { useMemo } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import { SelectableChip } from '@/components/common/SelectableChip';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useOnboardingStore } from '@/store/onboarding-store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useOnboardingOptions } from '@/hooks/useOnboarding';

export default function OnboardingCardsScreen() {
  const {
    selectedBanks,
    selectedCardTypes,
    setSelectedBanks,
    setSelectedCardTypes,
    canContinueFromCards,
    getProgressStep,
  } = useOnboardingStore();
  const { data: options } = useOnboardingOptions();

  const canContinue = canContinueFromCards();
  const progressStep = useMemo(() => getProgressStep(), [getProgressStep, selectedBanks, selectedCardTypes]);

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    router.push('/(auth)/onboarding-interests');
  };

  return (
    <AppScreen>
      <AppHeader title="Banka ve kartlarını seç" subtitle="Kullandığın bankaları ve kart türlerini belirterek sana daha doğru kampanyalar gösterelim." />

      <ProgressSteps current={progressStep} total={3} title="Onboarding adımları" />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Bankalar</Text>
          <Text style={styles.helperLabel}>Birden fazla seçim yapabilirsin</Text>
        </View>
        <View style={styles.bankGrid}>
          {(options?.banks ?? []).map((bank) => {
            const active = selectedBanks.includes(bank);

            return (
              <View key={bank} style={[styles.bankCard, active && styles.bankCardActive]}>
                <View style={styles.bankTopRow}>
                  <Text style={styles.bankName}>{bank}</Text>
                  {active ? <Text style={styles.selectedMark}>✓</Text> : null}
                </View>
                <Pressable
                  testID={`bank-option-${bank.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  accessibilityRole="button"
                  accessibilityLabel={`${bank} bankasını ${active ? 'seçili' : 'seç'}`}
                  accessibilityState={{ selected: active }}
                  style={[styles.bankSelectButton, active && styles.bankSelectButtonActive]}
                  onPress={() => toggle(bank, selectedBanks, setSelectedBanks)}
                >
                  <Text style={[styles.bankSelectButtonText, active && styles.bankSelectButtonTextActive]}>{active ? 'Seçildi' : 'Seç'}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Kart Türleri</Text>
          <Text style={styles.helperLabel}>En çok kullandığın kart yapıları</Text>
        </View>
        <View style={styles.cardTypeGrid}>
          {(options?.cardTypes ?? []).map((type) => {
            const active = selectedCardTypes.includes(type);

            return (
              <SelectableChip
                key={type}
                label={type}
                active={active}
                testID={`card-type-${type.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-')}`}
                accessibilityLabel={`${type} kart türünü ${active ? 'seçili' : 'seç'}`}
                helperText={type === 'Kredi Kartı'
                  ? 'Nakit iade, puan ve taksit kampanyalarını öne çıkarır.'
                  : type === 'Banka Kartı'
                    ? 'Günlük harcamaya yönelik fırsatları daha iyi eşleştirir.'
                    : 'İlgili kart tipine göre sana uygun fırsatları öne çıkarır.'}
                onPress={() => toggle(type, selectedCardTypes, setSelectedCardTypes)}
                variant="tile"
              />
            );
          })}
        </View>
      </View>

      <PrimaryButton label="Devam Et" onPress={handleContinue} disabled={!canContinue} />

      <Text style={[styles.footer, !canContinue && styles.footerWarning]}>
        {canContinue ? 'İstersen seçimlerini daha sonra Cüzdanım ekranından güncelleyebilirsin.' : 'Devam etmek için en az 1 banka ve 1 kart türü seç.'}
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.navy,
  },
  helperLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  bankCard: {
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  bankCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  bankTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedMark: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  bankName: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    flex: 1,
  },
  bankSelectButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  bankSelectButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  bankSelectButtonText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  bankSelectButtonTextActive: {
    color: '#fff',
  },
  cardTypeGrid: {
    gap: spacing.md,
  },
  footer: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  footerWarning: {
    color: colors.primary,
    fontWeight: '700',
  },
});
