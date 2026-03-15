import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export default function OnboardingStartScreen() {
  return (
    <AppScreen>
      <LinearGradient colors={[colors.navy, '#244677']} style={styles.hero}>
        <Text style={styles.brand}>Bankampanya</Text>
        <Text style={styles.heroTitle}>Kartlarınla daha çok kazan</Text>
        <Text style={styles.heroSubtitle}>
          Tüm kampanyaları, kredi fırsatlarını ve takip etmen gereken adımları tek yerde gör.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Uygun Fırsat</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1.450 TL</Text>
            <Text style={styles.statLabel}>Potansiyel Kazanç</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Akıllı başlangıç</Text>
        <Text style={styles.infoText}>
          Önce bankalarını, kart türlerini ve ilgi alanlarını seç. Sonra sana uygun fırsatları gösterelim.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Devam Et" onPress={() => router.push('/(auth)/onboarding-cards')} />
        <SecondaryButton label="Giriş Yap" onPress={() => router.push('/(auth)/login')} />
      </View>

      <Text style={styles.caption}>Aşamalı kampanyaları takip et, işlemlerini ekle, kazancını görünür hale getir.</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    gap: spacing.lg,
  },
  brand: {
    color: '#FFB06A',
    fontWeight: '800',
    fontSize: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    maxWidth: 340,
  },
  heroSubtitle: {
    color: '#D9E6F7',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 340,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 6,
  },
  statValue: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
  },
  statLabel: {
    color: '#D9E6F7',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  infoTitle: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 22,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.md,
  },
  caption: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
