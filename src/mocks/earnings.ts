import type { EarningsDashboard } from '@/types/earnings';

export const earningsDashboard: EarningsDashboard = {
  summary: {
    monthLabel: 'Nisan 2026',
    totalEarnedText: '1.340 TL',
    pendingRewardText: '460 TL',
    potentialRewardText: '1.020 TL',
  },
  stats: [
    { id: 'completed', label: 'Tamamlanan Kampanya', valueText: '5', tone: 'success' },
    { id: 'active-tracking', label: 'Aktif Takip', valueText: '3', tone: 'info' },
    { id: 'expiring', label: 'Son 7 Gün Fırsat', valueText: '2', tone: 'warning' },
    { id: 'inactive-cards', label: 'Pasif Kart', valueText: '1', tone: 'default' },
  ],
  history: [
    {
      id: 'history-1',
      title: 'Akaryakıt Harcamana 500 TL Nakit İade',
      bankName: 'Akbank',
      rewardText: '500 TL',
      status: 'completed',
      dateLabel: '12 Nisan 2026',
    },
    {
      id: 'history-2',
      title: 'Online Alışverişte 200 TL Worldpuan',
      bankName: 'Yapı Kredi',
      rewardText: '200 TL',
      status: 'pending',
      dateLabel: '9 Nisan 2026',
    },
    {
      id: 'history-3',
      title: 'Market Harcamalarına 300 TL Bonus',
      bankName: 'Garanti BBVA',
      rewardText: '300 TL',
      status: 'completed',
      dateLabel: '6 Nisan 2026',
    },
    {
      id: 'history-4',
      title: 'Yemek Harcamalarına 340 TL MaxiPuan',
      bankName: 'İş Bankası',
      rewardText: '340 TL',
      status: 'completed',
      dateLabel: '2 Nisan 2026',
    },
  ],
  potential: [
    {
      id: 'potential-1',
      title: 'Market Harcamalarına 300 TL Bonus',
      bankName: 'Garanti BBVA',
      potentialText: '300 TL',
      remainingActionText: '1 alışveriş daha yapman yeterli.',
    },
    {
      id: 'potential-2',
      title: 'Akaryakıt Harcamana 500 TL Nakit İade',
      bankName: 'Akbank',
      potentialText: '500 TL',
      remainingActionText: '2 farklı günde işlem eklemelisin.',
    },
    {
      id: 'potential-3',
      title: 'Seyahat Harcamalarına 220 TL Mil Puan',
      bankName: 'QNB Finansbank',
      potentialText: '220 TL',
      remainingActionText: 'Tek seferde 2.500 TL üzeri rezervasyon yapmalısın.',
    },
  ],
  alerts: [
    {
      id: 'alert-1',
      title: 'Son 3 gün içinde bitecek fırsatlar var',
      description: 'Özellikle online alışveriş kampanyasında ödülü kaçırmamak için son bir işlem daha yapabilirsin.',
      tone: 'warning',
    },
    {
      id: 'alert-2',
      title: 'Pasif kart nedeniyle fırsat kaçıyor olabilir',
      description: 'Pasif kartını aktif hale getirerek market ve seyahat kampanyalarında ek eşleşmeler alabilirsin.',
      tone: 'info',
    },
    {
      id: 'alert-3',
      title: 'Bekleyen ödüller henüz karta yansımadı',
      description: 'Bankaların yükleme süreleri farklı olabilir; 3 iş günü içinde kontrol etmende fayda var.',
      tone: 'warning',
    },
  ],
};
