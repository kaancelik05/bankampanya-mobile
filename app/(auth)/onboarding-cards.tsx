import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
  const { selectedBanks, selectedCardTypes, setSelectedBanks, setSelectedCardTypes } = useOnboardingStore();
  const { data: options } = useOnboardingOptions();

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  return (
    <AppScreen>
      <AppHeader
        title="Banka ve kartlarını seç"
        subtitle="Kullandığın bankaları ve kart türlerini belirterek sana daha doğru kampanyalar gösterelim."
      />

      <ProgressSteps current={1} total={3} title="Onboarding adımları" />

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

      <Pressable onPress={() => router.push('/(auth)/onboarding-interests')}>
        <PrimaryButton label="Devam Et" />
      </Pressable>

      <Text style={styles.footer}>İstersen seçimlerini daha sonra Cüzdanım ekranından güncelleyebilirsin.</Text>
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
});
