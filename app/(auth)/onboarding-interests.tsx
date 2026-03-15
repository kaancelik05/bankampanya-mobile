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
  const { selectedCategories, selectedBrands, setSelectedCategories, setSelectedBrands } = useOnboardingStore();
  const { data: options } = useOnboardingOptions();

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  return (
    <AppScreen>
      <AppHeader
        title="Sektör ve marka tercihlerin"
        subtitle="Sık harcama yaptığın alanları seç, sana daha güçlü ve kişisel öneriler hazırlayalım."
      />

      <ProgressSteps current={2} total={3} title="Onboarding adımları" />

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
                onPress={() => toggle(brand, selectedBrands, setSelectedBrands)}
                variant="tile"
              />
            );
          })}
        </View>
      </View>

      <PrimaryButton label="Devam Et" onPress={() => router.push('/(auth)/onboarding-account')} />

      <Text style={styles.footer}>Örn. akaryakıt ve market tercihin varsa ilgili kampanyaları öne çıkaracağız.</Text>
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
});
