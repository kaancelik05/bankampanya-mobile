import { campaignDetailsById, featuredCampaignSummary, personalizedCampaigns } from '@/mocks/campaigns';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { CampaignDetail, CampaignPreview, CampaignTag, RewardType } from '@/types/campaign';

function mapRewardType(input: string | number): RewardType {
  if (typeof input === 'number') {
    switch (input) {
      case 2:
        return 'puan';
      case 3:
        return 'mil';
      default:
        return 'cashback';
    }
  }

  switch (input.toLowerCase()) {
    case 'puan':
      return 'puan';
    case 'mil':
      return 'mil';
    default:
      return 'cashback';
  }
}

function buildCampaignTags(input: {
  isProgressive?: boolean;
  isJoined?: boolean;
  deadlineText: string;
  rewardText: string;
}): CampaignTag[] {
  const tags: CampaignTag[] = [];

  if (input.isProgressive) {
    tags.push({ id: 'progressive', label: 'Aşamalı', tone: 'warning' });
  }

  if (input.isJoined) {
    tags.push({ id: 'joined', label: 'Katıldın', tone: 'success' });
  }

  if (input.deadlineText) {
    tags.push({ id: 'deadline', label: input.deadlineText, tone: 'info' });
  }

  if (input.rewardText) {
    tags.push({ id: 'reward', label: input.rewardText, tone: 'success' });
  }

  return tags;
}

function mapCampaignDetail(input: {
  id: string;
  bankName: string;
  title: string;
  shortDescription: string;
  rewardText: string;
  rewardType: string | number;
  category: string;
  deadlineText: string;
  validDateRange: string;
  nextActionText?: string | null;
  terms: string[];
  isJoined?: boolean;
  isProgressive?: boolean;
  progressCurrent?: number | null;
  progressTarget?: number | null;
  tags?: CampaignTag[];
}): CampaignDetail {
  const mappedRewardType = mapRewardType(input.rewardType);

  return {
    id: input.id,
    bankName: input.bankName,
    title: input.title,
    shortDescription: input.shortDescription,
    rewardText: input.rewardText,
    rewardType: mappedRewardType,
    category: input.category,
    deadlineText: input.deadlineText,
    validDateRange: input.validDateRange,
    nextActionText: input.nextActionText ?? undefined,
    terms: input.terms,
    isJoined: input.isJoined,
    isProgressive: input.isProgressive,
    progressCurrent: input.progressCurrent ?? undefined,
    progressTarget: input.progressTarget ?? undefined,
    tags: input.tags ?? buildCampaignTags(input),
  };
}

function mapCampaignPreview(input: {
  id: string;
  bankName: string;
  title: string;
  shortDescription: string;
  rewardText: string;
  rewardType: string | number;
  category: string;
  deadlineText: string;
  isJoined?: boolean;
  isProgressive?: boolean;
  progressCurrent?: number | null;
  progressTarget?: number | null;
  tags?: CampaignTag[];
}): CampaignPreview {
  return {
    id: input.id,
    bankName: input.bankName,
    title: input.title,
    shortDescription: input.shortDescription,
    rewardText: input.rewardText,
    rewardType: mapRewardType(input.rewardType),
    category: input.category,
    deadlineText: input.deadlineText,
    isJoined: input.isJoined,
    isProgressive: input.isProgressive,
    progressCurrent: input.progressCurrent ?? undefined,
    progressTarget: input.progressTarget ?? undefined,
    tags: input.tags ?? buildCampaignTags(input),
  };
}

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

  const response = await apiRequest<Array<Parameters<typeof mapCampaignPreview>[0]>>('/api/mobile/campaigns');
  return response.map(mapCampaignPreview);
}

export async function getFeaturedCampaignSummary() {
  if (isMockMode()) {
    return getFeaturedCampaignSummaryMock();
  }

  const campaigns = await getPersonalizedCampaigns();
  const totalPotential = campaigns.reduce((sum, campaign) => {
    const digits = campaign.rewardText.replace(/[^0-9]/g, '');
    return sum + (digits ? Number(digits) : 0);
  }, 0);

  return {
    title: campaigns.length > 0 ? 'Canlı fırsat özeti' : featuredCampaignSummary.title,
    description:
      campaigns.length > 0
        ? 'Canlı kampanya verilerine göre kişisel fırsat görünümün güncellendi.'
        : featuredCampaignSummary.description,
    monthlyPotentialText: `${totalPotential.toLocaleString('tr-TR')} TL`,
  };
}

export async function getCampaignDetailById(id: string): Promise<CampaignDetail | undefined> {
  if (isMockMode()) {
    return getCampaignDetailByIdMock(id);
  }

  const response = await apiRequest<Parameters<typeof mapCampaignDetail>[0]>(`/api/mobile/campaigns/${id}`);
  return mapCampaignDetail(response);
}

export async function joinCampaign(id: string) {
  return apiRequest<{
    id: string;
    campaignId: string;
    trackingTemplateId?: string | null;
    status: string;
    progressCurrent: number;
    progressTarget: number;
    joinedAtLabel: string;
  }>(`/api/mobile/campaigns/${id}/join`, {
    method: 'POST',
    body: {},
  });
}
