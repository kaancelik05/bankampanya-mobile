import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { PlaceholderCard } from '@/components/common/PlaceholderCard';
import { ProgressSteps } from '@/components/common/ProgressSteps';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useOnboardingStore } from '@/store/onboarding-store';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function OnboardingAccountScreen() {
  const { selectedBanks, selectedCardTypes, selectedCategories, selectedBrands, getProgressStep } = useOnboardingStore();

  return (
    <AppScreen>
      <AppHeader title="Hazırsın" subtitle="Kartlarına ve ilgi alanlarına göre ilk fırsat setini hazırladık. Hesabını oluşturarak devam edebilirsin." />

      <ProgressSteps current={getProgressStep()} total={3} title="Onboarding adımları" />

      <PlaceholderCard
        title="Seçim özetin"
        description={`${selectedBanks.length} banka, ${selectedCardTypes.length} kart türü, ${selectedCategories.length} kategori ve ${selectedBrands.length} marka seçtin. Bundan sonra sana daha kişisel kampanyalar göstereceğiz.`}
      />

      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{selectedBanks.length}</Text>
          <Text style={styles.summaryLabel}>Banka</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{selectedCardTypes.length}</Text>
          <Text style={styles.summaryLabel}>Kart Türü</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{selectedCategories.length}</Text>
          <Text style={styles.summaryLabel}>Kategori</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{selectedBrands.length}</Text>
          <Text style={styles.summaryLabel}>Marka</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Kayıt Ol" onPress={() => router.push('/(auth)/register')} />
        <SecondaryButton label="Giriş Yap" onPress={() => router.push('/(auth)/login')} />
      </View>

      <Text style={styles.footer}>İstersen daha sonra profilinden ve cüzdanından seçimlerini güncelleyebilirsin.</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryItem: {
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  summaryValue: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  actions: {
    gap: spacing.md,
  },
  footer: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
