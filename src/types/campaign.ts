export type RewardType = 'cashback' | 'puan' | 'mil';

export type CampaignTag = {
  id: string;
  label: string;
  tone: 'success' | 'warning' | 'info' | 'neutral';
};

export type CampaignPreview = {
  id: string;
  bankName: string;
  title: string;
  shortDescription: string;
  rewardText: string;
  rewardType: RewardType;
  category: string;
  deadlineText: string;
  isJoined?: boolean;
  isProgressive?: boolean;
  progressCurrent?: number;
  progressTarget?: number;
  tags?: CampaignTag[];
};

export type CampaignDetail = CampaignPreview & {
  validDateRange: string;
  terms: string[];
  nextActionText?: string;
};
