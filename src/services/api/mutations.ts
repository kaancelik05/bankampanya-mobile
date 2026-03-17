import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';

export async function createTrackingEvent(input: {
  trackingId: string;
  dateLabel: string;
  amount: string;
  category: string;
  merchant: string;
  note?: string;
}) {
  if (isMockMode()) {
    return Promise.resolve({
      success: true,
      event: {
        id: 'tracking-event-new',
        ...input,
        qualified: true,
      },
    });
  }

  const result = await apiRequest<{
    eventId: string;
    userCampaignId: string;
    progressCurrent: number;
    progressTarget: number;
    qualified: boolean;
    status: string;
  }>(`/api/mobile/tracking/${input.trackingId}/events`, {
    method: 'POST',
    body: {
      merchantName: input.merchant,
      amount: Number(input.amount),
      amountText: `${input.amount} TL`,
      note: input.note,
    },
  });

  return {
    success: true,
    event: {
      id: result.eventId,
      trackingId: input.trackingId,
      dateLabel: input.dateLabel,
      amount: input.amount,
      category: input.category,
      merchant: input.merchant,
      note: input.note,
      qualified: result.qualified,
      progressCurrent: result.progressCurrent,
      progressTarget: result.progressTarget,
      status: result.status,
    },
  };
}
