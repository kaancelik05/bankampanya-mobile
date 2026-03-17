import { trackedCampaigns, trackedCampaignsById } from '@/mocks/tracking';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { TrackedCampaign, TrackingStatus } from '@/types/tracking';

function mapTrackingStatus(status: string | number): TrackingStatus {
  if (typeof status === 'number') {
    switch (status) {
      case 3:
        return 'completed';
      case 2:
        return 'near_complete';
      default:
        return 'active';
    }
  }

  switch (status.toLowerCase()) {
    case 'completed':
      return 'completed';
    case 'nearcomplete':
    case 'near_complete':
    case 'near-complete':
      return 'near_complete';
    default:
      return 'active';
  }
}

function mapTrackedCampaign(input: {
  id: string;
  title: string;
  bankName: string;
  progressCurrent: number;
  progressTarget: number;
  deadlineText: string;
  rewardText: string;
  shortDescription: string;
  nextActionText?: string;
  status: string | number;
  requirements: string[];
  events: Array<{
    id: string;
    dateLabel: string;
    amountText: string;
    merchantName: string;
    qualified: boolean;
  }>;
}): TrackedCampaign {
  return {
    id: input.id,
    title: input.title,
    bankName: input.bankName,
    progressCurrent: input.progressCurrent,
    progressTarget: input.progressTarget,
    deadlineText: input.deadlineText,
    rewardText: input.rewardText,
    shortDescription: input.shortDescription,
    nextActionText: input.nextActionText ?? '',
    status: mapTrackingStatus(input.status),
    requirements: input.requirements,
    events: input.events,
  };
}

async function getTrackedCampaignsMock(): Promise<TrackedCampaign[]> {
  return Promise.resolve(trackedCampaigns);
}

async function getTrackedCampaignByIdMock(id: string): Promise<TrackedCampaign | undefined> {
  return Promise.resolve(trackedCampaignsById[id]);
}

export async function getTrackedCampaigns(): Promise<TrackedCampaign[]> {
  if (isMockMode()) {
    return getTrackedCampaignsMock();
  }

  const response = await apiRequest<Array<Parameters<typeof mapTrackedCampaign>[0]>>('/api/mobile/tracking');
  return response.map(mapTrackedCampaign);
}

export async function getTrackedCampaignById(id: string): Promise<TrackedCampaign | undefined> {
  if (isMockMode()) {
    return getTrackedCampaignByIdMock(id);
  }

  const response = await apiRequest<Parameters<typeof mapTrackedCampaign>[0]>(`/api/mobile/tracking/${id}`);
  return mapTrackedCampaign(response);
}
