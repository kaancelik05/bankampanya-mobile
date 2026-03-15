export type TrackingStatus = 'active' | 'near_complete' | 'completed';

export type TrackingEvent = {
  id: string;
  dateLabel: string;
  amountText: string;
  merchantName: string;
  qualified: boolean;
};

export type TrackedCampaign = {
  id: string;
  title: string;
  bankName: string;
  progressCurrent: number;
  progressTarget: number;
  deadlineText: string;
  rewardText: string;
  shortDescription: string;
  nextActionText: string;
  status: TrackingStatus;
  requirements: string[];
  events: TrackingEvent[];
};
