export type EarningsSummary = {
  monthLabel: string;
  totalEarnedText: string;
  pendingRewardText: string;
  potentialRewardText: string;
};

export type EarningsStat = {
  id: string;
  label: string;
  valueText: string;
  tone?: 'default' | 'success' | 'warning' | 'info';
};

export type EarningsHistoryItem = {
  id: string;
  title: string;
  bankName: string;
  rewardText: string;
  status: 'pending' | 'completed';
  dateLabel: string;
};

export type PotentialEarningItem = {
  id: string;
  title: string;
  bankName: string;
  potentialText: string;
  remainingActionText: string;
};

export type EarningsAlert = {
  id: string;
  title: string;
  description: string;
  tone: 'warning' | 'danger' | 'info';
};

export type EarningsDashboard = {
  summary: EarningsSummary;
  stats: EarningsStat[];
  history: EarningsHistoryItem[];
  potential: PotentialEarningItem[];
  alerts: EarningsAlert[];
};
