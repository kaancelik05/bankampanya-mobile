import { useMemo } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import { SelectableChip } from '@/components/common/SelectableChip';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useOnboardingStore } from '@/store/onboarding-store';
import { colors } from '@/theme/colors';
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
      <AppHeader
        title="Banka ve kartlarını seç"
        subtitle="Kullandığın bankaları ve kart türlerini belirterek sana daha doğru kampanyalar gösterelim."
      />

      <ProgressSteps current={progressStep} total={3} title="Onboarding adımları" />

      <View style={styles.section}>
        <Text style={styles.label}>Bankalar</Text>
        <View style={styles.grid}>
          {(options?.banks ?? []).map((bank) => {
            const active = selectedBanks.includes(bank);
            return (
              <SelectableChip
                key={bank}
                label={bank}
                helperText="Kampanya eşleştirmede kullanılır"
                active={active}
                onPress={() => toggle(bank, selectedBanks, setSelectedBanks)}
                variant="tile"
              />
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Kart Türleri</Text>
        <View style={styles.wrap}>
          {(options?.cardTypes ?? []).map((type) => {
            const active = selectedCardTypes.includes(type);
            return (
              <SelectableChip
                key={type}
                label={type}
                active={active}
                onPress={() => toggle(type, selectedCardTypes, setSelectedCardTypes)}
              />
            );
          })}
        </View>
      </View>

      <PrimaryButton label="Devam Et" onPress={handleContinue} />

      <Text style={[styles.footer, !canContinue && styles.footerWarning]}>
        {canContinue
          ? 'İstersen seçimlerini daha sonra Cüzdanım ekranından güncelleyebilirsin.'
          : 'Devam etmek için en az 1 banka ve 1 kart türü seç.'}
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  label: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.navy,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
