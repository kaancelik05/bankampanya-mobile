import type { SuccessState } from '@/types/success';

export const successState: SuccessState = {
  id: 'success-1',
  title: 'Kampanya başarıyla tamamlandı',
  subtitle: 'Akaryakıt kampanyasındaki tüm adımları tamamladın.',
  rewardText: '500 TL',
  status: 'reward_pending',
  summaryItems: [
    { id: 'sum-1', label: 'Tamamlanan Adım', value: '4 / 4' },
    { id: 'sum-2', label: 'Beklenen Ödül', value: '500 TL' },
    { id: 'sum-3', label: 'Durum', value: 'Ödül bekleniyor' },
  ],
  primaryActionLabel: 'Takibe Dön',
  secondaryActionLabel: 'Yeni Fırsatları Keşfet',
};
