import { trackedCampaigns, trackedCampaignsById } from '@/mocks/tracking';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { TrackedCampaign } from '@/types/tracking';

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

  return apiRequest<TrackedCampaign[]>('/tracked-campaigns');
}

export async function getTrackedCampaignById(id: string): Promise<TrackedCampaign | undefined> {
  if (isMockMode()) {
    return getTrackedCampaignByIdMock(id);
  }

  return apiRequest<TrackedCampaign>(`/tracked-campaigns/${id}`);
}
