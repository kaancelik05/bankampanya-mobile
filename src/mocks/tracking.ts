import type { TrackedCampaign } from '@/types/tracking';

export const trackedCampaigns: TrackedCampaign[] = [
  {
    id: 'cmp-1',
    title: 'Akaryakıt Harcamana 500 TL Nakit İade',
    bankName: 'Akbank',
    progressCurrent: 2,
    progressTarget: 4,
    deadlineText: 'Son 6 gün',
    rewardText: '500 TL',
    shortDescription: '4 farklı günde 750 TL ve üzeri yakıt alışverişine özel aşamalı kampanya.',
    nextActionText: '2 farklı günde daha 750 TL ve üzeri akaryakıt harcaması yap.',
    status: 'near_complete',
    requirements: [
      'Her işlem en az 750 TL olmalı',
      'İşlemler farklı günlerde yapılmalı',
      'Kategori akaryakıt olmalı',
    ],
    events: [
      { id: 'ev-1', dateLabel: '3 Nisan', amountText: '820 TL', merchantName: 'Opet', qualified: true },
      { id: 'ev-2', dateLabel: '12 Nisan', amountText: '760 TL', merchantName: 'Shell', qualified: true },
    ],
  },
  {
    id: 'trk-2',
    title: 'Market Harcamana 300 TL Puan',
    bankName: 'Garanti BBVA',
    progressCurrent: 1,
    progressTarget: 2,
    deadlineText: 'Son 3 gün',
    rewardText: '300 TL',
    shortDescription: 'Seçili marketlerde iki alışverişe özel bonus kampanyası.',
    nextActionText: 'Bir alışveriş daha yaparak kampanyayı tamamlayabilirsin.',
    status: 'active',
    requirements: ['Seçili market harcamaları geçerlidir', 'İki alışveriş gereklidir'],
    events: [{ id: 'ev-3', dateLabel: '14 Nisan', amountText: '1.150 TL', merchantName: 'Migros', qualified: true }],
  },
  {
    id: 'trk-3',
    title: 'Online alışverişe 200 TL iade',
    bankName: 'Yapı Kredi',
    progressCurrent: 2,
    progressTarget: 2,
    deadlineText: 'Tamamlandı',
    rewardText: '200 TL',
    shortDescription: 'Seçili e-ticaret alışverişlerini tamamlayarak ödül kazandın.',
    nextActionText: 'Ödülün yansımasını bekleyebilirsin.',
    status: 'completed',
    requirements: ['İki online alışveriş yapılmalı'],
    events: [
      { id: 'ev-4', dateLabel: '2 Nisan', amountText: '900 TL', merchantName: 'Trendyol', qualified: true },
      { id: 'ev-5', dateLabel: '5 Nisan', amountText: '1.200 TL', merchantName: 'Hepsiburada', qualified: true },
    ],
  },
];

export const trackedCampaignsById = Object.fromEntries(trackedCampaigns.map((item) => [item.id, item]));
