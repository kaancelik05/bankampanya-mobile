import { trackedCampaigns, trackedCampaignsById } from '@/mocks/tracking';
import type { TrackedCampaign } from '@/types/tracking';

export async function getTrackedCampaigns(): Promise<TrackedCampaign[]> {
  return Promise.resolve(trackedCampaigns);
}

export async function getTrackedCampaignById(id: string): Promise<TrackedCampaign | undefined> {
  return Promise.resolve(trackedCampaignsById[id]);
}
