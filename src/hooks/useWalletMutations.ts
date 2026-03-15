import { useMutation } from '@tanstack/react-query';
import { createWalletCard } from '@/services/api/wallet';

export function useCreateWalletCardMutation() {
  return useMutation({
    mutationFn: createWalletCard,
  });
}
