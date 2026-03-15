import type { EarningsDashboard } from '@/types/earnings';

export const earningsDashboard: EarningsDashboard = {
  summary: {
    monthLabel: 'Nisan 2026',
    totalEarnedText: '1.250 TL',
    pendingRewardText: '420 TL',
    potentialRewardText: '780 TL',
  },
  stats: [
    { id: 'completed', label: 'Tamamlanan Kampanya', valueText: '4', tone: 'success' },
    { id: 'active-tracking', label: 'Aktif Takip', valueText: '2', tone: 'info' },
    { id: 'expiring', label: 'Son Gün Fırsat', valueText: '3', tone: 'warning' },
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
  ],
  alerts: [
    {
      id: 'alert-1',
      title: 'Son 3 gün içinde bitecek fırsatlar var',
      description: 'Özellikle online alışveriş ve akaryakıt kampanyalarında son günlere giriyorsun.',
      tone: 'warning',
    },
    {
      id: 'alert-2',
      title: 'Pasif kart nedeniyle fırsat kaçıyor olabilir',
      description: 'Pasif kartlarını aktif hale getirerek daha fazla kampanya eşleşmesi görebilirsin.',
      tone: 'info',
    },
  ],
};
