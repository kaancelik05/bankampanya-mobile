import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { PlaceholderCard } from '@/components/common/PlaceholderCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useOnboardingStore } from '@/store/onboarding-store';
import { colors } from '@/theme/colors';

export default function OnboardingAccountScreen() {
  const { selectedBanks, selectedCategories } = useOnboardingStore();

  return (
    <AppScreen>
      <AppHeader title="Hazırsın" subtitle="Kartlarına ve ilgi alanlarına göre ilk fırsat setini hazırladık. Hesabını oluşturarak devam edebilirsin." />

      <PlaceholderCard
        title="Seçim özetin"
        description={`${selectedBanks.length || 0} banka, ${selectedCategories.length || 0} kategori seçtin. Bundan sonra sana daha kişisel kampanyalar göstereceğiz.`}
      />

      <View style={styles.actions}>
        <PrimaryButton label="Kayıt Ol" onPress={() => router.push('/(auth)/register')} />
        <SecondaryButton label="Giriş Yap" onPress={() => router.push('/(auth)/login')} />
      </View>

      <Text style={styles.footer}>İstersen daha sonra profilinden kartlarını güncelleyebilirsin.</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
  },
  footer: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
