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

export async function getWalletCards(): Promise<WalletCard[]> {
  if (isMockMode()) {
    return Promise.resolve(walletCards);
  }

  const response = await apiRequest<{ cards: WalletCard[] }>('/api/mobile/wallet');
  return response.cards;
}

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

  const card = await apiRequest<WalletCard>('/api/mobile/wallet/cards', {
    method: 'POST',
    body: input,
  });

  return {
    success: true,
    card,
  };
}

export async function toggleWalletCardStatus(input: ToggleWalletCardStatusRequest): Promise<ToggleWalletCardStatusResponse> {
  if (isMockMode()) {
    return toggleWalletCardStatusMock(input);
  }

  const existingCards = await getWalletCards();
  const existingCard = existingCards.find((card) => card.id === input.id);

  if (!existingCard) {
    throw new Error('Kart bulunamadı.');
  }

  const card = await apiRequest<WalletCard>(`/api/mobile/wallet/cards/${input.id}/status`, {
    method: 'PATCH',
    body: { isActive: !existingCard.isActive },
  });

  return {
    success: true,
    card,
    message: card.isActive ? 'Kart aktif hale getirildi.' : 'Kart pasif hale getirildi.',
  };
}

export async function deleteWalletCard(input: DeleteWalletCardRequest): Promise<DeleteWalletCardResponse> {
  if (isMockMode()) {
    return deleteWalletCardMock(input);
  }

  await apiRequest<void>(`/api/mobile/wallet/cards/${input.id}`, {
    method: 'DELETE',
  });

  return {
    success: true,
    id: input.id,
    message: 'Kart silindi.',
  };
}
