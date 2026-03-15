import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { AppInput } from '@/components/ui/AppInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { StateCard } from '@/components/common/StateCard';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useRegisterMutation } from '@/hooks/useAuthMutations';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad alanı zorunludur.'),
  email: z.string().email('Geçerli bir e-posta adresi gir.'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası gir.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı.'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const registerMutation = useRegisterMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerMutation.mutateAsync(values);
    setAuthenticated(true);
    router.replace('/(tabs)/for-you');
  };

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Yeni Hesap</Text>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>Kartlarına uygun fırsatları kaydetmek ve takip etmek için hesabını oluştur.</Text>
      </View>

      <View style={styles.formCard}>
        <AppHeader title="Hesabını oluştur" subtitle="Birkaç temel bilgi ile hızlıca başlayabilirsin." />
        <View style={styles.form}>
          <AppInput label="Ad Soyad" value={watch('fullName')} onChangeText={(value) => setValue('fullName', value, { shouldValidate: true })} helperText={errors.fullName?.message} />
          <AppInput label="E-posta" value={watch('email')} onChangeText={(value) => setValue('email', value, { shouldValidate: true })} helperText={errors.email?.message} />
          <AppInput label="Telefon" value={watch('phone')} onChangeText={(value) => setValue('phone', value, { shouldValidate: true })} helperText={errors.phone?.message} />
          <AppInput label="Şifre" value={watch('password')} onChangeText={(value) => setValue('password', value, { shouldValidate: true })} helperText={errors.password?.message} />
        </View>
      </View>

      {registerMutation.isError ? <StateCard title="Kayıt oluşturulamadı" description="Bilgilerini kontrol ederek tekrar dene." tone="danger" /> : null}
      <PrimaryButton label={registerMutation.isPending ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'} onPress={handleSubmit(onSubmit)} />

      <Pressable onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.footer}>Zaten hesabın var mı? Giriş Yap</Text>
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
  footer: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
