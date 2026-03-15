import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AppInput } from '@/components/ui/AppInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { StateCard } from '@/components/common/StateCard';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { usePasswordResetMutation } from '@/hooks/useAuthMutations';

const forgotPasswordSchema = z.object({
  identifier: z.string().min(3, 'E-posta veya telefon bilgini gir.'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const resetMutation = usePasswordResetMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      identifier: '',
    },
  });

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Hesap Erişimi</Text>
        <Text style={styles.title}>Şifremi Unuttum</Text>
        <Text style={styles.subtitle}>Şifre sıfırlama bağlantısı gönderebilmemiz için e-posta veya telefon bilgini gir.</Text>
      </View>

      <View style={styles.formCard}>
        <AppHeader title="Sıfırlama talebi" subtitle="Bu ekran menüsüz ve odaklı tutulur. Kullanıcının dikkatini dağıtmadan işlem tamamlatmayı hedefler." rightActions={[]} />
        <View style={styles.form}>
          <AppInput
            label="E-posta veya telefon"
            value={watch('identifier')}
            onChangeText={(value) => setValue('identifier', value, { shouldValidate: true })}
            helperText={errors.identifier?.message}
          />
        </View>
      </View>

      {resetMutation.isError ? <StateCard title="İstek gönderilemedi" description="Sıfırlama işlemi şu an tamamlanamadı." tone="danger" /> : null}
      {resetMutation.isSuccess ? <StateCard title="İstek alındı" description={resetMutation.data?.message ?? 'Sıfırlama isteğin başarıyla oluşturuldu.'} /> : null}
      <PrimaryButton label={resetMutation.isPending ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'} onPress={handleSubmit((values) => resetMutation.mutate(values))} />

      <Text style={styles.info}>Bağlantı veya doğrulama kodu ilgili iletişim kanalına gönderilir.</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    color: '#FFB06A',
    fontWeight: '800',
    fontSize: 13,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D6E3F5',
    fontSize: 14,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  info: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
