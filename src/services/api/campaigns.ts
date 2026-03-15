import { campaignDetailsById, featuredCampaignSummary, personalizedCampaigns } from '@/mocks/campaigns';
import type { CampaignDetail, CampaignPreview } from '@/types/campaign';

export async function getPersonalizedCampaigns(): Promise<CampaignPreview[]> {
  return Promise.resolve(personalizedCampaigns);
}

export async function getFeaturedCampaignSummary() {
  return Promise.resolve(featuredCampaignSummary);
}

export async function getCampaignDetailById(id: string): Promise<CampaignDetail | undefined> {
  return Promise.resolve(campaignDetailsById[id]);
}
