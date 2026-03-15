export type SuccessState = {
  id: string;
  title: string;
  subtitle: string;
  rewardText: string;
  status: 'completed' | 'reward_pending';
  summaryItems: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  primaryActionLabel: string;
  secondaryActionLabel: string;
};
