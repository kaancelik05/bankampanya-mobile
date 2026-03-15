export type CreditOffer = {
  id: string;
  title: string;
  bankName: string;
  rate: string;
  amountRange: string;
  type: 'Kredi' | 'Nakit Avans' | 'Taksitli Nakit Avans';
  subtype?: 'İhtiyaç' | 'Konut' | 'Taşıt';
  detailSummary: string;
  terms: string[];
};
