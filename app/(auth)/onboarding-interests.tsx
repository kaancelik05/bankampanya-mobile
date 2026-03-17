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

export default function OnboardingInterestsScreen() {
  const {
    selectedCategories,
    selectedBrands,
    setSelectedCategories,
    setSelectedBrands,
    canContinueFromInterests,
    getProgressStep,
  } = useOnboardingStore();
  const { data: options } = useOnboardingOptions();

  const canContinue = canContinueFromInterests();
  const progressStep = useMemo(() => getProgressStep(), [getProgressStep, selectedCategories, selectedBrands]);

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    router.push('/(auth)/onboarding-account');
  };

  return (
    <AppScreen>
      <AppHeader
        title="Sektör ve marka tercihlerin"
        subtitle="Sık harcama yaptığın alanları seç, sana daha güçlü ve kişisel öneriler hazırlayalım."
      />

      <ProgressSteps current={progressStep} total={3} title="Onboarding adımları" />

      <View style={styles.section}>
        <Text style={styles.label}>Kategoriler</Text>
        <View style={styles.wrap}>
          {(options?.categories ?? []).map((category) => {
            const active = selectedCategories.includes(category);
            return (
              <SelectableChip
                key={category}
                label={category}
                active={active}
                testID={`interest-category-${category.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-')}`}
                accessibilityLabel={`${category} kategorisini ${active ? 'seçili' : 'seç'}`}
                onPress={() => toggle(category, selectedCategories, setSelectedCategories)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sık kullandığın markalar</Text>
        <View style={styles.grid}>
          {(options?.brands ?? []).map((brand) => {
            const active = selectedBrands.includes(brand);
            return (
              <SelectableChip
                key={brand}
                label={brand}
                helperText="Öne çıkan fırsatları şekillendirir"
                active={active}
                accessibilityLabel={`${brand} markasını ${active ? 'seçili' : 'seç'}`}
                testID={`interest-brand-${brand.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, '-')}`}
                onPress={() => toggle(brand, selectedBrands, setSelectedBrands)}
                variant="tile"
              />
            );
          })}
        </View>
      </View>

      <PrimaryButton label="Devam Et" onPress={handleContinue} />

      <Text style={[styles.footer, !canContinue && styles.footerWarning]}>
        {canContinue
          ? 'Örn. akaryakıt ve market tercihin varsa ilgili kampanyaları öne çıkaracağız.'
          : 'Devam etmek için en az 1 kategori veya 1 marka seç.'}
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
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
