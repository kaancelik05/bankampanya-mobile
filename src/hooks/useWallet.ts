import { useQuery } from '@tanstack/react-query';
import { getWalletCards } from '@/services/api/wallet';

export function useWalletCards() {
  return useQuery({
    queryKey: ['wallet', 'cards'],
    queryFn: getWalletCards,
    retry: false,
  });
}
