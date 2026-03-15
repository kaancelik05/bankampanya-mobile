import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';

export default function SecurityIntroScreen() {
  return (
    <AppScreen>
      <LinearGradient colors={[colors.navy, '#203B66']} style={styles.hero}>
        <Text style={styles.eyebrow}>Önce Güvenlik</Text>
        <Text style={styles.title}>Bankampanya, kart güvenliğini merkeze alır.</Text>
        <Text style={styles.subtitle}>
          Bankampanya senden kart numarası, CVV, internet bankacılığı şifresi veya işlem onayı gibi hassas bilgileri talep etmez,
          bu verileri saklamaz ve hesabından para çekme yetkisine sahip değildir.
        </Text>

        <View style={styles.trustCard}>
          <Text style={styles.trustTitle}>Kurumsal ilkemiz</Text>
          <Text style={styles.trustText}>
            Misyonumuz, kullanıcılarımızı bankaların güncel kampanya ve fırsatlarından zamanında haberdar ederek daha fazla avantaj ve
            görünür kazanç elde etmelerine yardımcı olmaktır.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.actions}>
        <PrimaryButton label="Devam Et" onPress={() => router.push('/(auth)/onboarding-start')} />
        <SecondaryButton label="Giriş Yap" onPress={() => router.push('/(auth)/login')} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
  },
  eyebrow: {
    color: '#FFB06A',
    fontSize: 14,
    fontWeight: '800',
  },
  title: {
    color: '#fff',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D9E6F7',
    fontSize: 15,
    lineHeight: 24,
  },
  trustCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  trustTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  trustText: {
    color: '#D9E6F7',
    fontSize: 14,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
  },
});
