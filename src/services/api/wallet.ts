import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { WalletCard } from '@/types/profile';

export type CreateWalletCardRequest = {
  bankName: string;
  cardType: string;
  customName: string;
};

export type CreateWalletCardResponse = {
  success: boolean;
  card: WalletCard;
  message?: string;
};

async function createWalletCardMock(input: CreateWalletCardRequest): Promise<CreateWalletCardResponse> {
  return Promise.resolve({
    success: true,
    card: {
      id: 'wallet-new',
      ...input,
      isActive: true,
    },
  });
}

export async function createWalletCard(input: CreateWalletCardRequest): Promise<CreateWalletCardResponse> {
  if (isMockMode()) {
    return createWalletCardMock(input);
  }

  return apiRequest<CreateWalletCardResponse>('/wallet/cards', {
    method: 'POST',
    body: input,
  });
}
