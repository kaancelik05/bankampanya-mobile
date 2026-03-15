import type { AssistantPromptSuggestion, AssistantResponse } from '@/types/assistant';

export const assistantPromptSuggestions: AssistantPromptSuggestion[] = [
  { id: 'p-1', text: 'Akaryakıtta en çok hangi kartımla kazanırım?' },
  { id: 'p-2', text: 'Market için en iyi kampanya hangisi?' },
  { id: 'p-3', text: '50.000 TL için uygun fırsat var mı?' },
  { id: 'p-4', text: 'Bu kampanyayı nasıl tamamlarım?' },
];

export const assistantResponses: AssistantResponse[] = [
  {
    id: 'r-1',
    prompt: 'Akaryakıtta en çok hangi kartımla kazanırım?',
    summary: 'Şu an en güçlü seçenek Akbank akaryakıt cashback kampanyası görünüyor.',
    insight: 'Bu kampanyada 4 farklı günde 750 TL ve üzeri işlem yaparsan toplam 500 TL nakit iade alabilirsin. Şu an 2/4 ilerlemedesin.',
    recommendations: [
      {
        id: 'rec-1',
        title: 'Akaryakıt Harcamana 500 TL Nakit İade',
        subtitle: '2 işlem daha yaparsan kampanyayı tamamlayabilirsin.',
        primaryActionLabel: 'Takibi Gör',
        secondaryActionLabel: 'İşlem Ekle',
        targetType: 'tracking',
        targetId: 'cmp-1',
      },
      {
        id: 'rec-2',
        title: 'Ek akaryakıt fırsatlarını keşfet',
        subtitle: 'Kartlarına uygun alternatif kampanyalar da mevcut.',
        primaryActionLabel: 'Keşfet',
        targetType: 'campaign',
        targetId: 'cmp-3',
      },
    ],
  },
];
