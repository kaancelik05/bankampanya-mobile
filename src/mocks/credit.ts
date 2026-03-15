import type { CreditOffer } from '@/types/credit';

export const creditOffers: CreditOffer[] = [
  {
    id: 'cr-1',
    title: 'İhtiyaç Kredisi',
    bankName: 'QNB',
    rate: '%3,19',
    amountRange: '50.000 TL - 250.000 TL',
    type: 'Kredi',
    subtype: 'İhtiyaç',
    detailSummary: 'Acil nakit ihtiyacına yönelik ihtiyaç kredisi teklifi.',
    terms: ['Vade ve tahsis ücreti koşulları başvuru anında netleşir.', 'Faiz oranı kullanıcı profiline göre değişebilir.'],
  },
  {
    id: 'cr-2',
    title: 'Taksitli Nakit Avans',
    bankName: 'İş Bankası',
    rate: '%2,99',
    amountRange: '10.000 TL - 100.000 TL',
    type: 'Taksitli Nakit Avans',
    detailSummary: 'Kart limitine bağlı hızlı kullanım imkanı sunan taksitli nakit avans.',
    terms: ['Kart limitin ve banka değerlendirmesi sonucu etkiler.', 'Vade seçenekleri kampanyaya göre değişebilir.'],
  },
  {
    id: 'cr-3',
    title: 'Nakit Avans',
    bankName: 'Akbank',
    rate: '%3,49',
    amountRange: '5.000 TL - 75.000 TL',
    type: 'Nakit Avans',
    detailSummary: 'Kısa vadeli ihtiyaçlar için hızlı nakit avans çözümü.',
    terms: ['Faiz ve ücret bilgisi kart tipine göre değişebilir.', 'Güncel kampanya tarihleri detay sayfasında gösterilir.'],
  },
  {
    id: 'cr-4',
    title: 'Konut Kredisi',
    bankName: 'Garanti BBVA',
    rate: '%2,79',
    amountRange: '250.000 TL - 5.000.000 TL',
    type: 'Kredi',
    subtype: 'Konut',
    detailSummary: 'Uzun vadeli konut finansmanı için özel oranlı teklif.',
    terms: ['Ekspertiz ve sigorta gibi ek maliyetler olabilir.', 'Başvuru sonrası detaylı değerlendirme yapılır.'],
  },
];

export const creditOffersById = Object.fromEntries(creditOffers.map((item) => [item.id, item]));
