import { useQuery } from '@tanstack/react-query';
import { getCreditOfferById, getCreditOffers } from '@/services/api/credit';

export function useCreditOffers() {
  return useQuery({
    queryKey: ['credit', 'offers'],
    queryFn: getCreditOffers,
  });
}

export function useCreditOfferDetail(id?: string) {
  return useQuery({
    queryKey: ['credit', 'detail', id],
    queryFn: () => getCreditOfferById(id || ''),
    enabled: !!id,
  });
}
