import type { CampaignDetail, CampaignPreview } from '@/types/campaign';

export const personalizedCampaigns: CampaignPreview[] = [
  {
    id: 'cmp-1',
    bankName: 'Akbank',
    title: 'Akaryakıt Harcamana 500 TL Nakit İade',
    shortDescription: '4 farklı günde 750 TL ve üzeri yakıt alışverişine özel.',
    rewardText: '500 TL',
    rewardType: 'cashback',
    category: 'Akaryakıt',
    deadlineText: 'Son 6 gün',
    isJoined: true,
    isProgressive: true,
    progressCurrent: 2,
    progressTarget: 4,
    tags: [
      { id: 'near-complete', label: 'Tamamlamaya Yakın', tone: 'warning' },
      { id: 'eligible', label: 'Kartına Uygun', tone: 'success' },
    ],
  },
  {
    id: 'cmp-2',
    bankName: 'Yapı Kredi',
    title: 'Online Alışverişte 200 TL Worldpuan',
    shortDescription: 'Seçili e-ticaret harcamalarında tek seferde ekstra puan.',
    rewardText: '200 TL',
    rewardType: 'puan',
    category: 'Online Alışveriş',
    deadlineText: 'Son 3 gün',
    tags: [
      { id: 'expiring', label: 'Son Günler', tone: 'warning' },
      { id: 'eligible', label: 'Kartına Uygun', tone: 'success' },
    ],
  },
  {
    id: 'cmp-3',
    bankName: 'Garanti BBVA',
    title: 'Market Harcamalarına 300 TL Bonus',
    shortDescription: 'Migros ve CarrefourSA alışverişlerinde anında avantaj.',
    rewardText: '300 TL',
    rewardType: 'cashback',
    category: 'Market',
    deadlineText: 'Yeni eklendi',
    tags: [{ id: 'new', label: 'Yeni', tone: 'info' }],
  },
];

export const featuredCampaignSummary = {
  totalEligibleCount: 18,
  monthlyPotentialText: '1.450 TL',
  title: 'Bu ay kartlarına uygun 18 fırsat var',
  description:
    'Tamamlamaya yakın kampanyaları ve son günü yaklaşan fırsatları öne çıkarıyoruz.',
};

export const campaignDetailsById: Record<string, CampaignDetail> = {
  'cmp-1': {
    ...personalizedCampaigns[0],
    validDateRange: '1 Nisan - 27 Nisan',
    terms: [
      'Her işlem en az 750 TL olmalıdır.',
      'İşlemler farklı günlerde yapılmalıdır.',
      'Sadece akaryakıt kategorisindeki alışverişler kampanyaya dahildir.',
    ],
    nextActionText: '2 farklı günde daha 750 TL ve üzeri yakıt alışverişi yap.',
  },
  'cmp-2': {
    ...personalizedCampaigns[1],
    validDateRange: '5 Nisan - 30 Nisan',
    terms: [
      'Seçili e-ticaret sitelerinde tek seferde yapılan harcamalar geçerlidir.',
      'Kampanya ödülü işlem sonrası puan olarak tanımlanır.',
    ],
  },
  'cmp-3': {
    ...personalizedCampaigns[2],
    validDateRange: '10 Nisan - 28 Nisan',
    terms: [
      'Market alışverişleri kampanya kapsamındadır.',
      'Belirli mağaza ve marka koşulları detay sayfasında gösterilir.',
    ],
  },
};
