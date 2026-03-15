import { creditOffers, creditOffersById } from '@/mocks/credit';
import type { CreditOffer } from '@/types/credit';

export async function getCreditOffers(): Promise<CreditOffer[]> {
  return Promise.resolve(creditOffers);
}

export async function getCreditOfferById(id: string): Promise<CreditOffer | undefined> {
  return Promise.resolve(creditOffersById[id]);
}
