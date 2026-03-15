import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWalletCard, deleteWalletCard, toggleWalletCardStatus } from '@/services/api/wallet';

export function useCreateWalletCardMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWalletCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'cards'] });
    },
  });
}

export function useToggleWalletCardStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWalletCardStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'cards'] });
    },
  });
}

export function useDeleteWalletCardMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWalletCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'cards'] });
    },
  });
}
