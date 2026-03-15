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
  {
    id: 'cmp-4',
    bankName: 'İş Bankası',
    title: 'Restoran Harcamalarında 250 TL MaxiPuan',
    shortDescription: 'Hafta sonu restoran ve kafe harcamalarında ek puan fırsatı.',
    rewardText: '250 TL',
    rewardType: 'puan',
    category: 'Yeme İçme',
    deadlineText: 'Son 5 gün',
    tags: [
      { id: 'lifestyle', label: 'Hafta Sonu', tone: 'info' },
      { id: 'eligible', label: 'Kartına Uygun', tone: 'success' },
    ],
  },
  {
    id: 'cmp-5',
    bankName: 'QNB Finansbank',
    title: 'Teknoloji Alışverişine 400 TL İndirim',
    shortDescription: 'Seçili elektronik mağazalarında peşin veya taksitli işlemlerde geçerli.',
    rewardText: '400 TL',
    rewardType: 'cashback',
    category: 'Teknoloji',
    deadlineText: 'Son 8 gün',
    tags: [
      { id: 'high-value', label: 'Yüksek Kazanç', tone: 'success' },
      { id: 'new', label: 'Yeni', tone: 'info' },
    ],
  },
  {
    id: 'cmp-6',
    bankName: 'Garanti BBVA',
    title: 'Uçak Bileti Alımına 1.500 Mil',
    shortDescription: 'Yurt içi ve yurt dışı uçuş rezervasyonlarında ekstra mil kazan.',
    rewardText: '1.500 Mil',
    rewardType: 'mil',
    category: 'Seyahat',
    deadlineText: 'Son 4 gün',
    tags: [
      { id: 'travel', label: 'Seyahat', tone: 'info' },
      { id: 'expiring', label: 'Son Günler', tone: 'warning' },
    ],
  },
  {
    id: 'cmp-7',
    bankName: 'Akbank',
    title: 'Market Zincirlerinde 3 Adımda 600 TL İade',
    shortDescription: '3 farklı hafta market alışverişi yaparak toplam nakit iade kazan.',
    rewardText: '600 TL',
    rewardType: 'cashback',
    category: 'Market',
    deadlineText: 'Son 9 gün',
    isJoined: true,
    isProgressive: true,
    progressCurrent: 1,
    progressTarget: 3,
    tags: [
      { id: 'joined', label: 'Takipte', tone: 'info' },
      { id: 'family', label: 'Aile Harcaması', tone: 'neutral' },
    ],
  },
  {
    id: 'cmp-8',
    bankName: 'Yapı Kredi',
    title: 'Giyim Harcamalarında 350 TL İade',
    shortDescription: 'Seçili moda markalarında tek seferde veya parçalı alışverişlerde geçerli.',
    rewardText: '350 TL',
    rewardType: 'cashback',
    category: 'Moda',
    deadlineText: 'Yeni eklendi',
    tags: [
      { id: 'seasonal', label: 'Sezon Fırsatı', tone: 'warning' },
      { id: 'eligible', label: 'Kartına Uygun', tone: 'success' },
    ],
  },
  {
    id: 'cmp-9',
    bankName: 'Enpara',
    title: 'Dijital Aboneliklerde %20 İade',
    shortDescription: 'Film, müzik ve üretkenlik aboneliklerinde aylık üst limite kadar geri ödeme.',
    rewardText: '%20',
    rewardType: 'cashback',
    category: 'Dijital Yaşam',
    deadlineText: 'Devam ediyor',
    tags: [
      { id: 'recurring', label: 'Abonelik', tone: 'neutral' },
      { id: 'smart-save', label: 'Akıllı Tasarruf', tone: 'info' },
    ],
  },
  {
    id: 'cmp-10',
    bankName: 'İş Bankası',
    title: 'Kitap ve Eğitim Harcamalarına 150 TL Puan',
    shortDescription: 'Online eğitim, kitap ve kırtasiye alışverişlerinde ekstra avantaj.',
    rewardText: '150 TL',
    rewardType: 'puan',
    category: 'Eğitim',
    deadlineText: 'Son 7 gün',
    tags: [
      { id: 'education', label: 'Eğitim', tone: 'info' },
      { id: 'eligible', label: 'Kartına Uygun', tone: 'success' },
    ],
  },
];

export const featuredCampaignSummary = {
  totalEligibleCount: 18,
  monthlyPotentialText: '3.240 TL',
  title: 'Bu ay kartlarına uygun 18 fırsat var',
  description:
    'Tamamlamaya yakın kampanyaları, son günü yaklaşan fırsatları ve yeni eklenen yüksek potansiyelli teklifleri senin için öne çıkarıyoruz.',
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
  'cmp-4': {
    ...personalizedCampaigns[3],
    validDateRange: '12 Nisan - 29 Nisan',
    terms: [
      'Restoran ve kafe harcamaları kampanya kapsamındadır.',
      'Hafta sonu yapılan işlemler geçerlidir.',
      'Puan yüklemesi kampanya bitiminden sonra yapılır.',
    ],
  },
  'cmp-5': {
    ...personalizedCampaigns[4],
    validDateRange: '8 Nisan - 5 Mayıs',
    terms: [
      'Seçili teknoloji mağazalarında yapılan işlemler geçerlidir.',
      'İşlem başına minimum harcama tutarı banka koşullarına göre değişebilir.',
    ],
  },
  'cmp-6': {
    ...personalizedCampaigns[5],
    validDateRange: '15 Nisan - 30 Nisan',
    terms: [
      'Uçak bileti ve seyahat rezervasyonları kampanyaya dahildir.',
      'Mil yüklemeleri kampanya sonrası tanımlanır.',
    ],
  },
  'cmp-7': {
    ...personalizedCampaigns[6],
    validDateRange: '1 Nisan - 10 Mayıs',
    terms: [
      '3 farklı hafta alışveriş yapılmalıdır.',
      'Her işlem kampanya alt limitini sağlamalıdır.',
      'Sadece seçili market zincirleri geçerlidir.',
    ],
    nextActionText: '2 farklı hafta daha market alışverişi yaparak 600 TL iade kazan.',
  },
  'cmp-8': {
    ...personalizedCampaigns[7],
    validDateRange: '20 Nisan - 12 Mayıs',
    terms: [
      'Seçili giyim ve moda markalarında geçerlidir.',
      'Aynı gün içinde yapılan işlemler birleştirilebilir.',
    ],
  },
  'cmp-9': {
    ...personalizedCampaigns[8],
    validDateRange: 'Sürekli kampanya',
    terms: [
      'Aylık abonelik ödemeleri kampanya kapsamında değerlendirilir.',
      'İade oranı banka limitleri dahilinde uygulanır.',
    ],
  },
  'cmp-10': {
    ...personalizedCampaigns[9],
    validDateRange: '9 Nisan - 1 Mayıs',
    terms: [
      'Kitap, eğitim ve kırtasiye kategorileri geçerlidir.',
      'Ödül puanı kampanya sonunda tanımlanır.',
    ],
  },
};
