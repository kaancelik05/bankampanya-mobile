import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SelectableChip } from '@/components/common/SelectableChip';
import { StateCard } from '@/components/common/StateCard';
import { SurfaceCard } from '@/components/common/SurfaceCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { AppInput } from '@/components/ui/AppInput';
import { trackedCampaignsById } from '@/mocks/tracking';
import { categories, brands } from '@/mocks/onboarding';
import { colors } from '@/theme/colors';
import { radius } from '@/theme/radius';
import { spacing } from '@/theme/spacing';
import { useCreateTrackingEventMutation } from '@/hooks/useTrackingMutations';

const selectedTrackingId = 'cmp-1';

const addEventSchema = z.object({
  dateLabel: z.string().min(3, 'Tarih alanı zorunludur.'),
  amount: z.string().min(1, 'Tutar alanı zorunludur.'),
  category: z.string().min(1, 'Bir kategori seç.'),
  merchant: z.string().min(1, 'Bir işyeri seç.'),
  note: z.string().optional(),
});

type AddEventFormValues = z.infer<typeof addEventSchema>;

export default function AddTrackingEventScreen() {
  const campaign = trackedCampaignsById[selectedTrackingId];
  const createTrackingEventMutation = useCreateTrackingEventMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddEventFormValues>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      dateLabel: '15 Nisan 2026',
      amount: '800',
      category: 'Akaryakıt',
      merchant: 'Opet',
      note: '',
    },
  });

  const amountValue = watch('amount');

  const validationMessage = useMemo(() => {
    if (!amountValue) return 'İşlem tutarını gir.';
    const numericAmount = Number(amountValue);
    if (Number.isNaN(numericAmount)) return 'Geçerli bir tutar gir.';
    if (numericAmount < 750) return 'Bu kampanya için en az 750 TL işlem gerekli.';
    return 'Bu işlem kampanya şartlarını karşılamaya uygun görünüyor.';
  }, [amountValue]);

  const isValidPreview = validationMessage.includes('uygun');

  return (
    <AppScreen>
      <AppHeader title="İşlem Ekle" subtitle="Kampanya ilerlemeni güncellemek için işlem bilgilerini gir." />

      <SurfaceCard>
        <AppHeader
          title={campaign.title}
          subtitle={`${campaign.bankName} • Mevcut ilerleme: ${campaign.progressCurrent}/${campaign.progressTarget}`}
          eyebrow="Kampanya Özeti"
        />
      </SurfaceCard>

      <View style={styles.formSection}>
        <AppInput
          label="Tarih"
          value={watch('dateLabel')}
          onChangeText={(value) => setValue('dateLabel', value, { shouldValidate: true })}
          helperText={errors.dateLabel?.message}
          placeholder="Örn: 15 Nisan 2026"
        />

        <AppInput
          label="Tutar"
          value={watch('amount')}
          onChangeText={(value) => setValue('amount', value, { shouldValidate: true })}
          helperText={errors.amount?.message}
          placeholder="Örn: 800"
          keyboardType="numeric"
        />

        <View style={styles.fieldGroup}>
          <AppHeader title="Kategori" eyebrow="İşlem Bilgisi" />
          <View style={styles.wrap}>
            {categories.map((category) => (
              <SelectableChip
                key={category}
                label={category}
                active={watch('category') === category}
                onPress={() => setValue('category', category, { shouldValidate: true })}
              />
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <AppHeader title="Marka / İşyeri" eyebrow="İşlem Bilgisi" />
          <View style={styles.wrap}>
            {brands.map((brand) => (
              <SelectableChip
                key={brand}
                label={brand}
                active={watch('merchant') === brand}
                onPress={() => setValue('merchant', brand, { shouldValidate: true })}
              />
            ))}
          </View>
        </View>

        <AppInput
          label="Not"
          value={watch('note')}
          onChangeText={(value) => setValue('note', value, { shouldValidate: true })}
          placeholder="Opsiyonel not"
          multiline
        />
      </View>

      <SurfaceCard>
        <AppHeader title="Ön Kontrol" eyebrow="Validasyon" />
        <View style={[styles.validationBanner, isValidPreview ? styles.validationSuccess : styles.validationWarning]}>
          <Text style={[styles.validationText, isValidPreview ? styles.validationTextSuccess : styles.validationTextWarning]}>
            {validationMessage}
          </Text>
        </View>
        <Text style={styles.helperText}>Bu kayıt sadece kampanya takibini kolaylaştırmak içindir. Gerçek ödül değerlendirmesi bankaya aittir.</Text>
      </SurfaceCard>

      {createTrackingEventMutation.isError ? (
        <StateCard title="İşlem kaydedilemedi" description="İşlem bilgileri şu an kaydedilemedi." tone="danger" />
      ) : null}
      {createTrackingEventMutation.isSuccess ? (
        <StateCard title="İşlem kaydedildi" description="İşlem kampanya takibine başarıyla eklendi." />
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton
          label={createTrackingEventMutation.isPending ? 'Kaydediliyor...' : 'İşlemi Kaydet'}
          onPress={handleSubmit((values) =>
            createTrackingEventMutation.mutate({
              trackingId: selectedTrackingId,
              ...values,
            })
          )}
        />
        <Pressable style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>Vazgeç</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  formSection: {
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.md,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  validationBanner: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
  },
  validationSuccess: {
    backgroundColor: '#EAF9EF',
  },
  validationWarning: {
    backgroundColor: '#FFF6E8',
  },
  validationText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  validationTextSuccess: {
    color: colors.success,
  },
  validationTextWarning: {
    color: colors.warning,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  actions: {
    gap: spacing.md,
  },
  secondaryAction: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: 16,
  },
});
