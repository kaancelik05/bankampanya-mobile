import { walletCards } from '@/mocks/wallet';
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

export type ToggleWalletCardStatusRequest = {
  id: string;
};

export type ToggleWalletCardStatusResponse = {
  success: boolean;
  card: WalletCard;
  message?: string;
};

export type DeleteWalletCardRequest = {
  id: string;
};

export type DeleteWalletCardResponse = {
  success: boolean;
  id: string;
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

async function toggleWalletCardStatusMock({ id }: ToggleWalletCardStatusRequest): Promise<ToggleWalletCardStatusResponse> {
  const card = walletCards.find((item) => item.id === id);

  if (!card) {
    throw new Error('Kart bulunamadı.');
  }

  card.isActive = !card.isActive;

  return Promise.resolve({
    success: true,
    card,
    message: card.isActive ? 'Kart aktif hale getirildi.' : 'Kart pasif hale getirildi.',
  });
}

async function deleteWalletCardMock({ id }: DeleteWalletCardRequest): Promise<DeleteWalletCardResponse> {
  const cardIndex = walletCards.findIndex((item) => item.id === id);

  if (cardIndex === -1) {
    throw new Error('Kart bulunamadı.');
  }

  const card = walletCards[cardIndex];

  if (card.isActive) {
    throw new Error('Aktif kart silinemez. Önce pasif yapmalısın.');
  }

  walletCards.splice(cardIndex, 1);

  return Promise.resolve({
    success: true,
    id,
    message: 'Kart silindi.',
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

export async function toggleWalletCardStatus(input: ToggleWalletCardStatusRequest): Promise<ToggleWalletCardStatusResponse> {
  if (isMockMode()) {
    return toggleWalletCardStatusMock(input);
  }

  return apiRequest<ToggleWalletCardStatusResponse>(`/wallet/cards/${input.id}/toggle-status`, {
    method: 'PATCH',
  });
}

export async function deleteWalletCard(input: DeleteWalletCardRequest): Promise<DeleteWalletCardResponse> {
  if (isMockMode()) {
    return deleteWalletCardMock(input);
  }

  return apiRequest<DeleteWalletCardResponse>(`/wallet/cards/${input.id}`, {
    method: 'DELETE',
  });
}
