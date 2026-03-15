import { useQuery } from '@tanstack/react-query';
import { walletCards } from '@/mocks/wallet';

export async function getWalletCards() {
  return Promise.resolve(walletCards);
}

export function useWalletCards() {
  return useQuery({
    queryKey: ['wallet', 'cards'],
    queryFn: getWalletCards,
  });
}
