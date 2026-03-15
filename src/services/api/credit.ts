import { creditOffers, creditOffersById } from '@/mocks/credit';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { CreditOffer } from '@/types/credit';

async function getCreditOffersMock(): Promise<CreditOffer[]> {
  return Promise.resolve(creditOffers);
}

async function getCreditOfferByIdMock(id: string): Promise<CreditOffer | undefined> {
  return Promise.resolve(creditOffersById[id]);
}

export async function getCreditOffers(): Promise<CreditOffer[]> {
  if (isMockMode()) {
    return getCreditOffersMock();
  }

  return apiRequest<CreditOffer[]>('/credit-offers');
}

export async function getCreditOfferById(id: string): Promise<CreditOffer | undefined> {
  if (isMockMode()) {
    return getCreditOfferByIdMock(id);
  }

  return apiRequest<CreditOffer>(`/credit-offers/${id}`);
}
