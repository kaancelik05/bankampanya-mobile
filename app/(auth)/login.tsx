import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AppInput } from '@/components/ui/AppInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { StateCard } from '@/components/common/StateCard';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useLoginMutation } from '@/hooks/useAuthMutations';

const loginSchema = z.object({
  identifier: z.string().min(3, 'E-posta veya telefon bilgini gir.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const loginMutation = useLoginMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const response = await loginMutation.mutateAsync(values);
    setAuthSession({
      user: response.user,
      session: response.session,
    });
    router.replace('/(tabs)/for-you');
  };

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Bankampanya</Text>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Takipteki kampanyalarına, kartlarına ve fırsatlarına kaldığın yerden devam et.</Text>
      </View>

      <View style={styles.formCard}>
        <AppHeader title="Hesabına eriş" subtitle="E-posta veya telefon bilgilerinle giriş yapabilirsin." rightActions={[]} />
        <View style={styles.form}>
          <AppInput
            label="E-posta veya telefon"
            testID="login-identifier"
            accessibilityLabel="E-posta veya telefon"
            value={watch('identifier')}
            onChangeText={(value) => setValue('identifier', value, { shouldValidate: true })}
            helperText={errors.identifier?.message}
          />
          <AppInput
            label="Şifre"
            testID="login-password"
            accessibilityLabel="Şifre"
            value={watch('password')}
            onChangeText={(value) => setValue('password', value, { shouldValidate: true })}
            helperText={errors.password?.message}
          />
        </View>
      </View>

      <View style={styles.actions}>
        {loginMutation.isError ? <StateCard title="Giriş yapılamadı" description={loginMutation.error instanceof Error ? loginMutation.error.message : 'Lütfen bilgilerini kontrol edip tekrar dene.'} tone="danger" /> : null}
        <PrimaryButton
          label={loginMutation.isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          testID="login-submit"
          accessibilityLabel="Giriş Yap"
          onPress={handleSubmit(onSubmit)}
        />
        <SecondaryButton label="Şifremi Unuttum" testID="forgot-password" accessibilityLabel="Şifremi Unuttum" onPress={() => router.push('/(auth)/forgot-password')} />
      </View>

      <Pressable onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.footer}>Hesabın yok mu? Kayıt Ol</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
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
    padding: spacing['2xl'],
    gap: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  actions: {
    gap: spacing.lg,
  },
  footer: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
