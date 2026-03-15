import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/common/AppHeader';
import { AppScreen } from '@/components/common/AppScreen';
import { SelectableChip } from '@/components/common/SelectableChip';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { AppInput } from '@/components/ui/AppInput';
import { banks, cardTypes } from '@/mocks/onboarding';
import { spacing } from '@/theme/spacing';
import { useCreateWalletCardMutation } from '@/hooks/useWalletMutations';

const addCardSchema = z.object({
  bankName: z.string().min(1, 'Bir banka seç.'),
  cardType: z.string().min(1, 'Bir kart türü seç.'),
  customName: z.string().min(2, 'Kart adı en az 2 karakter olmalı.'),
});

type AddCardFormValues = z.infer<typeof addCardSchema>;

export default function AddCardScreen() {
  const createWalletCardMutation = useCreateWalletCardMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddCardFormValues>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      bankName: '',
      cardType: '',
      customName: '',
    },
  });

  return (
    <AppScreen>
      <AppHeader title="Kart Ekle" subtitle="Sana uygun kampanyaları gösterebilmemiz için kullandığın kartı ekle." />

      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {banks.map((bank) => (
            <SelectableChip key={bank} label={bank} active={watch('bankName') === bank} onPress={() => setValue('bankName', bank, { shouldValidate: true })} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.wrap}>
        {cardTypes.map((type) => (
          <SelectableChip key={type} label={type} active={watch('cardType') === type} onPress={() => setValue('cardType', type, { shouldValidate: true })} />
        ))}
      </View>

      <AppInput
        label="Kart Adı"
        value={watch('customName')}
        onChangeText={(value) => setValue('customName', value, { shouldValidate: true })}
        helperText={errors.customName?.message || errors.bankName?.message || errors.cardType?.message}
        placeholder="Örn: Axess, World, Bonus"
      />

      <PrimaryButton label={createWalletCardMutation.isPending ? 'Kaydediliyor...' : 'Kartı Kaydet'} onPress={handleSubmit((values) => createWalletCardMutation.mutate(values))} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  row: {
    gap: spacing.sm,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
