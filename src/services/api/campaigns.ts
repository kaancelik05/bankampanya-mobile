import { campaignDetailsById, featuredCampaignSummary, personalizedCampaigns } from '@/mocks/campaigns';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { CampaignDetail, CampaignPreview } from '@/types/campaign';

async function getPersonalizedCampaignsMock(): Promise<CampaignPreview[]> {
  return Promise.resolve(personalizedCampaigns);
}

async function getFeaturedCampaignSummaryMock() {
  return Promise.resolve(featuredCampaignSummary);
}

async function getCampaignDetailByIdMock(id: string): Promise<CampaignDetail | undefined> {
  return Promise.resolve(campaignDetailsById[id]);
}

export async function getPersonalizedCampaigns(): Promise<CampaignPreview[]> {
  if (isMockMode()) {
    return getPersonalizedCampaignsMock();
  }

  return apiRequest<CampaignPreview[]>('/campaigns/personalized');
}

export async function getFeaturedCampaignSummary() {
  if (isMockMode()) {
    return getFeaturedCampaignSummaryMock();
  }

  return apiRequest<typeof featuredCampaignSummary>('/campaigns/featured-summary');
}

export async function getCampaignDetailById(id: string): Promise<CampaignDetail | undefined> {
  if (isMockMode()) {
    return getCampaignDetailByIdMock(id);
  }

  return apiRequest<CampaignDetail>(`/campaigns/${id}`);
}
