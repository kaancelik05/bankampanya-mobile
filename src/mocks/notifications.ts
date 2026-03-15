import type { NotificationItem } from '@/types/notification';

export const notifications: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'tracking',
    title: 'Akaryakıt kampanyanı tamamlamaya yaklaştın',
    body: 'Kampanyayı bitirmek için 2 işlem daha yapman gerekiyor.',
    timeLabel: 'Az önce',
    ctaLabel: 'Takibi Gör',
    route: '/tracking/cmp-1',
    tone: 'warning',
  },
  {
    id: 'n-2',
    type: 'campaign',
    title: 'Kartına uygun yeni market kampanyası bulundu',
    body: 'Migros harcamalarında ekstra puan kazanabileceğin yeni fırsat yayında.',
    timeLabel: '2 saat önce',
    ctaLabel: 'İncele',
    route: '/campaigns/cmp-3',
    tone: 'success',
  },
  {
    id: 'n-3',
    type: 'credit',
    title: '50.000 TL için yeni teklif güncellendi',
    body: 'İhtiyaç kredisi oranlarında daha avantajlı bir teklif görüntülendi.',
    timeLabel: 'Bugün',
    ctaLabel: 'Detayı Gör',
    route: '/credit/cr-1',
    tone: 'info',
  },
];
